import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          // Authenticate with Strapi
          const response = await fetch(
            `${process.env.STRAPI_URL || "http://localhost:1337"}/api/auth/local`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                identifier: credentials.email,
                password: credentials.password,
              }),
            }
          );

          if (!response.ok) {
            throw new Error("Invalid credentials");
          }

          const data = await response.json();

          const strapiUser = data.user;

          const dbUser = await prisma.user.upsert({
            where: { email: strapiUser.email },
            update: {
              name: strapiUser.username || strapiUser.email,
              strapiUserId: strapiUser.id,
            },
            create: {
              email: strapiUser.email,
              name: strapiUser.username || strapiUser.email,
              strapiUserId: strapiUser.id,
            },
          });

          return {
            id: dbUser.id,
            email: dbUser.email,
            name: dbUser.name,
            strapiUserId: dbUser.strapiUserId,
          };
        } catch (error: any) {
          console.error("Auth error:", error.message);
          throw new Error("Invalid credentials");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          // Check if user exists in Strapi
          const strapiResponse = await fetch(
            `${process.env.STRAPI_URL || "http://localhost:1337"}/api/users?filters[email][$eq]=${user.email}`,
            {
              headers: {
                Authorization: `Bearer ${process.env.STRAPI_API_TOKEN || ""}`,
              },
            }
          );

          const strapiData = await strapiResponse.json();
          let strapiUser;
          if (!strapiData || strapiData.length === 0) {
            // Create user in Strapi
            const createResponse = await fetch(
              `${process.env.STRAPI_URL || "http://localhost:1337"}/api/auth/local/register`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  username: user.email?.split("@")[0],
                  email: user.email,
                  password: Math.random().toString(36).slice(-12), // Random password
                  confirmed: true,
                }),
              }
            );
            const createData = await createResponse.json();
            strapiUser = createData.user;
          } else {
            strapiUser = strapiData[0];
          }

          if (strapiUser?.id && user?.id) {
            await prisma.user.update({
              where: { id: user.id },
              data: { strapiUserId: strapiUser.id },
            });
          }
        } catch (error) {
          console.error("Error syncing Google user:", error);
        }
      }
      return true;
    },
    async session({ session, user }) {
      if (session.user) {
        (session.user as any).id = user.id;
        (session.user as any).strapiUserId = (user as any).strapiUserId;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
  },
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};

