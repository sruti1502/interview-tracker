import ApplicationForm from "@/components/ApplicationForm";

export default function NewApplicationPage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Add Application
      </h1>

      <ApplicationForm />
    </main>
  );
}