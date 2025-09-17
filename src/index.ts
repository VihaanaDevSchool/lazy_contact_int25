import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import contactRoutes from "./routes/contactRoutes";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/contacts", contactRoutes);

// Root test
app.get("/", (_req, res) => {
  res.send("🚀 API is running inside Docker!");
});

// Start server
app.listen(PORT, "0.0.0.0", async () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  await connectDB();
});

// Y:
// ----------------
// IP find
// ip addr show
// ----------------
// port allow
// sudo ufw allow 5000
// ================
