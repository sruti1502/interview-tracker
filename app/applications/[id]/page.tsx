import { prisma } from "@/lib/prisma";
import EditApplicationForm from "@/components/EditApplicationForm";
import UploadedDocuments from "@/components/UploadedDocuments";
import AddInterviewNote from "@/components/AddInterviewNote";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ApplicationPage({
  params,
}: PageProps) {
  const { id } = await params;

  const application =
  await prisma.application.findUnique({
    where: {
      id,
    },
    include: {
  documents: true,
  interviewNotes: {
    orderBy: {
    createdAt: "desc",
    },
  },
},
  });

  if (!application) {
    return (
      <div className="p-8">
        Application not found
      </div>
    );
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Edit Application
      </h1>

      <div className="space-y-6">
        <EditApplicationForm
          application={application}
        />

        <UploadedDocuments
          documents={application.documents}
        />
        <AddInterviewNote
  applicationId={application.id}
/>
      </div>
    </main>
  );
}