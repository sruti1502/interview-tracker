"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function ApplicationSort() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort =
    searchParams.get("sort") || "newest";

  function handleSort(sort: string) {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    params.set("sort", sort);

    // Return to page 1 whenever sorting changes
    params.set("page", "1");

    router.push(
      `/applications?${params.toString()}`
    );
  }

  return (
    <select
      value={currentSort}
      onChange={(e) =>
        handleSort(e.target.value)
      }
      className="border rounded-lg px-3 py-2 bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
    >
      <option value="newest">
        Newest Added
      </option>

      <option value="oldest">
        Oldest Added
      </option>

      <option value="company-asc">
        Company A-Z
      </option>

      <option value="company-desc">
        Company Z-A
      </option>

      <option value="applied-newest">
        Applied Date: Newest
      </option>

      <option value="applied-oldest">
        Applied Date: Oldest
      </option>
    </select>
  );
}