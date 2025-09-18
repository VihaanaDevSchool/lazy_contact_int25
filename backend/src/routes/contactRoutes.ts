import express from "express";
import Contact from "../models/Contact";
import protect from "../middleware/auth";

const router = express.Router();
router.use(protect);

router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const contact = await Contact.findOne({
      _id: req.params.id,
      user: req.user,
    });
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ message: "Please add all fields" });
  }
  try {
    const contact = await Contact.create({
      user: req.user,
      name,
      email,
      phone,
    });
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      { name, email, phone },
      { new: true },
    );
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const contact = await Contact.findOneAndDelete({
      _id: req.params.id,
      user: req.user,
    });
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json({ message: "Contact removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
