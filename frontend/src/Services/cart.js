// Create cart item
export const createCart = (cartData) => {
  return fetch(`${process.env.REACT_APP_API_URL}/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cartData),
  }).then((res) => res.json());
};

// Get all cart items
export const getCart = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/cart`).then((res) =>
    res.json()
  );
};

// Update cart item
export const updateCart = (id, updatedData) => {
  return fetch(`${process.env.REACT_APP_API_URL}/cart/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  }).then((res) => res.json());
};

// Delete cart item
export const deleteCart = (id) => {
  return fetch(`${process.env.REACT_APP_API_URL}/cart/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
};

export const buynowCart = (data,cartId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/cart/buynow/${cartId}`, {
    method: "Post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};
