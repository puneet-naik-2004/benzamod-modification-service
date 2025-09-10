// controllers/inquiryController.js
const Inquiry = require("../models/Inquiry");

// POST /api/inquiries - create new inquiry
exports.createInquiry = async (req, res) => {
  try {
    const inquiry = new Inquiry({ ...req.body, message: req.body.description });
    await inquiry.save();
    res.status(201).json({ success: true, inquiry });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// GET /api/inquiries - get all inquiries
exports.getInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, inquiry });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET /api/inquiries/:id - get single inquiry
exports.getInquiryById = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry)
      return res
        .status(404)
        .json({ success: false, message: "Inquiry not found" });
    res.json({ success: true, inquiry });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// DELETE /api/inquiries/:id - delete inquiry
exports.deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry)
      return res
        .status(404)
        .json({ success: false, message: "Inquiry not found" });
    res.json({ success: true, message: "Inquiry deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
