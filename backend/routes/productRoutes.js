import { Router } from "express";
import {
  getAllProducts,
  getFeaturedProducts,
  createProduct,
  deleteProduct,
  getRecommendedProducts,
  getProductsByCategory,
  toggleFeaturedProduct,
} from "../controllers/productController.js";
import { verifyRoute, verifyAdmin } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", verifyRoute, verifyAdmin, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/recommended", getRecommendedProducts);
router.post("/", verifyRoute, verifyAdmin, createProduct);
router.patch("/:id", verifyRoute, verifyAdmin, toggleFeaturedProduct);
router.delete("/:id", verifyRoute, verifyAdmin, deleteProduct);
export default router;
