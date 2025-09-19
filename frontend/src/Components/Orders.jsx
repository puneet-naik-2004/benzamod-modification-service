

import React, { useEffect, useState } from "react";
import { getOrders, deleteOrder } from "Services/order";
import "../Style/Orders.css";
import { useAuth } from "Context/AuthContext";
import { Package, IndianRupee, Car, Eye, XCircle } from "lucide-react";

export const OrdersList = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const data = await getOrders();
    if (!data.error) {
      setOrders(
        data.orders.filter((each) => each.customer_id._id === user?._id)
      );
    }
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
    <div className="orders-page">
      <h1>📦 My Orders</h1>

      {orders.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        <div className="orders-grid">
          {orders.map(
            (order) =>
              order.service_id ? (
                <div key={order._id} className="order-card">
                  {/* Service Image */}
                  <img
                    src={order.service_id?.photo}
                    alt={order.service_id?.title}
                  />

                  {/* Title */}
                  <h2>
                    <Package size={18} /> {order.service_id?.title}
                  </h2>

                  {/* Type */}
                  <p className="type">
                    <Car size={16} /> {order.service_id?.type}
                  </p>

                  {/* Price */}
                  <p className="price">
                    <IndianRupee size={18} /> {order.service_id?.price}
                  </p>

                  {/* Order ID */}
                  <p className="order-id">Order ID: {order._id}</p>

                  {/* Buttons */}
                  <div className="buttons">
                    <button className="view-btn">
                      <Eye size={16} /> View
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => handleDelete(order._id)}
                    >
                      <XCircle size={16} /> Cancel
                    </button>
                  </div>
                </div>
              ): (
                <div key={order._id} className="order-card">
                  {/* Service Image */}
                  <img
                    src={order.product_id?.photo}
                    alt={order.product_id?.title}
                  />

                  {/* Title */}
                  <h2>
                    <Package size={18} /> {order.product_id?.title}
                  </h2>

                  {/* Type */}
                  <p className="type">
                    <Car size={16} /> {order.product_id?.type}
                  </p>

                  {/* Price */}
                  <p className="price">
                    <IndianRupee size={18} /> {order.product_id?.price}
                  </p>

                  {/* Order ID */}
                  <p className="order-id">Order ID: {order._id}</p>

                  {/* Buttons */}
                  <div className="buttons">
                    <button className="view-btn">
                      <Eye size={16} /> View
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => handleDelete(order._id)}
                    >
                      <XCircle size={16} /> Cancel
                    </button>
                  </div>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
};
