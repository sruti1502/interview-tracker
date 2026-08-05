"use client";

interface Props {
  company: string;
  setCompany: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;

  location: string;
  setLocation: (value: string) => void;
}

export default function SearchFilters({
  company,
  setCompany,
  status,
  setStatus,
  location,
  setLocation,
}: Props) {
  return (
    <div className="grid md:grid-cols-3 gap-4 mb-6">

      <input
        placeholder="Search Company"
        value={company}
        onChange={(e) =>
          setCompany(e.target.value)
        }
        className="border rounded-lg p-3"
      />

      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
        className="border rounded-lg p-3"
      >
        <option value="">All Status</option>
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>

      <input
        placeholder="Location"
        value={location}
        onChange={(e) =>
          setLocation(e.target.value)
        }
        className="border rounded-lg p-3"
      />

    </div>
  );
}