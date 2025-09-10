// controllers/inquiryController.js
const Contact = require("../models/Contact");

// POST /api/contacts - create new contact
exports.createContact= async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ success: true, contact });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// GET /api/inquiries - get all inquiries
exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, contact });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET /api/inquiries/:id - get single inquiry
exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact)
      return res
        .status(404)
        .json({ success: false, message: "Contact not found" });
    res.json({ success: true, contact });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// DELETE /api/inquiries/:id - delete inquiry
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact)
      return res
        .status(404)
        .json({ success: false, message: "Contact not found" });
    res.json({ success: true, message: "Contact deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
