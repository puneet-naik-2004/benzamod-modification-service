import React, { useEffect, useState } from "react";
import {  deleteInquiry, getInquiry } from "Services/inquiry";
 import "../Style/InquiryList.css"
 function InquiryList() {
  const [inquiry, setInquiry] = useState([]);

  // Load registered users
  useEffect(() => {
    getInquiry().then((data) => {
      if (!data.error) setInquiry(data.inquiry || []);
    });
  }, []);

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteInquiry(id);
      setInquiry(inquiry.filter((u) => u._id !== id));
      alert("✅ Inquiry deleted successfully!");
    } catch (err) {
      console.error("Error deleting inquiry:", err);
      alert("❌ Failed to delete inquiry");
    }
  };

  return (
    <div className="inquiry-container">
      <h2>🧑‍💻 Inquiey</h2>
      <div className="user-list">
        {inquiry.length > 0 ? (
          inquiry.map((inquiry) => (
            <div key={inquiry._id} className="inquiry-card">
              <div className="inquiry-info">
                <h4>👤 {inquiry.name}</h4>
                <p>📧 {inquiry.email}</p>
                <p> {inquiry.message }</p>
             
              </div>
              <div className="inquiry-actions">
                <button
                  className="btn-view"
                  onClick={() =>
                    alert(`
Name: ${inquiry.name}
Email: ${inquiry.email}
Message: ${inquiry.phone }

                    `)
                  }
                >
                  👁 View
                </button>
                {/* <button
                  className="btn-delete"
                  onClick={() => handleDelete(inquiry._id)}
                >
                  {/* ❌ Delete */}
                {/* </button> */} 
              </div>
            </div>
          ))
        ) : (
          <p>No inquiry found.</p>
        )}
      </div>
    </div>
  );
}
export default InquiryList