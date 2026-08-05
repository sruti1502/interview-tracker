"use client";

export default function MoveButton({
  id,
  currentStatus,
}: {
  id: string;
  currentStatus: string;
}) {
  async function moveApplication() {
    let nextStatus = "INTERVIEW";

    if (currentStatus === "APPLIED") {
      nextStatus = "INTERVIEW";
    } else if (currentStatus === "INTERVIEW") {
      nextStatus = "OFFER";
    }

    await fetch(`/api/applications/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: nextStatus,
      }),
    });

    window.location.reload();
  }

  return (
    <button
      onClick={moveApplication}
      className="bg-blue-500 text-white px-2 py-1 rounded mt-2"
    >
      Move
    </button>
  );
}