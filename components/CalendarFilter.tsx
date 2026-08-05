"use client";

import { useMemo, useState } from "react";
import InterviewCalendar from "./InterviewCalendar";

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  status: string;
}

interface Props {
  events: CalendarEvent[];
}

const statuses = [
  "All",
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
];

export default function CalendarFilter({
  events,
}: Props) {
  const [selectedStatus, setSelectedStatus] =
    useState("All");

  const filteredEvents = useMemo(() => {
    if (selectedStatus === "All") {
      return events;
    }

    return events.filter(
      (event) =>
        event.status === selectedStatus
    );
  }, [events, selectedStatus]);

  return (
    <div className="space-y-6">

      <div className="bg-white rounded-xl shadow p-5">

        <div className="flex flex-wrap gap-3 items-center">

          <h2 className="font-semibold text-lg">
            Filter Status
          </h2>

          {statuses.map((status) => (
            <button
              key={status}
              onClick={() =>
                setSelectedStatus(status)
              }
              className={`px-4 py-2 rounded-lg transition font-medium ${
                selectedStatus === status
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {status}
            </button>
          ))}

        </div>

      </div>

      <InterviewCalendar
        events={filteredEvents}
      />

    </div>
  );
}