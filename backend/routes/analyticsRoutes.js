import { Router } from "express";
import { verifyAdmin, verifyRoute } from "../middlewares/authMiddleware.js";
import { getAnalytics } from "../controllers/AnalyticsController.js";

const router = Router();

router.get("/", verifyRoute, verifyAdmin, getAnalytics);

export default router;
