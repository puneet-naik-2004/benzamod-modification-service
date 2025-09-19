


import React, { useEffect, useState } from "react";
import { deleteInquiry, getInquiry } from "Services/inquiry";
import "../Style/InquiryList.css";

function InquiryList() {
  const [inquiries, setInquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // 🔹 Load inquiries on mount
  useEffect(() => {
    getInquiry().then((data) => {
      if (!data.error) setInquiries(data.inquiry || []);
    });
  }, []);

  // 🔹 Delete inquiry
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this inquiry?")) return;
    try {
      await deleteInquiry(id);
      setInquiries((prev) => prev.filter((inq) => inq._id !== id));
      alert("✅ Inquiry deleted successfully!");
    } catch (err) {
      console.error("Error deleting inquiry:", err);
      alert("❌ Failed to delete inquiry");
    }
  };

  // 🔹 Filtered inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    const term = searchTerm.toLowerCase();
    return (
     
      inq.name.toLowerCase().includes(term) ||
      inq.email.toLowerCase().includes(term) ||
      (inq.message && inq.message.toLowerCase().includes(term))
    );
  });

  return (
    <div className="inquiry-container">
      <h2 className="page-title">🧑‍💻 Inquiries</h2>

      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search inquiries..."
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredInquiries.length > 0 ? (
        <table className="inquiry-table">
          <thead>
            <tr>
              <th>Productid</th>
              <th>Product</th>
              <th>👤 Name</th>
              <th>📧 Email</th>
              <th>💬 Message</th>
              <th>⚡ Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInquiries.map((inq) => (
              <tr key={inq._id}>
                <td>{inq.product_id?._id}</td>
                <td>{inq.product_id?.title}</td>
                <td>{inq.name}</td>
                <td>{inq.email}</td>
                <td>{inq.message}</td>
                <td className="actions">
                  <button
                    className="btn btn-view"
                    onClick={() =>
                      alert(`
Product_id:${inq.product_id}                        
Product:${inq.title}                       
Name: ${inq.name}
Email: ${inq.email}
Message: ${inq.message}
                      `)
                    }
                  >
                    👁 View
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(inq._id)}
                  >
                    ❌ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-results">No inquiries found.</p>
      )}
    </div>
  );
}

export default InquiryList;
