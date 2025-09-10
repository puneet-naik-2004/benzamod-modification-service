import { useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { createContact } from "Services/contact"; 
import "../Style/Contact.css";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 12.999780,
  lng: 77.625526,
};

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyB-Ls_QJXCERwv3AA9yP7p1by0-bbPPibo", // ⚠️ replace with your real key
  });

  // 🔹 Form input handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Submit new contact
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createContact(formData);
      setFormData({ name: "", email: "", phone: "", message: "" });
      alert("✅ Message sent successfully!");
    } catch (err) {
      console.error("Error sending contact:", err);
      alert("❌ Failed to send message");
    }
  };

  return (
    <div className="contact-page">
      <h2 className="page-title">📩 Contact Us</h2>

      {/* Contact Form + Map side by side */}
      <div className="contact-section">
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn btn-primary">
            Send
          </button>
        </form>

        {/* Google Map */}
        <div className="contact-map">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={12}
            >
              <Marker position={center} />
            </GoogleMap>
          ) : (
            <p>Loading map...</p>
          )}
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/+918310560287?text=Hello%20I%20have%20a%20query"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
      >
        💬
      </a>
    </div>
  );
}

export default Contact;

