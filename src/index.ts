import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import contactRoutes from "./routes/contactRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0";

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);

app.use(
  cors({
    origin: ["http://localhost:5173"], // frontend dev server
    credentials: true,
  }),
);

// Root test
app.get("/", (_req, res) => {
  res.send("🚀 API is running inside Docker!");
});

// Connect DB and start server
connectDB().then(() => {
  app.listen(PORT, HOST, () => {
    console.log(`🚀 Server running at http://${HOST}:${PORT}`);
  });
});
// Y:
// ----------------
// IP find
// ip addr show
// ----------------
// port allow
// sudo ufw allow 5000
// ================
