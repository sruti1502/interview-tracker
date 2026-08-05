"use client";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

interface Props {
  notes: Note[];
}

export default function InterviewNotesList({
  notes,
}: Props) {

  async function deleteNote(id: string) {

    const confirmDelete =
      confirm("Delete this interview note?");

    if (!confirmDelete) return;

    const response = await fetch(
      `/api/interview-notes/${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      location.reload();
    } else {
      alert("Delete failed");
    }
  }

  if (notes.length === 0) {
    return (
      <div className="border rounded-lg p-5 mt-6">
        <h2 className="text-xl font-bold">
          Interview Notes
        </h2>

        <p>No notes yet.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-5 mt-6">

      <h2 className="text-xl font-bold mb-5">
        Interview Notes
      </h2>

      <div className="space-y-5">

        {notes.map((note) => (

          <div
            key={note.id}
            className="border rounded-lg p-4"
          >

            <div className="flex justify-between">

              <h3 className="font-bold">
                {note.title}
              </h3>

              <button
                onClick={() =>
                  deleteNote(note.id)
                }
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>

            </div>

            <p className="mt-3 whitespace-pre-wrap">
              {note.content}
            </p>

            <p className="text-gray-500 text-sm mt-3">
              {new Date(
                note.createdAt
              ).toLocaleDateString()}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}