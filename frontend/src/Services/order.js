

// Create a new order
export const createOrder = (orderData) => {
  return fetch(`${process.env.REACT_APP_API_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  }).then((res) => res.json());
};

// Get all orders
export const getOrders = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/orders`).then((res) =>
    res.json()
  );
};

// Update order (e.g., status)
export const updateOrder = (id, updatedData) => {
  return fetch(`${process.env.REACT_APP_API_URL}/orders/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  }).then((res) => res.json());
};

// Delete order
export const deleteOrder = (id) => {
  return fetch(`${process.env.REACT_APP_API_URL}/orders/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
};
