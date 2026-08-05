import { prisma } from "@/lib/prisma";
import EditApplicationForm from "@/components/EditApplicationForm";

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const application =
    await prisma.application.findUnique({
      where: { id },
    });

  if (!application) {
    return <div>Application not found</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Edit Application
      </h1>

      <EditApplicationForm
        application={application}
      />
    </div>
  );
}