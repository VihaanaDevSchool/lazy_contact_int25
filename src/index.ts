import express from "express";
import cors from "cors"; // diddleware for {ports, requests, frontend}
import { connectDB } from "./config/db"; // database
import authRoutes from "./routes/authRoutes";
import contactRoutes from "./routes/contactRoutes";

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);

app.get("/", (req, res) => {
  res.send("Backend API is working 🚀");
});

app.listen(5000, "0.0.0.0", () => {
  console.log("🚀 Server running at http://localhost:5000");
});
