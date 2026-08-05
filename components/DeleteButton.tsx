"use client";

export default function DeleteButton({
  id,
}: {
  id: string;
}) {
  async function handleDelete() {
    await fetch(
      `/api/applications/${id}`,
      {
        method: "DELETE",
      }
    );

    window.location.reload();
  }

  return (
    <button
      onClick={handleDelete}
      className="text-red-500 ml-4"
    >
      Delete
    </button>
  );
}