import { useEffect, useState } from "react";
import { getContacts, createContact } from "../assets/api/contacts";

const Contacts = ({ token }: { token: string }) => {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    job: "",
    address: "",
    notes: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getContacts(token);
      setContacts(data);
    };
    fetchData();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newContact = await createContact(form, token);
    setContacts([...contacts, newContact]);
    setForm({
      name: "",
      phone: "",
      email: "",
      job: "",
      address: "",
      notes: "",
    });
  };

  return (
    <div>
      <h1>Contacts</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Job"
          value={form.job}
          onChange={(e) => setForm({ ...form, job: e.target.value })}
        />
        <input
          type="text"
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
        <input
          type="text"
          placeholder="Notes"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
        <button type="submit">Add Contact</button>
      </form>
      <ul>
        {contacts.map((c: any) => (
          <li key={c._id}>
            {c.name} - {c.phone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
