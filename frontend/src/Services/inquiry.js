export const getInquiry = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/inquiry/`)
    .then((res) => res.json());
};

export const updateInquiry = (editingId, newInquiry) => {
  return fetch(`${process.env.REACT_APP_API_URL}/inquiry/${editingId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newInquiry),
  })
    .then((res) => res.json());
};

export const createInquiry = (newInquiry) => {
  return fetch(`${process.env.REACT_APP_API_URL}/inquiry`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newInquiry),
  })
    .then((res) => res.json());
};

export const deleteInquiry = (id) => {
  return fetch(`${process.env.REACT_APP_API_URL}/inquiry/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json());
};
