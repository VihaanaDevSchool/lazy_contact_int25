const API_URL = "http://localhost:5000/api/contacts";

export const getContacts = async (token: string) => {
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const createContact = async (data: any, token: string) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};
