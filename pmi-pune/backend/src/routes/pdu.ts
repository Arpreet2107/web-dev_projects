import express from "express";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { authenticateToken, AuthRequest } from "../middleware/auth.middleware";

const router = express.Router();
const prisma = new PrismaClient();

// POST /api/pdu/log
router.post("/log", authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const pduSchema = z.object({
      date: z.string().transform((str) => new Date(str)),
      activity: z.string().min(1),
      credits: z.number().int().positive(),
      category: z.string().optional(),
    });

    const validationResult = pduSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: validationResult.error.errors,
      });
    }

    const data = validationResult.data;

    const pduLog = await prisma.pduLog.create({
      data: {
        userId,
        date: data.date,
        activity: data.activity,
        credits: data.credits,
        category: data.category || null,
      },
    });

    res.status(201).json({
      success: true,
      message: "PDU logged successfully",
      data: pduLog,
    });
  } catch (error) {
    console.error("Error logging PDU:", error);
    res.status(500).json({
      success: false,
      message: "Failed to log PDU",
    });
  }
});

// GET /api/pdu/log
router.get("/log", authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const pduLogs = await prisma.pduLog.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    });

    res.json({
      success: true,
      data: pduLogs,
    });
  } catch (error) {
    console.error("Error fetching PDU log:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch PDU log",
    });
  }
});

// GET /api/pdu/total
router.get("/total", authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    // Get manual PDU logs
    const pduLogs = await prisma.pduLog.findMany({
      where: { userId },
    });
    const manualTotal = pduLogs.reduce((sum: number, log: any) => sum + log.credits, 0);

    // Get PDU credits from attended events (would need to fetch from Strapi)
    // For now, return manual total
    const eventPduTotal = 0; // TODO: Calculate from attended events

    res.json({
      success: true,
      data: {
        manualTotal,
        eventTotal: eventPduTotal,
        total: manualTotal + eventPduTotal,
      },
    });
  } catch (error) {
    console.error("Error calculating PDU total:", error);
    res.status(500).json({
      success: false,
      message: "Failed to calculate PDU total",
    });
  }
});

export default router;

