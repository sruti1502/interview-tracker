"use client";

export default function ExportButton() {
  function handleExport() {
    window.location.href =
      "/api/export";
  }

  return (
    <button
      onClick={handleExport}
      className="bg-green-600 text-white px-4 py-2 rounded"
    >
      Export Excel
    </button>
  );
}