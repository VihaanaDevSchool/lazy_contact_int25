// IMP: # Contact page routes
import express from "express";
import Contact from "../models/Contact";
import protect from "../middleware/auth.tso";

const router = express.Router();

// CREATE
router.post("/", protect, async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// READ ONE
router.get("/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
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

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact)
      return res.status(404).json({ message: "Contact not found" });
    res.json({ message: "Contact deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

export default router;
