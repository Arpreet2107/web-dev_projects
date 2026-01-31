import express from "express";
import axios from "axios";

const router = express.Router();

// Proxy route for Strapi API
// GET /api/strapi/*
router.get("*", async (req, res) => {
  try {
    const path = req.path.replace("/api/strapi", "");
    const strapiUrl = `${process.env.STRAPI_URL || "http://localhost:1337"}/api${path}`;

    const queryString = new URLSearchParams(req.query as any).toString();
    const fullUrl = queryString ? `${strapiUrl}?${queryString}` : strapiUrl;

    const response = await axios.get(fullUrl, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN || ""}`,
      },
    });

    res.json(response.data);
  } catch (error: any) {
    console.error("Strapi proxy error:", error);
    res.status(error.response?.status || 500).json({
      success: false,
      message: "Failed to fetch from Strapi",
      error: error.response?.data || error.message,
    });
  }
});

export default router;

