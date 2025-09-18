//  IMP:  # Database of App.
import mongoose from "mongoose";

const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mernapp";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
};
export default connectDB;
