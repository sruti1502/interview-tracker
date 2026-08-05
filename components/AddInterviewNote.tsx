"use client";

import { useState } from "react";

interface Props {
  applicationId: string;
}

export default function AddInterviewNote({
  applicationId,
}: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function saveNote() {
    if (!title || !content) return;

    const response = await fetch(
      "/api/interview-notes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          applicationId,
        }),
      }
    );

    if (response.ok) {
      alert("Interview note saved");
      location.reload();
    } else {
      alert("Failed");
    }
  }

  return (
    <div className="border rounded-lg p-5 mt-6">

      <h2 className="text-xl font-bold mb-4">
        Interview Notes
      </h2>

      <input
        placeholder="Interview Round"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        className="border p-2 w-full mb-3"
      />

      <textarea
        placeholder="Questions, answers, feedback..."
        value={content}
        onChange={(e) =>
          setContent(e.target.value)
        }
        className="border p-2 w-full h-40"
      />

      <button
        onClick={saveNote}
        className="bg-green-600 text-white px-4 py-2 rounded mt-4"
      >
        Save Note
      </button>

    </div>
  );
}