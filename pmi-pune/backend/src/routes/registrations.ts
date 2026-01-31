import express from "express";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import Razorpay from "razorpay";
import crypto from "crypto";
import axios from "axios";
import { authenticateToken, AuthRequest } from "../middleware/auth.middleware";

const router = express.Router();
const prisma = new PrismaClient();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

// POST /api/registrations/create-order
router.post("/create-order", authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const orderSchema = z.object({
      eventSlug: z.string().min(1),
      eventTitle: z.string().min(1),
      fullName: z.string().min(1),
      email: z.string().email(),
      phone: z.string().optional(),
    });

    const validationResult = orderSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: validationResult.error.errors,
      });
    }

    const data = validationResult.data;

    // Fetch event from Strapi to get registration fee
    let registrationFee = 0;
    try {
      const eventResponse = await axios.get(
        `${process.env.STRAPI_URL || "http://localhost:1337"}/api/events?filters[slug][$eq]=${data.eventSlug}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.STRAPI_API_TOKEN || ""}`,
          },
        }
      );

      if (eventResponse.data.data && eventResponse.data.data.length > 0) {
        registrationFee = parseFloat(eventResponse.data.data[0].registrationFee || 0);
      }
    } catch (error) {
      console.error("Error fetching event:", error);
    }

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(registrationFee * 100), // Convert to paise
      currency: "INR",
      receipt: `event_${data.eventSlug}_${Date.now()}`,
      notes: {
        eventSlug: data.eventSlug,
        eventTitle: data.eventTitle,
        userId,
      },
    });

    // Store order in database
    const paymentOrder = await prisma.paymentOrder.create({
      data: {
        orderId: razorpayOrder.id,
        razorpayOrderId: razorpayOrder.id,
        amount: registrationFee,
        currency: "INR",
        status: "pending",
        eventSlug: data.eventSlug,
        eventTitle: data.eventTitle,
        userId,
      },
    });

    // Create registration record (pending payment)
    const registration = await prisma.eventRegistration.create({
      data: {
        eventSlug: data.eventSlug,
        eventTitle: data.eventTitle,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone || null,
        userId,
        razorpayOrderId: razorpayOrder.id,
        paymentStatus: "pending",
        status: "confirmed",
      },
    });

    res.json({
      success: true,
      data: {
        orderId: razorpayOrder.id,
        amount: registrationFee,
        currency: "INR",
        registrationId: registration.id,
      },
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create payment order",
    });
  }
});

// POST /api/registrations/verify-payment
router.post("/verify-payment", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing payment details",
      });
    }

    // Verify signature
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
      .update(text)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    // Find registration by order ID
    const registration = await prisma.eventRegistration.findFirst({
      where: {
        razorpayOrderId: razorpay_order_id,
      },
    });

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found",
      });
    }

    // Update registration with payment details
    await prisma.eventRegistration.update({
      where: { id: registration.id },
      data: {
        razorpayPaymentId: razorpay_payment_id,
        paymentStatus: "paid",
      },
    });

    // Update payment order
    await prisma.paymentOrder.updateMany({
      where: { razorpayOrderId: razorpay_order_id },
      data: {
        status: "paid",
      },
    });

    // Create registration in Strapi
    try {
      const strapiUserResponse = await axios.get(
        `${process.env.STRAPI_URL || "http://localhost:1337"}/api/users?filters[email][$eq]=${registration.email}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.STRAPI_API_TOKEN || ""}`,
          },
        }
      );

      const strapiUser = strapiUserResponse.data[0];
      const eventResponse = await axios.get(
        `${process.env.STRAPI_URL || "http://localhost:1337"}/api/events?filters[slug][$eq]=${registration.eventSlug}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.STRAPI_API_TOKEN || ""}`,
          },
        }
      );

      const event = eventResponse.data.data[0];

      if (strapiUser && event) {
        await axios.post(
          `${process.env.STRAPI_URL || "http://localhost:1337"}/api/event-registrations`,
          {
            data: {
              uniqueId: registration.id,
              event: event.id,
              user: strapiUser.id,
              fullName: registration.fullName,
              email: registration.email,
              phone: registration.phone,
              razorpayOrderId: razorpay_order_id,
              razorpayPaymentId: razorpay_payment_id,
              paymentStatus: "paid",
              status: "confirmed",
            },
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.STRAPI_API_TOKEN || ""}`,
              "Content-Type": "application/json",
            },
          }
        );
      }
    } catch (error) {
      console.error("Error creating Strapi registration:", error);
    }

    res.json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to verify payment",
    });
  }
});

// GET /api/registrations (admin - get all registrations)
router.get("/", authenticateToken, async (req: AuthRequest, res) => {
  try {
    // TODO: Add admin check here
    const registrations = await prisma.eventRegistration.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json({
      success: true,
      data: registrations,
    });
  } catch (error) {
    console.error("Error fetching registrations:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch registrations",
    });
  }
});

// GET /api/registrations/my-registrations
router.get("/my-registrations", authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const registrations = await prisma.eventRegistration.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    res.json({
      success: true,
      data: registrations,
    });
  } catch (error) {
    console.error("Error fetching registrations:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch registrations",
    });
  }
});

// POST /api/registrations (legacy endpoint for free events)
router.post("/", authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const registrationSchema = z.object({
      eventSlug: z.string().min(1),
      eventTitle: z.string().min(1),
      fullName: z.string().min(1),
      email: z.string().email(),
      phone: z.string().optional(),
    });

    const validationResult = registrationSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: validationResult.error.errors,
      });
    }

    const data = validationResult.data;

    const registration = await prisma.eventRegistration.create({
      data: {
        eventSlug: data.eventSlug,
        eventTitle: data.eventTitle,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone || null,
        userId,
        paymentStatus: "paid", // Free event
        status: "confirmed",
      },
    });

    res.status(201).json({
      success: true,
      message: "Registration successful",
      data: registration,
    });
  } catch (error) {
    console.error("Error creating registration:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create registration",
    });
  }
});

export default router;
