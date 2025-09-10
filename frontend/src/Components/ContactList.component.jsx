import { useEffect, useState } from "react";
import { getContact, deleteContact } from "Services/contact";
import "../Style/Contact.css"; // ✅ Import CSS

export function ContactListComponent() {
  const [contacts, setContacts] = useState([]);

  // 🔹 Load contacts on mount
  useEffect(() => {
    getContact()
      .then((fetchedContacts) => {
        if (fetchedContacts.error) {
          setContacts([]);
        } else {
          setContacts(fetchedContacts.contact);
        }
      })
      .catch((err) => console.error("Error fetching contacts:", err));
  }, []);

  // 🔹 Delete contact
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;

    try {
      await deleteContact(id);
      setContacts(contacts.filter((c) => c._id !== id));
      alert("✅ Contact deleted successfully!");
    } catch (err) {
      console.error("Error deleting contact:", err);
      alert("❌ Failed to delete contact");
    }
  };

  return (
    <div className="contact-page">
      <h2 className="page-title">📋 Contact Messages</h2>

      <ul className="contact-grid">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <li key={contact._id} className="contact-card">
              <div className="contact-info">
                <p><strong>👤 Name:</strong> {contact.name}</p>
                <p><strong>📧 Email:</strong> {contact.email}</p>
                <p><strong>📞 Phone:</strong> {contact.phone || "N/A"}</p>
                <p><strong>💬 Message:</strong> {contact.message}</p>
              </div>

              <div className="contact-actions">
                <button
                  className="btn btn-view"
                  onClick={() =>
                    alert(`
Name: ${contact.name}
Email: ${contact.email}
Phone: ${contact.phone || "N/A"}
Message: ${contact.message}
                    `)
                  }
                >
                  👁 View
                </button>

                <button
                  className="btn btn-delete"
                  onClick={() => handleDelete(contact._id)}
                >
                  ❌ Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="no-results">No contacts found.</p>
        )}
      </ul>
    </div>
  );
}
