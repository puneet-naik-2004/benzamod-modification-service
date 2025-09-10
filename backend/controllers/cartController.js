// controllers/cartController.js
const Cart = require("../models/cart");
const Order = require("../models/order");
const User = require("../models/User");

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
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart item not found" });
    }

    // Get address and customer from request
    const { address, user } = req.body;
    if (!address || !user._id) {
      return res.status(400).json({
        success: false,
        message: "Address and customer_id are required",
      });
    }

    // Find user
    const userModel = await User.findById(user._id);
    if (!userModel) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Save address to user (append to addresses)
    userModel.addresses.push(address);
    await userModel.save();

    // Get the last inserted address ID
    const address_id = userModel.addresses[userModel.addresses.length - 1]._id;

    // Create order with product_id, customer_id, and address_id
    const order = new Order({
      product_id: cart.product_id, // or cart.product_id if you store differently
      customer_id: userModel._id,
      address_id: address_id,
      service_id: cart.service_id,
    });

    await order.save();

    // Delete item from cart
    const deletedCart = await Cart.findByIdAndDelete(req.params.id);

    res.json({ success: true, order, deletedCart });
  } catch (err) {
    console.error("Error in buynowcart:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};
