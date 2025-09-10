// controllers/cartController.js
const Cart = require("../models/cart");
const Order = require("../models/order");

// POST /api/cart - create new cart item
exports.createCart = async (req, res) => {
  try {
    const cart = new Cart(req.body);
    await cart.save();
    res.status(201).json({ success: true, cart });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// GET /api/cart - get all cart items
exports.getCart = async (req, res) => {
  try {
    const cartItems = await Cart.find().sort({ createdAt: -1 });
    res.json({ success: true, cart: cartItems });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET /api/cart/:id - get single cart item
exports.getCartById = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: "Cart item not found" });
    res.json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// PUT /api/cart/:id - update cart item
exports.updateCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: "Cart item not found" });
    res.json({ success: true, cart });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// DELETE /api/cart/:id - delete cart item
exports.deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: "Cart item not found" });
    res.json({ success: true, message: "Cart item deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.buynowcart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: "Cart item not found" });
    const { _id, ...newOrder } = cart.toObject();
    const order = new Order(newOrder);
    await order.save();

    const deletedcart = await Cart.findByIdAndDelete(req.params.id);
    res.json({ success: true, cart: deletedcart });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
