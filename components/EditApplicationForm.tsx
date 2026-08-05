"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import UploadDocument from "./UploadDocument";

export default function EditApplicationForm({
  application,
}: {
  application: any;
}) {
  const router = useRouter();

  const [company, setCompany] =
    useState(application.company);

  const [role, setRole] =
    useState(application.role);

  const [status, setStatus] =
    useState(application.status);

  const [location, setLocation] =
    useState(application.location || "");

  const [salary, setSalary] =
    useState(application.salary || "");

  const [jobUrl, setJobUrl] =
    useState(application.jobUrl || "");

  const [recruiterName,
    setRecruiterName] = useState(
      application.recruiterName || ""
    );

  const [recruiterEmail,
    setRecruiterEmail] = useState(
      application.recruiterEmail || ""
    );

  const [interviewDate, setInterviewDate] =
  useState(
    application.interviewDate
      ? new Date(application.interviewDate)
          .toISOString()
          .split("T")[0]
      : ""
  );

const [notes, setNotes] =
  useState(application.notes || "");

  async function handleUpdate(
    e: React.FormEvent
  ) {
    e.preventDefault();

    await fetch(
      `/api/applications/${application.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
  company,
  role,
  status,
  location,
  salary,
  jobUrl,
  recruiterName,
  recruiterEmail,
  interviewDate,
  notes,
}),
      }
    );

    router.push("/applications");
    router.refresh();
  }

  async function handleDelete() {
    await fetch(
      `/api/applications/${application.id}`,
      {
        method: "DELETE",
      }
    );

    router.push("/applications");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleUpdate}
      className="space-y-4"
    >
      <input
        value={company}
        onChange={(e) =>
          setCompany(e.target.value)
        }
        className="border p-2 w-full"
      />

      <input
        value={role}
        onChange={(e) =>
          setRole(e.target.value)
        }
        className="border p-2 w-full"
      />

      <input
        value={location}
        onChange={(e) =>
          setLocation(e.target.value)
        }
        placeholder="Location"
        className="border p-2 w-full"
      />

      <input
        value={salary}
        onChange={(e) =>
          setSalary(e.target.value)
        }
        placeholder="Salary"
        className="border p-2 w-full"
      />

      <input
        value={jobUrl}
        onChange={(e) =>
          setJobUrl(e.target.value)
        }
        placeholder="Job URL"
        className="border p-2 w-full"
      />

      <input
        value={recruiterName}
        onChange={(e) =>
          setRecruiterName(
            e.target.value
          )
        }
        placeholder="Recruiter Name"
        className="border p-2 w-full"
      />

      <input
        value={recruiterEmail}
        onChange={(e) =>
          setRecruiterEmail(
            e.target.value
          )
        }
        placeholder="Recruiter Email"
        className="border p-2 w-full"
      />

      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
        className="border p-2 w-full"
      >
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>
<div>
  <label className="block mb-1 font-medium">
    Interview Date
  </label>

  <input
    type="date"
    value={interviewDate}
    onChange={(e) =>
      setInterviewDate(e.target.value)
    }
    className="border p-2 w-full"
  />
</div>
      <textarea
        value={notes}
        onChange={(e) =>
          setNotes(e.target.value)
        }
        className="border p-2 w-full"
      />
<UploadDocument
  applicationId={application.id}
/>

      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update
        </button>

        <button
          type="button"
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </form>
  );
}