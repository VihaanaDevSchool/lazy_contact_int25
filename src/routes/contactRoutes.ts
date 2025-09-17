import { Router } from "express";
import Contact from "../models/Contact";

const router = Router();

// Create
router.post("/", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.json(contact);
  } catch (err) {
    res.status(400).json({ error: "Failed to create contact" });
  }
});

// Read all
router.get("/", async (_req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

export default router;
