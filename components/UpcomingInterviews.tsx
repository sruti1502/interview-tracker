"use client";

import Link from "next/link";
import { format, isToday, isTomorrow } from "date-fns";

interface Application {
  id: string;
  company: string;
  role: string;
  interviewDate: Date | null;
  location?: string | null;
  status: string;
}

export default function UpcomingInterviews({
  applications,
}: {
  applications: Application[];
}) {
  if (applications.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-4">
          Upcoming Interviews
        </h2>

        <p className="text-gray-500">
          No upcoming interviews.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        Upcoming Interviews
      </h2>

      <div className="space-y-4">

        {applications.map((app : any) => {

          let interviewText = "";

          if (app.interviewDate) {

            const date = new Date(
              app.interviewDate
            );

            if (isToday(date)) {
              interviewText = "Today";
            } else if (isTomorrow(date)) {
              interviewText = "Tomorrow";
            } else {
              interviewText = format(
                date,
                "dd MMM yyyy"
              );
            }
          }

          return (

            <div
              key={app.id}
              className="border rounded-lg p-4 hover:shadow transition"
            >

              <div className="flex justify-between items-start">

                <div>

                  <h3 className="font-semibold text-lg">
                    {app.company}
                  </h3>

                  <p className="text-gray-600">
                    {app.role}
                  </p>

                  {app.location && (
                    <p className="text-sm text-gray-500 mt-1">
                      📍 {app.location}
                    </p>
                  )}

                  <p className="text-sm mt-2">
                    📅 {interviewText}
                  </p>

                </div>

                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
                  {app.status}
                </span>

              </div>

              <Link
                href={`/applications/${app.id}`}
                className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                View Application
              </Link>

            </div>

          );

        })}

      </div>

    </div>
  );
}