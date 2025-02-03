import ContactForm from "@/components/ContactForm";
import { getContact } from "@/lib/api";
import notFound from "./not-found";

export default async function EditContact({
  params,
}: {
  params: { id: string };
}) {
  try {
    const contact = await getContact(params.id);

    if (!contact) {
      notFound();
    }

    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-black mb-6">Edit Contact</h1>
        <ContactForm
          mode="edit"
          id={params.id}
          initialData={{
            name: contact.name,
            phoneNumber: contact.phoneNumber,
            email: contact.email || "",
          }}
        />
      </div>
    );
  } catch (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          Failed to load contact. Please try again later.
        </div>
      </div>
    );
  }
}
// Add error handling
export function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: `Edit Contact - ${params.id}`,
  };
}
