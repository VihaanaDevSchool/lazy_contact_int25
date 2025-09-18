// IMP: # Contact page routes
import express from "express";
import Contact from "../models/Contact";
import { protect, AuthRequest } from "../middleware/auth";

const router = express.Router();

// CREATE a contact
router.post("/", protect, async (req: AuthRequest, res) => {
  try {
    const contact = new Contact({ ...req.body, user: req.user.id });
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// READ ALL contacts for the logged-in user
router.get("/", protect, async (req: AuthRequest, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// READ ONE contact by ID (only if it belongs to user)
router.get("/:id", protect, async (req: AuthRequest, res) => {
  try {
    const contact = await Contact.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// UPDATE a contact by ID (only if it belongs to user)
router.put("/:id", protect, async (req: AuthRequest, res) => {
  try {
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true },
    );
    if (!updatedContact)
      return res.status(404).json({ message: "Contact not found" });
    res.json(updatedContact);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// DELETE a contact by ID (only if it belongs to user)
router.delete("/:id", protect, async (req: AuthRequest, res) => {
  try {
    const deletedContact = await Contact.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!deletedContact)
      return res.status(404).json({ message: "Contact not found" });
    res.json({ message: "Contact deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

export default router;
