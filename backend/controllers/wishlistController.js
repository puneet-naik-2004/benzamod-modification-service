// controllers/wishlistController.js
const Wishlist = require("../models/wishlist");

// POST /api/wishlist - create new wishlist item
exports.createWishlist = async (req, res) => {
  try {
    const wishlist = new Wishlist(req.body);
    await wishlist.save();
    res.status(201).json({ success: true, wishlist });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// GET /api/wishlist - get all wishlist items
exports.getWishlist = async (req, res) => {
  try {
    const wishlistItems = await Wishlist.find().sort({ createdAt: -1 });
    res.json({ success: true, wishlist: wishlistItems });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET /api/wishlist/:id - get single wishlist item
exports.getWishlistById = async (req, res) => {
  try {
    const wishlist = await Wishlist.findById(req.params.id);
    if (!wishlist) {
      return res
        .status(404)
        .json({ success: false, message: "Wishlist item not found" });
    }
    res.json({ success: true, wishlist });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// PUT /api/wishlist/:id - update wishlist item
exports.updateWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!wishlist) {
      return res
        .status(404)
        .json({ success: false, message: "Wishlist item not found" });
    }
    res.json({ success: true, wishlist });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// DELETE /api/wishlist/:id - delete wishlist item
exports.deleteWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findByIdAndDelete(req.params.id);
    if (!wishlist) {
      return res
        .status(404)
        .json({ success: false, message: "Wishlist item not found" });
    }
    res.json({ success: true, message: "Wishlist item deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
