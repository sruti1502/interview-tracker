import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";
import CalendarFilter from "@/components/CalendarFilter";
import UpcomingInterviews from "@/components/UpcomingInterviews";
import { convertApplicationsToEvents } from "@/lib/calendar";
import { format } from "date-fns";

export default async function CalendarPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <main className="p-8">
        <h1 className="text-3xl font-bold">
          Please sign in
        </h1>
      </main>
    );
  }

  const applications = await prisma.application.findMany({
    where: {
      userId: currentUser.id,
    },
    orderBy: {
      appliedDate: "desc",
    },
  });

  const events =
    convertApplicationsToEvents(applications);

  const totalApplications =
    applications.length;

  const interviews = applications.filter(
    (app : any) => app.interviewDate
  );

  const offers = applications.filter(
    (app : any) => app.status === "Offer"
  );

  const rejected = applications.filter(
    (app : any) => app.status === "Rejected"
  );

  const applied = applications.filter(
    (app : any) => app.status === "Applied"
  );

  const today = new Date();

  const todayInterviews = interviews.filter(
    (app :any) => {
      if (!app.interviewDate) return false;

      const interview = new Date(
        app.interviewDate
      );

      return (
        interview.toDateString() ===
        today.toDateString()
      );
    }
  );

  const upcomingInterviews =
    interviews
      .filter(
        (app : any) =>
          app.interviewDate &&
          new Date(app.interviewDate) >=
            new Date()
      )
      .sort(
        (a : any, b : any) =>
          new Date(
            a.interviewDate!
          ).getTime() -
          new Date(
            b.interviewDate!
          ).getTime()
      )
      .slice(0, 5);

  return (
    <main className="p-8 space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          Interview Calendar
        </h1>

        <p className="text-gray-500 mt-2">
          Track interviews and
          upcoming schedules.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-blue-500 text-white rounded-xl p-6 shadow">

          <p>Total Applications</p>

          <h2 className="text-4xl font-bold mt-2">
            {totalApplications}
          </h2>

        </div>

        <div className="bg-orange-500 text-white rounded-xl p-6 shadow">

          <p>Interviews</p>

          <h2 className="text-4xl font-bold mt-2">
            {interviews.length}
          </h2>

        </div>

        <div className="bg-green-500 text-white rounded-xl p-6 shadow">

          <p>Offers</p>

          <h2 className="text-4xl font-bold mt-2">
            {offers.length}
          </h2>

        </div>

        <div className="bg-red-500 text-white rounded-xl p-6 shadow">

          <p>Rejected</p>

          <h2 className="text-4xl font-bold mt-2">
            {rejected.length}
          </h2>

        </div>

      </div>

      <div className="bg-yellow-100 border-l-4 border-yellow-500 rounded p-5">

        <h2 className="text-xl font-bold mb-3">
          Today's Interviews
        </h2>

        {todayInterviews.length === 0 ? (
          <p>No interviews today.</p>
        ) : (
          <div className="space-y-3">

            {todayInterviews.map((app : any) => (

              <div
                key={app.id}
                className="bg-white rounded p-3 shadow"
              >

                <div className="font-semibold">
                  {app.company}
                </div>

                <div>
                  {app.role}
                </div>

              </div>

            ))}

          </div>
        )}

      </div>

      <CalendarFilter
        events={events}
      />

      <div className="grid lg:grid-cols-2 gap-8">

  <UpcomingInterviews
    applications={upcomingInterviews}
  />

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-bold mb-6">
          Recent Applications
        </h2>

        {applications.length === 0 ? (

          <p className="text-gray-500">
            No applications found.
          </p>

        ) : (

          <div className="space-y-4">

            {applications
              .slice(0, 5)
              .map((app : any) => (

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

                      <p className="text-sm text-gray-500 mt-1">
                        Applied on{" "}
                        {format(
                          new Date(
                            app.appliedDate
                          ),
                          "dd MMM yyyy"
                        )}
                      </p>

                      {app.location && (
                        <p className="text-sm text-gray-500 mt-1">
                          📍 {app.location}
                        </p>
                      )}

                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        app.status === "Offer"
                          ? "bg-green-100 text-green-700"
                          : app.status === "Interview"
                          ? "bg-orange-100 text-orange-700"
                          : app.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {app.status}
                    </span>

                  </div>

                  {app.interviewDate && (

                    <div className="mt-3 text-sm text-gray-600">

                      📅 Interview :{" "}
                      {format(
                        new Date(
                          app.interviewDate
                        ),
                        "dd MMM yyyy"
                      )}

                    </div>

                  )}

                </div>

              ))}

          </div>

        )}

      </div>

      </div>

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-bold mb-4">
          Application Summary
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <div className="border rounded-lg p-4">

            <p className="text-gray-500">
              Applied
            </p>

            <h3 className="text-3xl font-bold text-blue-600">
              {applied.length}
            </h3>

          </div>

          <div className="border rounded-lg p-4">

            <p className="text-gray-500">
              Interview
            </p>

            <h3 className="text-3xl font-bold text-orange-600">
              {interviews.length}
            </h3>

          </div>

          <div className="border rounded-lg p-4">

            <p className="text-gray-500">
              Offer
            </p>

            <h3 className="text-3xl font-bold text-green-600">
              {offers.length}
            </h3>

          </div>

          <div className="border rounded-lg p-4">

            <p className="text-gray-500">
              Rejected
            </p>

            <h3 className="text-3xl font-bold text-red-600">
              {rejected.length}
            </h3>

          </div>

        </div>

      </div>

    </main>
  );
}