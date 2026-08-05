import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";
import ApplicationChart from "@/components/ApplicationChart";



export default async function AnalyticsPage() {
  const currentUser =
    await getCurrentUser();

  if (!currentUser) {
    return (
      <div className="p-8">
        No user found
      </div>
    );
  }

  const applications =
    await prisma.application.findMany({
      where: {
        userId: currentUser.id,
      },
    });

  const applied =
    applications.filter(
      (a : any) =>
        a.status === "Applied"
    ).length;

  const interview =
    applications.filter(
      (a : any) =>
        a.status === "Interview"
    ).length;

  const offer =
    applications.filter(
      (a : any) =>
        a.status === "Offer"
    ).length;

  const rejected =
    applications.filter(
      (a : any) =>
        a.status === "Rejected"
    ).length;

  const chartData = [
    {
      name: "Applied",
      value: applied,
    },
    {
      name: "Interview",
      value: interview,
    },
    {
      name: "Offer",
      value: offer,
    },
    {
      name: "Rejected",
      value: rejected,
    },
  ];

  const total =
    applications.length;

  const interviewRate =
    total > 0
      ? (
          (interview /
            total) *
          100
        ).toFixed(1)
      : 0;

  const offerRate =
    total > 0
      ? (
          (offer / total) *
          100
        ).toFixed(1)
      : 0;

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Analytics
      </h1>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="border p-4 rounded">
          <h2>
            Total Applications
          </h2>
          <p className="text-3xl">
            {total}
          </p>
        </div>

        <div className="border p-4 rounded">
          <h2>
            Interview Rate
          </h2>
          <p className="text-3xl">
            {interviewRate}%
          </p>
        </div>

        <div className="border p-4 rounded">
          <h2>Offer Rate</h2>
          <p className="text-3xl">
            {offerRate}%
          </p>
        </div>
      </div>

      <div className="border rounded p-6 bg-white">
  <h2 className="text-xl font-semibold mb-4">
    Applications by Status
  </h2>

  {chartData.some(
    (item) => item.value > 0
  ) ? (
    <ApplicationChart
      data={chartData}
    />
  ) : (
    <p>
      No application data available
    </p>
  )}
</div>
    </main>
  );
}