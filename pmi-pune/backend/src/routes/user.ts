import express from "express";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { authenticateToken, AuthRequest } from "../middleware/auth.middleware";

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/user/profile
router.get("/profile", authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        strapiUserId: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Fetch additional profile data from Strapi
    let strapiProfile = null;
    if (user.strapiUserId) {
      try {
        const strapiResponse = await axios.get(
          `${process.env.STRAPI_URL || "http://localhost:1337"}/api/users/${user.strapiUserId}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.STRAPI_API_TOKEN || ""}`,
            },
          }
        );
        strapiProfile = strapiResponse.data;
      } catch (error) {
        console.error("Error fetching Strapi profile:", error);
      }
    }

    res.json({
      success: true,
      data: {
        ...user,
        profile: strapiProfile,
      },
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user profile",
    });
  }
});

// PUT /api/user/profile
router.put("/profile", authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const updateSchema = z.object({
      name: z.string().optional(),
      pmiNumber: z.string().optional(),
      company: z.string().optional(),
      jobTitle: z.string().optional(),
      bio: z.string().optional(),
    });

    const validationResult = updateSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: validationResult.error.errors,
      });
    }

    const data = validationResult.data;

    // Update Prisma user
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update Strapi user if strapiUserId exists
    if (user.strapiUserId) {
      try {
        await axios.put(
          `${process.env.STRAPI_URL || "http://localhost:1337"}/api/users/${user.strapiUserId}`,
          {
            username: data.name || user.name,
            pmiNumber: data.pmiNumber,
            company: data.company,
            jobTitle: data.jobTitle,
            bio: data.bio,
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.STRAPI_API_TOKEN || ""}`,
            },
          }
        );
      } catch (error) {
        console.error("Error updating Strapi profile:", error);
      }
    }

    // Update Prisma user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: data.name,
      },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        strapiUserId: true,
      },
    });

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update user profile",
    });
  }
});

// GET /api/user/dashboard
router.get("/dashboard", authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    // Get upcoming registrations
    const upcomingRegistrations = await prisma.eventRegistration.findMany({
      where: {
        userId,
        status: "confirmed",
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    // Get total PDU credits
    const pduLogs = await prisma.pduLog.findMany({
      where: { userId },
    });
    const manualPduTotal = pduLogs.reduce((sum: number, log: any) => sum + log.credits, 0);

    // Get recent resources (from Strapi via proxy)
    // This would be fetched via the Strapi proxy route

    res.json({
      success: true,
      data: {
        upcomingRegistrations,
        pduTotal: manualPduTotal, // Will be combined with event PDUs
        recentResources: [],
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data",
    });
  }
});

export default router;

