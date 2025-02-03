const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

export interface Contact {
  id?: string;
  name: string;
  phoneNumber: string;
  email?: string;
}

export async function getContacts(): Promise<Contact[]> {
  const response = await fetch(`${API_BASE}/contacts`);
  if (!response.ok) throw new Error("Failed to fetch contacts");
  return response.json();
}

export async function getContact(id: string): Promise<Contact> {
  const response = await fetch(`${API_BASE}/contacts/${id}`);
  if (!response.ok) throw new Error("Failed to fetch contact");
  return response.json();
}

export async function createContact(
  contact: Omit<Contact, "id">
): Promise<Contact> {
  const response = await fetch(`${API_BASE}/contacts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  });
  if (!response.ok) throw new Error("Failed to create contact");
  return response.json();
}

export async function updateContact(
  id: string,
  contact: Omit<Contact, "id">
): Promise<Contact> {
  const response = await fetch(`${API_BASE}/contacts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  });
  if (!response.ok) throw new Error("Failed to update contact");
  return response.json();
}

export async function deleteContact(id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/contacts/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete contact");
}
