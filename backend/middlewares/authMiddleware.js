import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const verifyRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.access_token;
    if (!accessToken) {
      return res.status(401).json({ message: "unauthorized - without token" });
    }
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};

export const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Only Admins Allowed" });
  }
};
