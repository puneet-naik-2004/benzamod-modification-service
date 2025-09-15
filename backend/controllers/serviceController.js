// const Product = require("../models/Product");

// // GET all products
// exports.getProduct = async (req, res) => {
//   try {
//     const product = await Product.find();
//     res.json(product);
//   } catch (err) {
//     res.status(500).json({ error: "Error fetching product" });
//   }
// };

// // CREATE product
// exports.createProduct = async (req, res) => {
//   try {
//     const newProduct = new Product(req.body);
//     await newProduct.save();
//     res.json(newProduct);
//   } catch (err) {
//     console.log(err)
//     res.status(500).json({ error: "Error adding product" });
//   }
// };

// // UPDATE product
// exports.updateProduct = async (req, res) => {
//   try {
//     const updatedProduct = await Product.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (!updatedProduct) return res.status(404).json({ error: "Product not found" });
//     res.json(updatedProduct);
//   } catch (err) {
//     res.status(500).json({ error: "Error updating product" });
//   }
// };

// // DELETE product
// exports.deleteProduct = async (req, res) => {
//   try {
//     const deleted = await Product.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ error: "Product not found" });
//     res.json({ message: "Product deleted" });
//   } catch (err) {
//     res.status(500).json({ error: "Error deleting product" });
//   }
// };



const Service = require("../models/Service");

// GET all services
exports.getService = async (req, res) => {
  try {
    const service = await Service.find();
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: "Error fetching service" });
  }
};

// CREATE service
exports.createService = async (req, res) => {
  try {
    const newService = new Service(req.body);
    await newService.save();
    res.json(newService);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Error adding service" });
  }
};

// UPDATE service
exports.updateService = async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedService) return res.status(404).json({ error: "Service not found" });
    res.json(updatedService);
  } catch (err) {
    res.status(500).json({ error: "Error updating service" });
  }
};

// DELETE service
exports.deleteService = async (req, res) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Service not found" });
    res.json({ message: "Service deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting service" });
  }
};
