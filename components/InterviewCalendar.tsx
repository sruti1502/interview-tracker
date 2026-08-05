"use client";

import {
  Calendar,
  dateFnsLocalizer,
  Views,
} from "react-big-calendar";

import "react-big-calendar/lib/css/react-big-calendar.css";

import {
  format,
  parse,
  startOfWeek,
  getDay,
} from "date-fns";

import { enUS } from "date-fns/locale";

import { useRouter } from "next/navigation";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

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

export default function InterviewCalendar({
  events,
}: Props) {
  const router = useRouter();

  function getColor(status: string) {
    switch (status) {
      case "Applied":
        return "#3B82F6";

      case "Interview":
        return "#F59E0B";

      case "Offer":
        return "#22C55E";

      case "Rejected":
        return "#EF4444";

      default:
        return "#6B7280";
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      <Calendar
        localizer={localizer}
        events={events}
        defaultView={Views.MONTH}
        views={[
          Views.MONTH,
          Views.WEEK,
          Views.DAY,
          Views.AGENDA,
        ]}
        startAccessor="start"
        endAccessor="end"
        popup
        selectable
        showMultiDayTimes
        style={{
          height: 750,
        }}

        onSelectEvent={(event) =>
          router.push(
            `/applications/${event.id}`
          )
        }

        eventPropGetter={(event) => ({
          style: {
            backgroundColor:
              getColor(event.status),

            color: "white",

            borderRadius: "8px",

            border: "none",

            padding: "4px",

            fontWeight: 600,

            cursor: "pointer",
          },
        })}

        dayPropGetter={(date) => ({
          style: {
            backgroundColor: "white",
          },
        })}

        formats={{
          weekdayFormat: (
            date,
            culture,
            localizer
          ) =>
            localizer?.format(
              date,
              "EEE",
              culture
            ) || "",

          dayHeaderFormat: (
            date,
            culture,
            localizer
          ) =>
            localizer?.format(
              date,
              "dd MMM yyyy",
              culture
            ) || "",
        }}

        messages={{
          today: "Today",
          previous: "←",
          next: "→",
          month: "Month",
          week: "Week",
          day: "Day",
          agenda: "Agenda",
          noEventsInRange:
            "No interviews scheduled.",
        }}

        tooltipAccessor={(event) =>
          `${event.title}
Status: ${event.status}`
        }
      />

      <div className="mt-6 flex flex-wrap gap-6 text-sm">

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-blue-500"></div>
          Applied
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-amber-500"></div>
          Interview
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-500"></div>
          Offer
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-500"></div>
          Rejected
        </div>

      </div>

    </div>
  );
}