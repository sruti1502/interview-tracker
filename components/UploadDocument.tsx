"use client";

import { useState } from "react";

interface Props {
  applicationId: string;
}

export default function UploadDocument({
  applicationId,
}: Props) {

  console.log("UploadDocument rendered");

  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  async function uploadFile() {

  console.log("Upload button clicked");

  // existing upload code...
    if (!file) return;

    setLoading(true);

    const formData = new FormData();

    formData.append("file", file);
    formData.append(
      "applicationId",
      applicationId
    );

    const response = await fetch(
      "/api/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      alert("Upload successful");

      setFile(null);

      location.reload();
    } else {
      alert("Upload failed");
    }

    setLoading(false);
  }

  return (
    <div className="border rounded-lg p-4 space-y-4">

      <h2 className="text-xl font-bold">
        📎 Documents
      </h2>

      <input
        type="file"
        onChange={(e) =>
          setFile(
            e.target.files?.[0] || null
          )
        }
      />

     <button
  type="button"
  onClick={() => {
    alert("Upload clicked");
    uploadFile();
  }}
  disabled={!file || loading}
  className="bg-blue-600 text-white px-4 py-2 rounded"
>
  {loading
    ? "Uploading..."
    : "Upload"}
</button>

    </div>
  );
}