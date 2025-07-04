import { Router } from "express";
import {
  signup,
  login,
  logout,
  refreshAccess,
  profileAccess,
} from "../controllers/authController.js";
import { verifyRoute } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/refresh", refreshAccess);

router.get("/logout", logout);

router.get("/profile", verifyRoute, profileAccess);

export default router;
