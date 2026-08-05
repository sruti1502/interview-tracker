"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ApplicationForm() {
  const router = useRouter();

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");

  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [recruiterName, setRecruiterName] =
    useState("");
  const [recruiterEmail, setRecruiterEmail] =
    useState("");
const [notes, setNotes] = useState("");
  const [interviewDate, setInterviewDate] =
  useState("");

  async function handleSubmit(
  e: React.FormEvent
) {
  e.preventDefault();

  const response = await fetch("/api/applications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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

      appliedDate: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    const error = await response.json();

    alert(error.error || "Failed to save");

    return;
  }

  router.push("/applications");

  router.refresh();
}

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-xl"
    >
      <input
        placeholder="Company"
        value={company}
        onChange={(e) =>
          setCompany(e.target.value)
        }
        className="border p-2 w-full"
        required
      />

      <input
        placeholder="Role"
        value={role}
        onChange={(e) =>
          setRole(e.target.value)
        }
        className="border p-2 w-full"
        required
      />

      <input
        placeholder="Location"
        value={location}
        onChange={(e) =>
          setLocation(e.target.value)
        }
        className="border p-2 w-full"
      />

      <input
        placeholder="Salary"
        value={salary}
        onChange={(e) =>
          setSalary(e.target.value)
        }
        className="border p-2 w-full"
      />

      <input
        placeholder="Job URL"
        value={jobUrl}
        onChange={(e) =>
          setJobUrl(e.target.value)
        }
        className="border p-2 w-full"
      />

      <input
        placeholder="Recruiter Name"
        value={recruiterName}
        onChange={(e) =>
          setRecruiterName(
            e.target.value
          )
        }
        className="border p-2 w-full"
      />

      <input
        placeholder="Recruiter Email"
        value={recruiterEmail}
        onChange={(e) =>
          setRecruiterEmail(
            e.target.value
          )
        }
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
        placeholder="Notes"
        value={notes}
        onChange={(e) =>
          setNotes(e.target.value)
        }
        className="border p-2 w-full"
      />

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Save Application
      </button>
    </form>
  );
}