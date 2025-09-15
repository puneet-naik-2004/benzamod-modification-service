// 📂 Services/category.js

export const getCategories = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/category`)
    .then((res) => res.json());
};

export const updateCategory = (editingId, newCategory) => {
  return fetch(`${process.env.REACT_APP_API_URL}/category/${editingId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newCategory),
  }).then((res) => res.json());
};

export const createCategory = (newCategory) => {
  return fetch(`${process.env.REACT_APP_API_URL}/category`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newCategory),
  }).then((res) => res.json());
};

export const deleteCategory = (id) => {
  return fetch(`${process.env.REACT_APP_API_URL}/category/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
};
