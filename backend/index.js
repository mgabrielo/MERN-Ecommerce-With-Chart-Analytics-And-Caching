import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import { connectToDatabase } from "./utils/db.js";
import { connectToRedis } from "./utils/redis.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: process.env.SITE_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.json({ msg: "hello" });
});

app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/coupons", couponRoutes);

app.use("/api/payments", paymentRoutes);

app.use("/api/analytics", analyticsRoutes);

const port = process.env.PORT || 5000;

app.listen(port, async () => {
  try {
    await connectToRedis();
    await connectToDatabase();
    console.log({ server: `running on port on http://localhost:${port}` });
  } catch (error) {
    console.log(error);
  }
});
