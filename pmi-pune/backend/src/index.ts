import express from "express";
import cors from "cors";
import helmet from "helmet";
import registrationsRouter from "./routes/registrations";
import userRouter from "./routes/user";
import pduRouter from "./routes/pdu";
import strapiRouter from "./routes/strapi";
import contactRouter, { membershipRouter } from "./routes/contact";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:1337"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/registrations", registrationsRouter);
app.use("/api/user", userRouter);
app.use("/api/pdu", pduRouter);
app.use("/api/strapi", strapiRouter);
app.use("/api/contact", contactRouter);
app.use("/api/membership", membershipRouter);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

