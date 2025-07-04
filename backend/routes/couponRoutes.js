import { Router } from "express";
import { verifyRoute } from "../middlewares/authMiddleware.js";
import { getCoupon, validateCoupon } from "../controllers/couponController.js";

const router = Router();

router.get("/", verifyRoute, getCoupon);
router.post("/validate", verifyRoute, validateCoupon);

export default router;
