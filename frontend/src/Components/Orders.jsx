import React, { useEffect, useState } from "react";
import { getOrders, deleteOrder } from "Services/order";
import "../Style/Orders.css";
import { useAuth } from "Context/AuthContext";

function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const data = await getOrders();
    if (!data.error)
      setOrders(data.orders.filter((each) => each.customer_id === user?._id));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      const res = await deleteOrder(id);
      if (!res.error) {
        setOrders((prev) => prev.filter((order) => order._id !== id));
      } else {
        alert("Failed to delete order: " + res.error);
      }
    }
  };

  return (
    <div className="orders-container">
      <h2>📦 Customer Orders</h2>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order._id} className="order-card">
            <img src={order.photo} alt={order.title} />
            <div className="order-info">
              <h4>{order.title}</h4>
              <p>💰 ₹{order.price}</p>
              <p>📂 {order.type}</p>
              <p>📝 {order.description}</p>
              <p>🕒 {new Date(order.orderDate).toLocaleString()}</p>
            </div>
            {/* ✅ Delete Button */}
            <button
              className="delete-btn"
              onClick={() => handleDelete(order._id)}
            >
              ❌ Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
