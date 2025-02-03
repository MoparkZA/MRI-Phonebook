// src/app/contacts/[id]/edit/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-black">Contact Not Found</h2>
        <p className="mt-2 text-gray-600">
          The contact you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block bg-white text-black border border-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Back to Contacts
        </Link>
      </div>
    </div>
  );
}
