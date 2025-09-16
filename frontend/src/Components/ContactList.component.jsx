import { useEffect, useState } from "react";
import { getContact, deleteContact } from "Services/contact";
import "../Style/ContactList.css"; // ✅ Import CSS

export function ContactListComponent() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
      setContacts((prev) => prev.filter((c) => c._id !== id));
      alert("✅ Contact deleted successfully!");
    } catch (err) {
      console.error("Error deleting contact:", err);
      alert("❌ Failed to delete contact");
    }
  };

  // 🔹 Filter contacts by search term
  const filteredContacts = contacts.filter((contact) => {
    const term = searchTerm?.toLowerCase();
    return (
      contact.name?.toLowerCase().includes(term) ||
      contact.email?.toLowerCase().includes(term) ||
      (contact.phone && contact.phone?.toLowerCase().includes(term)) ||
      (contact.message && contact.message?.toLowerCase().includes(term))
    );
  });

  return (
    <div className="contact-page">
      <h2 className="page-title">📋 Contact Messages</h2>

      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search by name, email, phone, or message..."
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredContacts.length > 0 ? (
        <table className="contact-table">
          <thead>
            <tr>
              <th>👤 Name</th>
              <th>📧 Email</th>
              <th>📞 Phone</th>
              <th>💬 Message</th>
              <th>⚡ Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map((contact) => (
              <tr key={contact._id}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone || "N/A"}</td>
                <td>{contact.message}</td>
                <td className="actions">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-results">No contacts found.</p>
      )}
    </div>
  );
}
