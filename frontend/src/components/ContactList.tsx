"use client";

import { Contact } from "@/types/contact";
import { useState } from "react";
import Link from "next/link";

export default function ContactList({
  initialContacts,
}: {
  initialContacts: Contact[];
}) {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phoneNumber.includes(searchTerm)
  );

  const deleteContact = async (id: string) => {
    try {
      const response = await fetch(`/api/contacts/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setContacts(contacts.filter((contact) => contact.id !== id));
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search contacts..."
          className="w-full p-2 border rounded"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-4">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold">{contact.name}</h3>
              <p>{contact.phoneNumber}</p>
              {contact.email && (
                <p className="text-gray-600">{contact.email}</p>
              )}
            </div>
            <div className="space-x-2">
              <Link
                href={`/contacts/${contact.id}/edit`}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Edit
              </Link>
              <button
                onClick={() => contact.id && deleteContact(contact.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
