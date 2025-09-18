import { useEffect, useState } from "react";
import { getContacts, createContact } from "../assets/api/contacts";

// Define a Contact type (you can extend it later)
interface Contact {
  _id: string;
  name: string;
  phone: string;
  email: string;
  job?: string;
  address?: string;
  notes?: string;
}

const Contacts = ({ token }: { token: string }) => {
  const [contacts, setContacts] = useState<Contact[]>([]); // ✅ properly typed
  const [form, setForm] = useState<Omit<Contact, "_id">>({
    name: "",
    phone: "",
    email: "",
    job: "",
    address: "",
    notes: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getContacts(token);
        setContacts(data);
      } catch (err) {
        console.error("Failed to fetch contacts", err);
      }
    };
    fetchData();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newContact = await createContact(form, token);
      setContacts((prev) => [...prev, newContact]);
      setForm({
        name: "",
        phone: "",
        email: "",
        job: "",
        address: "",
        notes: "",
      });
    } catch (err) {
      console.error("Failed to create contact", err);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Contacts</h1>

      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
        <input
          className="border p-2 w-full rounded"
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border p-2 w-full rounded"
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          className="border p-2 w-full rounded"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="border p-2 w-full rounded"
          type="text"
          placeholder="Job"
          value={form.job}
          onChange={(e) => setForm({ ...form, job: e.target.value })}
        />
        <input
          className="border p-2 w-full rounded"
          type="text"
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
        <input
          className="border p-2 w-full rounded"
          type="text"
          placeholder="Notes"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded w-full"
        >
          Add Contact
        </button>
      </form>

      <ul className="space-y-2">
        {contacts.map((c) => (
          <li
            key={c._id}
            className="border p-2 rounded bg-gray-50 flex justify-between"
          >
            <span>
              <strong>{c.name}</strong> – {c.phone}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
