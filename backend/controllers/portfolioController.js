
const Portfolio = require("../models/Portfolio");

exports.createPortfolio = async (req, res) => {
  try {
    const newPortfoio = new Portfolio(req.body);
    await newPortfoio.save();
    res.json(newPortfoio);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Error adding product" });
  }
};


exports.getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.find().sort({ createdAt: -1 });
    res.json({ success: true, portfolio });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};




// DELETE /api/inquiries/:id - delete inquiry
exports.deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findByIdAndDelete(req.params.id);
    if (!portfolio)
      return res
        .status(404)
        .json({ success: false, message: "Portfolio not found" });
    res.json({ success: true, message: "Portfolio deleted successfully" });
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, error: err.message });
  }
};
