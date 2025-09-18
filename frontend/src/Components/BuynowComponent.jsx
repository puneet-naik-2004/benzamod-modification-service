// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { buynowCart } from "Services/cart";
// import "../Style/Buynow.css";

// export const BuynowComponent = () => {
//   const [address, setAddress] = useState({
//     street: "",
//     city: "",
//     state: "",
//     zip: "",
//     country: "India",
//   });
//   const navigate = useNavigate();
//   const { id } = useParams();
//   useEffect(() => {
//     const user = localStorage.getItem("user");
//     if (!user) {
//       navigate("/login"); // redirect to login if no user
//     }
//   }, [navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setAddress((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const user = localStorage.getItem("user");
//     const response = await buynowCart({ address, user: JSON.parse(user) }, id);
//     console.log("BuyNow Response:", response);

//     if (response.success) {
//       alert("Order placed successfully!");
//       navigate("/orders"); // redirect user to orders page after success
//     } else {
//       alert("Something went wrong: " + response.message);
//     }
//   };

//   return (
//     <div className="buy-now-container">
//       <h2>Enter Your Shipping Address</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="street"
//           placeholder="Street"
//           value={address.street}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="city"
//           placeholder="City"
//           value={address.city}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="state"
//           placeholder="State"
//           value={address.state}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="zip"
//           placeholder="Zip Code"
//           value={address.zip}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="country"
//           placeholder="Country"
//           value={address.country}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Buy Now</button>
//       </form>
//     </div>
//   );
// };





import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { buynowCart } from "Services/cart";
import "../Style/Buynow.css";

export const BuynowComponent = () => {
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "India",
    paymentMethod:""
  });

  const [paymentMethod, setPaymentMethod] = useState("COD"); // ✅ default

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login"); // redirect to login if no user
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = localStorage.getItem("user");
    const response = await buynowCart(
      { address, user: JSON.parse(user), paymentMethod },
      id
    );console.log(paymentMethod);

    console.log("BuyNow Response:", response);

    if (response.success) {
      alert("Order placed successfully!");
      navigate("/orders"); // redirect user to orders page after success
    } else {
      alert("Something went wrong: " + response.message);
    }
  };

  return (
    <div className="buy-now-container">
      <h2>Enter Your Shipping Address</h2>
      <form onSubmit={handleSubmit}>
        {/* Address Inputs */}
        <input
          type="text"
          name="street"
          placeholder="Street"
          value={address.street}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={address.city}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={address.state}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="zip"
          placeholder="Zip Code"
          value={address.zip}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={address.country}
          onChange={handleChange}
          required
        />

        {/* ✅ Payment Method */}
        <h3>Select Payment Method</h3>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          required
        >
          <option value="COD">💵 Cash on Delivery</option>
          <option value="UPI">📱 UPI</option>
          <option value="Card">💳 Credit/Debit Card</option>
          <option value="NetBanking">🏦 Net Banking</option>
        </select>


        <button type="submit">Buy Now</button>
      </form>
    </div>
  );
};

