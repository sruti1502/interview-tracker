"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  documents: {
    id: string;
    fileName: string;
    fileUrl: string;
    fileType: string;
    fileSize: number;
  }[];
}

export default function UploadedDocuments({
  documents,
}: Props) {
  const router = useRouter();

  async function deleteDocument(id: string) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this document?"
    );

    if (!confirmDelete) return;

    const response = await fetch(
      `/api/documents/${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      alert("Document deleted successfully.");
      router.refresh();
    } else {
      alert("Failed to delete document.");
    }
  }

  return (
    <div className="border rounded-lg p-5 mt-6">

      <h2 className="text-xl font-bold mb-4">
        Uploaded Documents
      </h2>

      {documents.length === 0 ? (
        <p className="text-gray-500">
          No documents uploaded.
        </p>
      ) : (
        <div className="space-y-3">

          {documents.map((doc) => (

            <div
              key={doc.id}
              className="flex justify-between items-center border rounded p-3"
            >

              <div>

                <p className="font-medium">
                  {doc.fileName}
                </p>

                <p className="text-sm text-gray-500">
                  {doc.fileType}
                </p>

                <p className="text-sm text-gray-500">
                  {(doc.fileSize / 1024).toFixed(2)} KB
                </p>

              </div>

              <div className="flex gap-2">

                <Link
                  href={doc.fileUrl}
                  target="_blank"
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Download
                </Link>

                <button
                  onClick={() =>
                    deleteDocument(doc.id)
                  }
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}