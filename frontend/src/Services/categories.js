export const getCategories = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/categories`)
    .then((res) => res.json());
};

export const updateCategories = (editingId, newCategory) => {
  return fetch(`${process.env.REACT_APP_API_URL}/categories/${editingId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newCategory),
  }).then((res) => res.json());
};

export const createCategories = (newCategory) => {
  return fetch(`${process.env.REACT_APP_API_URL}/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newCategory),
  }).then((res) => res.json());
};

export const deletCategories = (id) => {
  return fetch(`${process.env.REACT_APP_API_URL}/categories/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
};
