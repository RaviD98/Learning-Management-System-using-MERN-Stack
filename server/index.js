// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import connectDB from "./database/db.js";
// import userRoute from "./routes/user.route.js";
// import courseRoute from "./routes/course.route.js";
// import mediaRoute from "./routes/media.route.js"
// import purchaseRoute from "./routes/purchaseCourse.route.js"
// import courseProgressRoute from "./routes/courseProgress.route.js";

// dotenv.config({});
// connectDB();

// const app = express();

// const PORT = process.env.PORT || 3000;

// //Default middleware
// app.use(express.json());
// app.use(cookieParser()); //npm i cookie-parser
// app.use(cors({
//    origin: "http://localhost:5173",
//    credentials: true,
// }));


// //APIs
// app.use("/api/v1/media", mediaRoute);
// app.use("/api/v1/users", userRoute);
// app.use("/api/v1/course", courseRoute);
// app.use("/api/v1/purchase", purchaseRoute);
// app.use("/api/v1/progress", courseProgressRoute);


// app.listen(PORT, () =>{
//    console.log(`Listening on ${PORT}`); 
// });

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
const PORT = process.env.PORT || 3000;

// ⚠️ Stripe Webhook MUST be mounted BEFORE express.json()
app.post(
  "/api/v1/purchase/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

// Default middleware (after webhook)
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
