import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Style/ServiceDetail.css";

import { createInquiry } from "Services/inquiry";
import { getServices } from "Services/service";
import { createOrder } from "Services/order"; // ✅ order for Buy Now
import { useAuth } from "Context/AuthContext"; // ✅ auth check
import { createCart } from "Services/cart";

export const ServiceDetailComponent = () => {
  const { name: service_id,type } = useParams();
  const [service, setService] = useState({});
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    getServices().then((fetchedServices) => {
      if (!fetchedServices.error) {
        setService(fetchedServices.find((data) => data._id === service_id));
      }
    });
  }, [service_id]);

  // Inquiry form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  if (!service) return <h2>Service Not Found</h2>;

  // --- INQUIRY ---
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name?.trim() || !email?.trim() || !description?.trim()) {
      alert("Please fill all fields!");
      return;
    }
    const newInquiry = { name, email, description };
    createInquiry(newInquiry)
      .then(() => {
        resetForm();
        alert("✅ Inquiry submitted successfully!");
      })
      .catch((err) => console.error("Error adding inquiry:", err));
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setDescription("");
  };

  // --- CART (frontend only) ---
  const handleAddToCart = () => {
    if (!user) {
      navigate("/login", { state: { from: `/service/${type}/${service_id}` } });
      return;
    }
    // setCart([...cart, service]);
    // alert(`${service.title} added to cart!`);

    const cartData = {
      service_id: service._id,
      title: service.title,
      description: service.description,
      photo: service.photo,
      customer_id: user._id,
      addedDate: new Date().toISOString(),
      type: service.type,
      price: service.price,
    };

    createCart(cartData)
      .then((res) => {
        if (!res.error) {
          alert("⚡ Service purchased successfully!");
          navigate("/cart"); // redirect after buy
        } else {
          alert("❌ Failed to complete purchase");
        }
      })
      .catch(() => alert("⚠️ Server error"));
  };

  // --- BUY NOW (backend order) ---
  const handleBuyNow = () => {
    if (!user) {
      navigate("/login", { state: { from: `/service/${service_id}` } });
      return;
    }

    const orderData = {
      serviceId: service._id,
      title: service.title,
      description: service.description,
      photo: service.photo,
      customer_id: user._id,
      type: service.type,
      price: service.price,
    };

    createOrder(orderData)
      .then((res) => {
        console.log(res);
        if (!res.error) {
          alert("✅ Service booked successfully!");
        } else {
          alert("❌ Failed to book service");
        }
      })
      .catch(() => alert("⚠️ Server error"));
  };

  return (
    <div className="service-detail">
      {/* Left: Service Info */}
      <div className="service-card">
        <h2>{service.title}</h2>
        <img src={service.photo} alt={service.title} />
        <p>{service.description}</p>

        <button className="btn btn-cart" onClick={handleAddToCart}>
          🛒 Add to Cart
        </button>

        <button className="btn btn-buy" onClick={handleBuyNow}>
          ⚡ BUY NOW
        </button>
      </div>

      {/* Right: Inquiry Form */}
      <form onSubmit={handleSubmit} className="inquiry-form">
        <h3>Inquiry Form</h3>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <textarea
          placeholder="Your Message"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        <button type="submit">Submit Inquiry</button>
      </form>
    </div>
  );
};
