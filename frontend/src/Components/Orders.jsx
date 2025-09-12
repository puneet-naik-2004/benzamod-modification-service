// import React, { useEffect, useState } from "react";
// import { getOrders, deleteOrder } from "Services/order";
// import "../Style/Orders.css";
// import { useAuth } from "Context/AuthContext";

// // function Orders() {
// //   const { user } = useAuth();
// //   const [orders, setOrders] = useState([]);

// //   useEffect(() => {
// //     loadOrders();
// //   }, []);

// //   const loadOrders = async () => {
// //     const data = await getOrders();
// //     if (!data.error)
// //       setOrders(data.orders.filter((each) => each.customer_id === user?._id));
// //   };

// //   const handleDelete = async (id) => {
// //     if (window.confirm("Are you sure you want to delete this order?")) {
// //       const res = await deleteOrder(id);
// //       if (!res.error) {
// //         setOrders((prev) => prev.filter((order) => order._id !== id));
// //       } else {
// //         alert("Failed to delete order: " + res.error);
// //       }
// //     }
// //   };

// //   return (
// //     <div className="orders-container">
// //       <h2>📦 Customer Orders</h2>
// //       <div className="orders-list">
// //         {orders.map((order) => (
// //           <div key={order._id} className="order-card">
// //             <img src={order.photo} alt={order.title} />
// //             <div className="order-info">
// //               <h4>{order.title}</h4>
// //               <p>💰 ₹{order.price}</p>
// //               <p>📂 {order.type}</p>
// //               <p>📝 {order.description}</p>
// //               <p>🕒 {new Date(order.orderDate).toLocaleString()}</p>
// //             </div>
// //             {/* ✅ Delete Button */}
// //             <button
// //               className="delete-btn"
// //               onClick={() => handleDelete(order._id)}
// //             >
// //               ❌ Delete
// //             </button>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Orders;

// import { Package, IndianRupee, Car } from "lucide-react";

// export const OrdersList = () => {
//   const { user } = useAuth();
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     loadOrders();
//   }, []);

//   const loadOrders = async () => {
//     const data = await getOrders();
//     if (!data.error)
//       setOrders(data.orders.filter((each) => each.customer_id._id === user?._id));
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this order?")) {
//       const res = await deleteOrder(id);
//       if (!res.error) {
//         setOrders((prev) => prev.filter((order) => order._id !== id));
//       } else {
//         alert("Failed to delete order: " + res.error);
//       }
//     }
//   };
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">📦 My Orders</h1>

//       {orders.length === 0 ? (
//         <p className="text-gray-500 text-center">No orders found.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {orders.map((order) => (
//             <div
//               key={order._id}
//               className="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition"
//             >
//               {/* Service Image */}
//               <img
//                 src={order.service_id?.photo}
//                 alt={order.service_id?.title}
//                 className="w-full h-40 object-cover rounded-xl mb-3"
//               />

//               {/* Title */}
//               <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
//                 <Package size={18} />
//                 {order.service_id?.title}
//               </h2>

//               {/* Service Type */}
//               <p className="text-sm text-gray-600 flex items-center gap-2">
//                 <Car size={16} className="text-blue-500" />
//                 {order.service_id?.type}
//               </p>

//               {/* Price */}
//               <p className="text-md font-medium mt-2 flex items-center gap-2">
//                 <IndianRupee size={18} className="text-green-600" />
//                 {order.service_id?.price}
//               </p>

//               {/* Order ID */}
//               <p className="text-xs text-gray-400 mt-3">
//                 Order ID: {order._id}
//               </p>

//               {/* Buttons */}
//               <div className="mt-4 flex justify-between">
//                 <button className="px-4 py-2 text-sm rounded-xl bg-blue-500 text-white hover:bg-blue-600">
//                   View Details
//                 </button>
//                 <button className="px-4 py-2 text-sm rounded-xl bg-red-500 text-white hover:bg-red-600">
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

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
