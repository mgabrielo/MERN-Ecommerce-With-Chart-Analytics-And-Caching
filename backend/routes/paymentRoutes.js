import { Router } from "express";
import {
  createCheckoutSession,
  confirmCheckoutSuccess,
} from "../controllers/paymentController.js";
import { verifyRoute } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/create-checkout-session", verifyRoute, createCheckoutSession);
router.post("/checkout-success", verifyRoute, confirmCheckoutSuccess);

export default router;
