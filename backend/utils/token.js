import jwt from "jsonwebtoken";
import redisClient from "./redis.js";

export const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};

export const storeRefreshToken = async (userId, resfreshToken) => {
  return await redisClient.set(
    `refresh_token:${userId}`,
    resfreshToken,
    "EX",
    7 * 24 * 60 * 60
  ); // 7 days
};

export const setCookies = (res, accessToken, refreshToken) => {
  res.cookie("access_token", accessToken, {
    httpOnly: true, // prevent xss attacks
    secure: process.env.NODE_ENV == "production",
    sameSite: "strict", // prevent crsf attacks
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true, // prevent xss attacks
    secure: process.env.NODE_ENV == "production",
    sameSite: "strict", // prevent crsf attacks
    maxAge: 15 * 60 * 1000,
  });
};
