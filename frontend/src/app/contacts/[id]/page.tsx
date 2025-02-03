import { contacts } from "@/data/contacts";
import Link from "next/link";

export default function ContactDetail({ params }: { params: { id: string } }) {
  const contact = contacts.find((c) => c.id === params.id);

  if (!contact) {
    return <div>Contact not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/" className="text-blue-500 hover:underline">
          &larr; Back to contacts
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">{contact.name}</h1>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-500">Phone Number</label>
            <p className="text-lg">{contact.phoneNumber}</p>
          </div>

          <div>
            <label className="text-sm text-gray-500">Email</label>
            <p className="text-lg">{contact.email || "Not provided"}</p>
          </div>

          <div className="pt-4 space-x-4">
            <Link
              href={`/contacts/${contact.id}/edit`}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Edit Contact
            </Link>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
              Delete Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
