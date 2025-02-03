"use client";

import { useEffect, useState } from "react";
import { Contact, getContacts, deleteContact } from "@/lib/api";
import Link from "next/link";

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await getContacts();
        setContacts(data);
      } catch (err) {
        setError("Failed to fetch contacts");
      } finally {
        setIsLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (isLoading) {
    return (
      <div
        className="flex justify-center items-center min-h-[60vh]"
        role="status"
        aria-label="Loading contacts"
      >
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold text-black">Contacts</h1>
        <Link
          href="/contacts/new"
          className="bg-white text-black border border-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors w-full sm:w-auto text-center"
        >
          Add Contact
        </Link>
      </div>

      <div className="grid gap-4">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow border"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <h2 className="text-xl font-semibold text-black mb-2">
                  {contact.name}
                </h2>
                <p className="text-gray-600 mb-1">{contact.phoneNumber}</p>
                {contact.email && (
                  <p className="text-gray-500 text-sm">{contact.email}</p>
                )}
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Link
                  href={`/contacts/${contact.id}/edit`}
                  className="flex-1 sm:flex-none bg-white text-black border border-black px-4 py-2 rounded-lg hover:bg-gray-100 text-center"
                >
                  Edit
                </Link>
                <button
                  onClick={async () => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this contact?"
                      )
                    ) {
                      try {
                        await deleteContact(contact.id!);
                        setContacts(
                          contacts.filter((c) => c.id !== contact.id)
                        );
                      } catch (err) {
                        setError("Failed to delete contact");
                      }
                    }
                  }}
                  className="flex-1 sm:flex-none bg-white text-black border border-black px-4 py-2 rounded-lg hover:bg-gray-100 text-center"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {contacts.length === 0 && (
          <div className="text-center text-gray-500 py-12 bg-white rounded-lg shadow">
            No contacts found. Add your first contact!
          </div>
        )}
      </div>
    </div>
  );
}
