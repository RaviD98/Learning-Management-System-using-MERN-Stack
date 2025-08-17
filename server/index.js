import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";

// Routes
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";

// Controllers
import { stripeWebhook } from "./controllers/coursePurchase.controller.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8080;

// ⚠️ Stripe Webhook MUST be mounted BEFORE express.json()
app.post(
  "/api/v1/purchase/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

// Default middleware (after webhook)
app.use(express.json());
app.use(cookieParser());

// ✅ ROBUST CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://elearn-portal.vercel.app", // Your production frontend
  "https://learning-management-system-ob3v.onrender.com", // Your backend URL
];

// Add additional origins from environment variable
if (process.env.FRONTEND_URL) {
  const envOrigins = process.env.FRONTEND_URL.split(",");
  allowedOrigins.push(...envOrigins);
}

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      } else {
        console.log(`❌ CORS blocked origin: ${origin}`);
        return callback(new Error("Not allowed by CORS"), false);
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
      "Cache-Control",
      "X-File-Name",
    ],
    exposedHeaders: ["Set-Cookie"],
    preflightContinue: false,
    optionsSuccessStatus: 200,
  })
);

// Handle preflight requests explicitly
app.options("*", cors());

// Add request logging for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - Origin: ${req.headers.origin}`);
  next();
});

// Routes
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`✅ CORS enabled for origins:`, allowedOrigins);
});
