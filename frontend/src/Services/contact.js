export const getContact = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/contact`)
    .then((res) => res.json());
};

export const updateContact = (editingId, newContact) => {
  return fetch(`${process.env.REACT_APP_API_URL}/contact/${editingId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newContact),
  })
    .then((res) => res.json());
};

export const createContact = (newContact) => {
  return fetch(`${process.env.REACT_APP_API_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newContact),
  })
    .then((res) => res.json());
};

export const deleteContact = (id) => {
  return fetch(`${process.env.REACT_APP_API_URL}/contact/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json());
};
