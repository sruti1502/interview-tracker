import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";
import DashboardStats from "@/components/DashboardStats";
import DashboardCharts from "@/components/DashboardCharts";
import Link from "next/link";

export default async function Home() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <div className="p-8">
        No user found
      </div>
    );
  }

  const total = await prisma.application.count({
    where: {
      userId: currentUser.id,
    },
  });

  const applied = await prisma.application.count({
    where: {
      userId: currentUser.id,
      status: "Applied",
    },
  });

  const interview = await prisma.application.count({
    where: {
      userId: currentUser.id,
      status: "Interview",
    },
  });

  const offer = await prisma.application.count({
    where: {
      userId: currentUser.id,
      status: "Offer",
    },
  });

  const rejected = await prisma.application.count({
    where: {
      userId: currentUser.id,
      status: "Rejected",
    },
  });

  const recentApplications =
    await prisma.application.findMany({
      where: {
        userId: currentUser.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

  const statusData = [
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

  const monthlyData = [];

  for (let i = 5; i >= 0; i--) {
    const start = new Date();
    start.setMonth(start.getMonth() - i);
    start.setDate(1);

    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);

    const count =
      await prisma.application.count({
        where: {
          userId: currentUser.id,
          appliedDate: {
            gte: start,
            lt: end,
          },
        },
      });

    monthlyData.push({
      month: start.toLocaleString("default", {
        month: "short",
      }),
      applications: count,
    });
  }

  return (
    <main className="p-8">

      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      <DashboardStats
        total={total}
        applied={applied}
        interview={interview}
        offer={offer}
        rejected={rejected}
      />

      <DashboardCharts
        statusData={statusData}
        monthlyData={monthlyData}
      />

      
      <div className="mt-10">

        <h2 className="text-2xl font-bold mb-5">
          Recent Applications
        </h2>

        <div className="border rounded-xl overflow-hidden">

          {recentApplications.length === 0 ? (
            <p className="p-6 text-gray-500">
              No applications yet.
            </p>
          ) : (
            recentApplications.map((app : any) => (
              <Link
                key={app.id}
                href={`/applications/${app.id}`}
                className="flex justify-between items-center p-4 border-b hover:bg-gray-50"
              >
                <div>
                  <p className="font-semibold">
                    {app.company}
                  </p>

                  <p className="text-gray-500">
                    {app.role}
                  </p>
                </div>

                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded">
                  {app.status}
                </span>
              </Link>
            ))
          )}

        </div>

      </div>

    </main>
  );
}