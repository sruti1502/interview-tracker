"use client";

import { useState } from "react";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import StatusBadge from "./StatusBadge";

type Application = {
  id: string;
  company: string;
  role: string;
  status: string;
};

export default function ApplicationTable({
  applications,
}: {
  applications: Application[];
}) {
  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const filtered =
    applications.filter((app) => {
      const matchesSearch =
        app.company
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =
        statusFilter === "ALL" ||
        app.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });

  return (
    <div>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search company..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border p-2 rounded"
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
          className="border p-2 rounded"
        >
          <option value="ALL">
            All
          </option>

          <option value="APPLIED">
            Applied
          </option>

          <option value="SCREEN">
            Screen
          </option>

          <option value="OA">
            OA
          </option>

          <option value="INTERVIEW">
            Interview
          </option>

          <option value="FINAL">
            Final
          </option>

          <option value="OFFER">
            Offer
          </option>

          <option value="REJECTED">
            Rejected
          </option>
        </select>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">
              Company
            </th>

            <th className="border p-2">
              Role
            </th>

            <th className="border p-2">
              Status
            </th>

            <th className="border p-2">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((app) => (
            <tr key={app.id}>
              <td className="border p-2">
  <Link
    href={`/applications/${app.id}`}
    className="text-blue-600 font-medium"
  >
    {app.company}
  </Link>
</td>

              <td className="border p-2">
                {app.role}
              </td>

              <td className="border p-2">
  <StatusBadge
    status={app.status}
  />
</td>

              <td className="border p-2">
                <Link
                  href={`/applications/${app.id}/edit`}
                  className="text-blue-500 mr-4"
                >
                  Edit
                </Link>

                <DeleteButton
                  id={app.id}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}