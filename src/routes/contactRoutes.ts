import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.send("Contact routes working");
});

export default router;
