import { Router } from "express";
import {
  addToCart,
  getCartProducts,
  updateCartQuantity,
  removeFromCart,
  clearCart,
} from "../controllers/cartController.js";
import { verifyRoute } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", verifyRoute, getCartProducts);
router.post("/", verifyRoute, addToCart);
router.put("/:id", verifyRoute, updateCartQuantity);
router.delete("/:productId", verifyRoute, removeFromCart);
router.delete("/clear", verifyRoute, clearCart);

export default router;
