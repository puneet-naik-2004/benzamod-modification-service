
export const registerUser = async (userData) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: "Network Error" };
  }
};


export const loginUser = async (credentials) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: "Network Error" };
  }
};
