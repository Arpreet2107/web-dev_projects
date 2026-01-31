import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    strapiUserId?: number;
  };
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const getCookie = (name: string): string | undefined => {
    const cookieHeader = req.headers.cookie;
    if (!cookieHeader) return undefined;
    const cookies = cookieHeader.split(";").map((c) => c.trim());
    const match = cookies.find((c) => c.startsWith(`${name}=`));
    if (!match) return undefined;
    return decodeURIComponent(match.substring(name.length + 1));
  };

  const authHeader = req.headers["authorization"];
  const bearerToken = authHeader && authHeader.split(" ")[1];
  const sessionToken =
    getCookie("__Secure-next-auth.session-token") ||
    getCookie("next-auth.session-token");

  if (!sessionToken && !bearerToken) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  const authenticate = async () => {
    if (sessionToken) {
      const session = await prisma.session.findUnique({
        where: { sessionToken },
        include: {
          user: {
            select: { id: true, email: true, strapiUserId: true },
          },
        },
      });

      if (!session || session.expires < new Date()) {
        return res.status(401).json({
          success: false,
          message: "Session expired",
        });
      }

      req.user = {
        id: session.user.id,
        email: session.user.email || "",
        strapiUserId: session.user.strapiUserId ?? undefined,
      };
      return next();
    }

    // Legacy bearer JWT fallback (older builds)
    try {
      const decoded = jwt.verify(
        bearerToken as string,
        process.env.NEXTAUTH_SECRET || "fallback-secret"
      ) as any;

      req.user = {
        id: decoded.sub || decoded.id,
        email: decoded.email,
        strapiUserId: decoded.strapiUserId,
      };

      return next();
    } catch (error) {
      return res.status(403).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  };

  authenticate().catch((error) => {
    console.error("Auth middleware error:", error);
    return res.status(500).json({
      success: false,
      message: "Authentication failed",
    });
  });
};

