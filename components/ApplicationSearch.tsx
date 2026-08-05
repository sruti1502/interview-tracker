"use client";

import { useRouter } from "next/navigation";

export default function ApplicationSearch() {
  const router = useRouter();

  function handleSearch(
    value: string
  ) {
    router.push(
      `/applications?search=${value}`
    );
  }

  return (
    <input
      placeholder="Search company..."
      className="border p-2 rounded"
      onChange={(e) =>
        handleSearch(
          e.target.value
        )
      }
    />
  );
}