const Categories = require("../models/Categories");

// ✅ Get all Categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Categories.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Error fetching Categories" });
  }
};

// ✅ Create new Categories
exports.createCategories = async (req, res) => {
  try {
    const newCategories = new Categories(req.body);
    await newCategories.save();
    res.json(newCategories);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error adding category" });
  }
};

// ✅ Update Categories
exports.updateCategories = async (req, res) => {
  try {
    const updated = await Categories.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Categories not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Error updating Categories" });
  }
};

// ✅ Delete Categories
exports.deleteCategories = async (req, res) => {
  try {
    const deleted = await Categories.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Categories not found" });
    res.json({ message: "Categories deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting Categories" });
  }
};
