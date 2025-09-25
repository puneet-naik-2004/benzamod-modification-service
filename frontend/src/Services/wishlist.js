// ✅ Create wishlist item
export const createWishlist = (wishlistData) => {
  return fetch(`${process.env.REACT_APP_API_URL}/wishlist`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(wishlistData),
  }).then((res) => res.json());
};

// ✅ Get all wishlist items
export const getWishlist = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/wishlist`).then((res) =>
    res.json()
  );
};

// ✅ Update wishlist item
export const updateWishlist = (id, updatedData) => {
  return fetch(`${process.env.REACT_APP_API_URL}/wishlist/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  }).then((res) => res.json());
};

// ✅ Delete wishlist item
export const deleteWishlist = (id) => {
  return fetch(`${process.env.REACT_APP_API_URL}/wishlist/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
};
