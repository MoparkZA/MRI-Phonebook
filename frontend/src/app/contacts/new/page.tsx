import ContactForm from "@/components/ContactForm";

export default function NewContact() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-black mb-6">Add New Contact</h1>
      <ContactForm mode="create" />
    </div>
  );
}
