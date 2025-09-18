import express from "express";
import cors from "cors";
import connectdb from "./config/db";
import contactroutes from "./routes/contactRoutes";
import authroutes from "./routes/authRoutes";

const app = express();
const port = process.env.port || 5000;
const host = "0.0.0.0";

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authroutes);
app.use("/api/contacts", contactroutes);

app.use(
  cors({
    origin: ["http://localhost:5173"], // frontend dev server
    credentials: true,
  }),
);

// root test
app.get("/", (_req, res) => {
  res.send("🚀 api is running inside docker!");
});

// connect db and start server
connectdb().then(() => {
  app.listen(port, host, () => {
    console.log(`🚀 server running at http://${host}:${port}`);
  });
});

// Y:
// ----------------
// ip find
// ip addr show
// ----------------
// port allow
// sudo ufw allow 5000
// ================
