import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "hospitalDB",
    });

    console.log("✅ Connected to database!");
  } catch (err) {
    console.log("❌ Database connection error:", err.message);
  }
};