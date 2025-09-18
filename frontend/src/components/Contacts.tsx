import { useEffect, useState } from "react";
import { getContacts, addContact, deleteContact } from "../assets/api/contacts";

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

const Contacts = ({ token }: { token: string }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  // Fetch contacts on load
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await getContacts(token);
        setContacts(data);
      } catch (err) {
        console.error("Failed to fetch contacts:", err);
      }
    };
    fetchContacts();
  }, [token]);

  // Add new contact
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newContact = await addContact(form, token);
      setContacts([...contacts, newContact]);
      setForm({ name: "", email: "", phone: "" });
    } catch (err) {
      console.error("Failed to add contact:", err);
    }
  };

  // Delete contact
  const handleDelete = async (id: string) => {
    try {
      await deleteContact(id, token);
      setContacts(contacts.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Failed to delete contact:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">My Contacts</h2>

      {/* Add Contact Form */}
      <form
        onSubmit={handleAdd}
        className="bg-white shadow rounded-lg p-4 flex flex-col gap-3 mb-6"
      >
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Contact
        </button>
      </form>

      {/* Contact List */}
      <ul className="space-y-3">
        {contacts.map((c) => (
          <li
            key={c._id}
            className="flex justify-between items-center bg-gray-50 p-3 rounded shadow"
          >
            <div>
              <p className="font-medium">{c.name}</p>
              <p className="text-sm text-gray-600">{c.email}</p>
              <p className="text-sm text-gray-600">{c.phone}</p>
            </div>
            <button
              onClick={() => handleDelete(c._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
