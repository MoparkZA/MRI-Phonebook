"use client";

import { createContact, updateContact } from "@/lib/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface FormData {
  name: string;
  phoneNumber: string;
  email: string;
}

export default function ContactForm({
  initialData,
  mode,
  id,
}: {
  initialData?: FormData;
  mode: "create" | "edit";
  id?: string;
}) {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>(
    initialData || {
      name: "",
      phoneNumber: "",
      email: "",
    }
  );
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (mode === "create") {
        await createContact(formData);
      } else if (mode === "edit" && id) {
        await updateContact(id, formData);
      }
      router.push("/");
      router.refresh();
    } catch (err) {
      setError("Failed to save contact");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
      {error && (
        <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label
            className="block text-sm font-medium text-black mb-1"
            htmlFor="name"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-3 border-2 border-black rounded-lg focus:ring-1 focus:ring-black focus:border-black outline-none text-black placeholder-gray-500"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium text-black mb-1"
            htmlFor="phone"
          >
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            required
            value={formData.phoneNumber}
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
            className="w-full p-3 border-2 border-black rounded-lg focus:ring-1 focus:ring-black focus:border-black outline-none text-black placeholder-gray-500"
            placeholder="123-456-7890"
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium text-black mb-1"
            htmlFor="email"
          >
            Email (optional)
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full p-3 border-2 border-black rounded-lg focus:ring-1 focus:ring-black focus:border-black outline-none text-black placeholder-gray-500"
            placeholder="john@example.com"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            type="submit"
            className="w-full sm:w-auto flex-1 bg-white text-black border border-black px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            {mode === "create" ? "Add Contact" : "Update Contact"}
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto flex-1 bg-white text-black border border-black px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors text-center"
          >
            Cancel
          </Link>
        </div>
      </div>
    </form>
  );
}
