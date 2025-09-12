// // import { useState } from "react";
// // import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
// // import { createContact } from "Services/contact"; 
// // import "../Style/Contact.css";

// // const containerStyle = {
// //   width: "100%",
// //   height: "400px",
// // };

// // const center = {
// //   lat: 12.999780,
// //   lng: 77.625526,
// // };

// // function Contact() {
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     phone: "",
// //     message: "",
// //   });

// //   const { isLoaded } = useJsApiLoader({
// //     id: "google-map-script",
// //     googleMapsApiKey: "AIzaSyB-Ls_QJXCERwv3AA9yP7p1by0-bbPPibo", // ⚠️ replace with your real key
// //   });

// //   // 🔹 Form input handler
// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   // 🔹 Submit new contact
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       await createContact(formData);
// //       setFormData({ name: "", email: "", phone: "", message: "" });
// //       alert("✅ Message sent successfully!");
// //     } catch (err) {
// //       console.error("Error sending contact:", err);
// //       alert("❌ Failed to send message");
// //     }
// //   };

// //   return (
// //     <div className="contact-page">
// //       <h2 className="page-title">📩 Contact Us</h2>

// //       {/* Contact Form + Map side by side */}
// //       <div className="contact-section">
// //         <form onSubmit={handleSubmit} className="contact-form">
// //           <input
// //             type="text"
// //             name="name"
// //             placeholder="Your Name"
// //             value={formData.name}
// //             onChange={handleChange}
// //             required
// //           />
// //           <input
// //             type="email"
// //             name="email"
// //             placeholder="Your Email"
// //             value={formData.email}
// //             onChange={handleChange}
// //             required
// //           />
// //           <input
// //             type="tel"
// //             name="phone"
// //             placeholder="Your Phone"
// //             value={formData.phone}
// //             onChange={handleChange}
// //           />
// //           <textarea
// //             name="message"
// //             placeholder="Your Message"
// //             value={formData.message}
// //             onChange={handleChange}
// //             required
// //           />
// //           <button type="submit" className="btn btn-primary">
// //             Send
// //           </button>
// //         </form>

// //         {/* Google Map */}
// //         <div className="contact-map">
// //           {isLoaded ? (
// //             <GoogleMap
// //               mapContainerStyle={containerStyle}
// //               center={center}
// //               zoom={12}
// //             >
// //               <Marker position={center} />
// //             </GoogleMap>
// //           ) : (
// //             <p>Loading map...</p>
// //           )}
// //         </div>
// //       </div>

// //       {/* WhatsApp Floating Button */}
// //       <a
// //         href="https://wa.me/+918310560287?text=Hello%20I%20have%20a%20query"
// //         target="_blank"
// //         rel="noopener noreferrer"
// //         className="whatsapp-float"
// //       >
// //         💬
// //       </a>
// //     </div>
// //   );
// // }

// // export default Contact;




// import { useState } from "react";
// import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
// import { createContact } from "Services/contact"; 
// import "../Style/Contact.css";

// const containerStyle = {
//   width: "100%",
//   height: "250px",
// };

// const center = {
//   lat: 12.999780,
//   lng: 77.625526,
// };

// function Contact() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     message: "",
//   });

//   const { isLoaded } = useJsApiLoader({
//     id: "google-map-script",
//     googleMapsApiKey: "AIzaSyB-Ls_QJXCERwv3AA9yP7p1by0-bbPPibo", // ⚠️ replace with your real key
//   });

//   // Input handler
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Submit new contact
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await createContact(formData);
//       setFormData({ name: "", email: "", phone: "", message: "" });
//       alert("✅ Message sent successfully!");
//     } catch (err) {
//       console.error("Error sending contact:", err);
//       alert("❌ Failed to send message");
//     }
//   };

//   return (
//     <div className="contact-page">
//       <h2 className="page-title">📩 Get in Touch</h2>

//       {/* Contact Form + Map + Details side by side */}
//       <div className="contact-section">
//         {/* Left - Form */}
//         <form onSubmit={handleSubmit} className="contact-form">
//           <h3>Contact Form</h3>
//           <input
//             type="text"
//             name="name"
//             placeholder="Your Name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Your Email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="tel"
//             name="phone"
//             placeholder="Your Phone"
//             value={formData.phone}
//             onChange={handleChange}
//           />
//           <textarea
//             name="message"
//             placeholder="Your Message"
//             value={formData.message}
//             onChange={handleChange}
//             required
//           />
//           <button type="submit" className="btn btn-primary">
//             Send Message
//           </button>
//         </form>

//         {/* Right - Map + Details */}
//         <div className="contact-info">
//           {isLoaded ? (
//             <GoogleMap
//               mapContainerStyle={containerStyle}
//               center={center}
//               zoom={14}
//             >
//               <Marker position={center} />
//             </GoogleMap>
//           ) : (
//             <p>Loading map...</p>
//           )}

//           {/* Dummy Business Details */}
//           <div className="contact-details">
//             <h3>Benzomods Details</h3>
//             <p><b>📍 Address:</b> 123 MG Road, Bangalore, India</p>
//             <p><b>⏰ Timings:</b> Mon - Sat : 10:00 AM - 8:00 PM</p>
//             <p><b>📞 Phone:</b> +91 8310560287</p>
//             <a
//               href="https://wa.me/+918310560287?text=Hello%20I%20have%20a%20query"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="btn btn-success whatsapp-btn"
//             >
//               💬 Chat on WhatsApp
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Contact;



import { useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { createContact } from "Services/contact";
import "../Style/Contact.css";

const containerStyle = {
  width: "100%",
  height: "200px",
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
    googleMapsApiKey: "AIzaSyB-Ls_QJXCERwv3AA9yP7p1by0-bbPPibo", // replace with your real key
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createContact(formData);
      setFormData({ name: "", email: "", phone: "", message: "" });
      alert("✅ Contact form submitted successfully!");
    } catch (err) {
      console.error("Error sending contact:", err);
      alert("❌ Failed to send message");
    }
  };

  return (
    <div className="contact-page">
      <h2 className="page-title">Get in Touch</h2>

      <div className="contact-section">
        {/* Left: Contact Form */}
        <form onSubmit={handleSubmit} className="contact-form">
          <h3>Contact Form</h3>
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
          <button type="submit" className="btn-submit">
            Send Message
          </button>
        </form>

        {/* Right: Map + Business Details */}
        <div className="contact-right">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={14}
            >
              <Marker position={center} />
            </GoogleMap>
          ) : (
            <p>Loading map...</p>
          )}

          <div className="contact-details">
            <h3>Benzomods Details</h3>
            <p><b>📍 Address:</b> 123 MG Road, Bangalore, India</p>
            <p><b>⏰ Timings:</b> Mon - Sat : 10:00 AM - 8:00 PM</p>
            <p><b>📞 Phone:</b> +91 8310560287</p>
            <a
              href="https://wa.me/+918310560287?text=Hello%20I%20have%20a%20query"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              💬 Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
