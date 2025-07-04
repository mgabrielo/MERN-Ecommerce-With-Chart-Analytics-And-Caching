import User from "../models/User.js";
import redisClient from "../utils/redis.js";
import {
  generateTokens,
  setCookies,
  storeRefreshToken,
} from "../utils/token.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "user already exists" });
    }
    const user = await User.create({ name, email, password });
    const { accessToken, refreshToken } = generateTokens(user._id);
    await storeRefreshToken(user._id, refreshToken);
    setCookies(res, accessToken, refreshToken);
    const { password: user_password, ...savedUser } = user._doc;
    res.status(201).json({ message: "signup success", user: savedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `server error  - ${error?.message}` });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      const { accessToken, refreshToken } = generateTokens(user._id);
      await storeRefreshToken(user._id, refreshToken);
      setCookies(res, accessToken, refreshToken);
      const { password: user_password, ...loggedInUserData } = user._doc;
      res
        .status(200)
        .json({ message: "login success", user: loggedInUserData });
    } else {
      res.status(400).json({ message: "invalid user credentials" });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: `server error - ${error?.message}` });
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (refreshToken) {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      await redisClient.del(`refresh_token:${decoded.userId}`);
    }
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");

    res.status(200).json({ message: "logout success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `server error - ${error?.message}` });
  }
};

export const refreshAccess = async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (refreshToken) {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      const storedRefreshToken = await redisClient.get(
        `refresh_token:${decoded.userId}`
      );
      if (storedRefreshToken !== refreshToken) {
        return res
          .status(400)
          .json({ message: "Invalid refresh token provided" });
      }
      const accessToken = jwt.sign(
        { userId: decoded.userId },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "15m",
        }
      );

      res.cookie("access_token", accessToken, {
        httpOnly: true, // prevent xss attacks
        secure: process.env.NODE_ENV == "production",
        sameSite: "strict", // prevent crsf attacks
        maxAge: 15 * 60 * 1000,
      });
      res.json({ message: "token refresh complete" });
    } else {
      return res.status(400).json({ message: "no refresh token provided" });
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(500).json({ error: `server error - ${error?.message}` });
  }
};

export const profileAccess = async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `server error - ${error?.message}` });
  }
};
