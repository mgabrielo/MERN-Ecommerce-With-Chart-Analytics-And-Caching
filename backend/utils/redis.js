import { createClient } from "redis";

const redisClient = createClient({ url: process.env.REDIS_URL });

redisClient.on("error", (err) => console.error("Redis error:", err));
redisClient.on("connect", () => console.log("Connected to Redis"));
redisClient.on("end", () => console.log("Disconnected from Redis"));

export const connectToRedis = async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.error("Error connecting to Redis:", error);
  }
};

export default redisClient;
