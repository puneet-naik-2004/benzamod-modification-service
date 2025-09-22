// 🔹 Get all registered users
export const getUser = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/user`).then((res) => res.json());
};

// 🔹 Get single user by ID
export const getUserById = (id) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/${id}`).then((res) => res.json());
};

// 🔹 Create new user
export const createUser = (userData) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  }).then((res) => res.json());
};

// 🔹 Update user details (name, email, role, phone, etc.)
export const updateUser = (id, updatedData) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  }).then((res) => res.json());
};

// 🔹 Update user role only
export const updateUserRole = (id, roleData) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/${id}/role`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(roleData),
  }).then((res) => res.json());
};

// 🔹 Delete registered user
export const deleteUser = (id) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
};

// 🔹 Change password for logged-in user
export const changePassword = (passwords, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/change-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      currentPassword: passwords.currentPassword,
      newPassword: passwords.newPassword,
    }),
  }).then((res) => res.json());
};
