import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";
import Link from "next/link";

import StatusBadge from "@/components/StatusBadge";
import ApplicationSearch from "@/components/ApplicationSearch";
import ApplicationSort from "@/components/ApplicationSort";
import ExportButton from "@/components/ExportButton";
import Pagination from "@/components/Pagination";

interface PageProps {
  searchParams: Promise<{
    search?: string;
    page?: string;
    sort?: string;
  }>;
}

export default async function ApplicationsPage({
  searchParams,
}: PageProps) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <div className="p-8">No user found</div>;
  }

  const params = await searchParams;

  const search = params.search || "";
  const sort = params.sort || "newest";

  const currentPage = Number(params.page || "1");
  const pageSize = 10;

  const skip = (currentPage - 1) * pageSize;

  let orderBy: any;

  switch (sort) {
    case "oldest":
      orderBy = {
        createdAt: "asc",
      };
      break;

    case "company-asc":
      orderBy = {
        company: "asc",
      };
      break;

    case "company-desc":
      orderBy = {
        company: "desc",
      };
      break;

    case "applied-newest":
      orderBy = {
        appliedDate: "desc",
      };
      break;

    case "applied-oldest":
      orderBy = {
        appliedDate: "asc",
      };
      break;

    default:
      orderBy = {
        createdAt: "desc",
      };
  }

  const where = {
    userId: currentUser.id,

    company: {
      contains: search,
      mode: "insensitive" as const,
    },
  };

  const applications = await prisma.application.findMany({
    where,
    orderBy,
    skip,
    take: pageSize,
  });

  const totalApplications = await prisma.application.count({
    where,
  });

  const totalPages = Math.ceil(
    totalApplications / pageSize
  );

  return (
    <main className="p-8">

      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">

        <h1 className="text-3xl font-bold">
          Applications
        </h1>

        <div className="flex gap-3">

          <ExportButton />

          <Link
            href="/applications/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Add Application
          </Link>

        </div>

      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">

        <div className="flex-1">
          <ApplicationSearch />
        </div>

        <ApplicationSort />

      </div>

      <div className="overflow-x-auto rounded-xl border">

        <table className="w-full">

          <thead>

            <tr className="bg-gray-100 dark:bg-gray-800 border-b">

              <th className="text-left p-3">
                Company
              </th>

              <th className="text-left p-3">
                Role
              </th>

              <th className="text-left p-3">
                Status
              </th>

              <th className="text-left p-3">
                Location
              </th>

              <th className="text-left p-3">
                Salary
              </th>

              <th className="text-left p-3">
                Recruiter
              </th>

              <th className="text-left p-3">
                Applied
              </th>

            </tr>

          </thead>

          <tbody>

            {applications.map((app : any) => (

              <tr
                key={app.id}
                className="border-b hover:bg-gray-50 dark:hover:bg-gray-900"
              >

                <td className="p-3">

                  <Link
                    href={`/applications/${app.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {app.company}
                  </Link>

                </td>

                <td className="p-3">
                  {app.role}
                </td>

                <td className="p-3">
                  <StatusBadge status={app.status} />
                </td>

                <td className="p-3">
                  {app.location || "-"}
                </td>

                <td className="p-3">
                  {app.salary || "-"}
                </td>

                <td className="p-3">
                  {app.recruiterName || "-"}
                </td>

                <td className="p-3">
                  {new Date(
                    app.appliedDate
                  ).toLocaleDateString()}
                </td>

              </tr>

            ))}

            {applications.length === 0 && (

              <tr>

                <td
                  colSpan={7}
                  className="text-center p-6 text-gray-500"
                >
                  No applications found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

      <Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  search={search}
  sort={sort}
/>

    </main>
  );
}