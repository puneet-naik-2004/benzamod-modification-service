// 🔹 Get all registered users
export const getPortfolio = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/portfolio`)
    .then((res) => res.json());
};


export const createPortfolio = (newPortfolio) => {
  return fetch(`${process.env.REACT_APP_API_URL}/portfolio`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPortfolio),
  })
    .then((res) => res.json());
};



// 🔹 Delete registered user
export const deletePortfolio = (id) => {
  return fetch(`${process.env.REACT_APP_API_URL}/portfolio/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json());
};
