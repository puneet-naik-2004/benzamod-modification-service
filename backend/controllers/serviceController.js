// const Category = require("../models/Category");

// // ✅ Get all categories
// exports.getCategory = async (req, res) => {
//   try {
//     const category = await Category.find();
//     res.json(category);
//   } catch (err) {
//     res.status(500).json({ error: "Error fetching categories" });
//   }
// };

// // ✅ Create new category
// exports.createCategory = async (req, res) => {
//   try {
//     const newCategory = new Category(req.body);
//     await newCategory.save();
//     res.json(newCategory);
//   } catch (err) {
//     console.log(err)
//     res.status(500).json({ error: "Error adding category" });
//   }
// };

// // ✅ Update category
// exports.updateCategory = async (req, res) => {
//   try {
//     const updated = await Category.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (!updated) return res.status(404).json({ error: "Category not found" });
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ error: "Error updating category" });
//   }
// };

// // ✅ Delete category
// exports.deleteCategory = async (req, res) => {
//   try {
//     const deleted = await Category.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ error: "Category not found" });
//     res.json({ message: "Category deleted" });
//   } catch (err) {
//     res.status(500).json({ error: "Error deleting category" });
//   }
// };




const Service = require("../models/Service");

// ✅ Get all services
exports.getService = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: "Error fetching services" });
  }
};

// ✅ Create new service
exports.createService = async (req, res) => {
  try {
    const newService = new Service(req.body);
    await newService.save();
    res.json(newService);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error adding service" });
  }
};

// ✅ Update service
exports.updateService = async (req, res) => {
  try {
    const updated = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Service not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Error updating service" });
  }
};

// ✅ Delete service
exports.deleteService = async (req, res) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Service not found" });
    res.json({ message: "Service deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting service" });
  }
};
