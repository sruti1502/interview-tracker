import Link from "next/link";

interface Props {
  currentPage: number;
  totalPages: number;
  search?: string;
  sort?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  search = "",
  sort = "newest",
}: Props) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-4 mt-8">

      {currentPage > 1 && (
        <Link
          href={`/applications?page=${
            currentPage - 1
          }&search=${search}&sort=${sort}`}
          className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Previous
        </Link>
      )}

      <span className="font-medium">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages && (
        <Link
          href={`/applications?page=${
            currentPage + 1
          }&search=${search}&sort=${sort}`}
          className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Next
        </Link>
      )}

    </div>
  );
}