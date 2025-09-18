import { useEffect, useState } from "react";
import axios from "axios";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

export default function App() {
  const [contacts, setContacts] = useState<any[]>([]);

  const fetchContacts = async () => {
    const res = await axios.get("http://localhost:5000/api/contacts");
    setContacts(res.data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const addContact = async (contact: any) => {
    const res = await axios.post("http://localhost:5000/api/contacts", contact);
    setContacts([...contacts, res.data]);
  };

  const deleteContact = async (id: string) => {
    await axios.delete(`http://localhost:5000/api/contacts/${id}`);
    setContacts(contacts.filter((c) => c._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">📒 Contact Manager</h1>
      <ContactForm onAdd={addContact} />
      <ContactList contacts={contacts} onDelete={deleteContact} />
    </div>
  );
}
