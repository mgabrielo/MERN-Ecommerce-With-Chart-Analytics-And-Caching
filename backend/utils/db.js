import mongoose from "mongoose";

export async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB Connection Successful with connection string.");
  } catch (err) {
    console.error("MongoDb connection attempt failed:", err.message);
  }
}
