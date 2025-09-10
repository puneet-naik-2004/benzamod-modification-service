import React, { useEffect, useState } from "react";
import { getCart, deleteCart, buynowCart } from "Services/cart";
import "../Style/Cart.css";
import { useAuth } from "Context/AuthContext";
import { Link } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const data = await getCart();
    if (!data.error) {
      // ✅ Add quantity field (default 1) to each cart item
      setCart(
        data.cart
          .filter((each) => each.customer_id === user?._id)
          .map((item) => ({ ...item, quantity: item.quantity || 1 }))
      );
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this cart item?")) {
      const res = await deleteCart(id);
      if (!res.error) {
        setCart((prev) => prev.filter((item) => item._id !== id));
      } else {
        alert("Failed to delete cart item: " + res.error);
      }
    }
  };

  const handleBuyNow = async (item) => {
    alert(
      `🛒 Buying now: ${item.title} (x${item.quantity}) for ₹${
        item.price * item.quantity
      }`
    );
    const res = await buynowCart(item._id);
    const removedCartItem = res.cart;
    const filteredCart = cart.filter(
      (each) => each._id !== removedCartItem._id
    );
    setCart(filteredCart);
    // ✅ Later: Redirect to checkout or create order API call
  };

  // ✅ Increase/Decrease Quantity
  const updateQuantity = (id, change) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  // ✅ Total Amount Calculation
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2>🛒 Customer Cart</h2>

      <div className="cart-list">
        {cart.map((item) => (
          <div key={item._id} className="cart-card">
            <img src={item.photo} alt={item.title} />
            <div className="cart-info">
              <h4>{item.title}</h4>
              <p>💰 ₹{item.price}</p>
              <p>📂 {item.type}</p>
              <p>📝 {item.description}</p>
              <p>🕒 {new Date(item.orderDate).toLocaleString()}</p>

              {/* ✅ Quantity Control */}
              <div className="quantity-control">
                <button onClick={() => updateQuantity(item._id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, +1)}>+</button>
              </div>

              {/* ✅ Subtotal */}
              <p>Subtotal: ₹{item.price * item.quantity}</p>
            </div>

            <div className="cart-actions">
              <Link to={`/buynow/${item._id}`} className="buy-btn">
                Buy Now
              </Link>
              <button
                className="delete-btn"
                onClick={() => handleDelete(item._id)}
              >
                ❌ Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Show Total */}
      {cart.length > 0 && (
        <div className="cart-total">
          <h3>Grand Total: ₹{totalAmount}</h3>
        </div>
      )}
    </div>
  );
}

export default Cart;
