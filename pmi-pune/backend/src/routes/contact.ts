import express from "express";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const contactRouter = express.Router();
const membershipRouter = express.Router();
const prisma = new PrismaClient();

// Contact form schema
const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(1),
  message: z.string().min(10),
});

// Volunteer application schema
const volunteerSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(10),
  pmiNumber: z.string().optional(),
  areasOfInterest: z.array(z.string()).min(1),
  experience: z.string().min(1),
  availability: z.string().min(1),
  motivation: z.string().min(1),
});

// Sponsorship inquiry schema
const sponsorshipSchema = z.object({
  companyName: z.string().min(1),
  contactName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(10),
  sponsorshipLevel: z.string().min(1),
  message: z.string().optional(),
});

// Membership application schema
const membershipSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(10),
  pmiNumber: z.string().min(1),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  membershipType: z.enum(["new", "renewal"]),
});

// POST /api/contact
contactRouter.post("/", async (req, res) => {
  try {
    const validationResult = contactSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: validationResult.error.errors,
      });
    }

    // TODO: Store in database or send email
    console.log("Contact form submission:", validationResult.data);

    res.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Error processing contact form:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
});

// POST /api/contact/volunteer
contactRouter.post("/volunteer", async (req, res) => {
  try {
    const validationResult = volunteerSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: validationResult.error.errors,
      });
    }

    // TODO: Store in database or send email
    console.log("Volunteer application:", validationResult.data);

    res.json({
      success: true,
      message: "Volunteer application submitted successfully",
    });
  } catch (error) {
    console.error("Error processing volunteer application:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit volunteer application",
    });
  }
});

// POST /api/contact/sponsorship
contactRouter.post("/sponsorship", async (req, res) => {
  try {
    const validationResult = sponsorshipSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: validationResult.error.errors,
      });
    }

    // TODO: Store in database or send email
    console.log("Sponsorship inquiry:", validationResult.data);

    res.json({
      success: true,
      message: "Sponsorship inquiry submitted successfully",
    });
  } catch (error) {
    console.error("Error processing sponsorship inquiry:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit sponsorship inquiry",
    });
  }
});

// POST /api/membership/apply
membershipRouter.post("/apply", async (req, res) => {
  try {
    const validationResult = membershipSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: validationResult.error.errors,
      });
    }

    // TODO: Store in database or send email
    console.log("Membership application:", validationResult.data);

    res.json({
      success: true,
      message: "Membership application submitted successfully",
    });
  } catch (error) {
    console.error("Error processing membership application:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit membership application",
    });
  }
});

export { membershipRouter };

export default contactRouter;
