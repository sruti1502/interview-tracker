import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";
import KanbanBoard from "@/components/KanbanBoard";

export default async function KanbanPage() {
  const currentUser =
    await getCurrentUser();

  if (!currentUser) {
    return (
      <div className="p-8">
        Not logged in
      </div>
    );
  }

  const applications =
    await prisma.application.findMany({
      where: {
        userId: currentUser.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Kanban Board
      </h1>

      <KanbanBoard
        applications={applications}
      />
    </main>
  );
}