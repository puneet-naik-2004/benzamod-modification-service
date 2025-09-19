// 🔹 Get all registered users
export const getUser = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/user`)
    .then((res) => res.json());
};


// 🔹 Delete registered user
export const deleteUser = (id) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json());
};
// 🔹 Delete registered user
export const changePassword = (passwords,token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/change-password`, {
    method: "POST",
     headers: { "Content-Type": "application/json" ,Authorization: `Bearer ${token}`},
    body: JSON.stringify({
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
        }),
  })
    .then((res) => res.json());
};
