import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user;
}

export async function getStrapiUserId() {
  const session = await getServerSession(authOptions);
  return (session?.user as any)?.strapiUserId;
}

