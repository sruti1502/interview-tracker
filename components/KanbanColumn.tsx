import StatusBadge from "./StatusBadge";
import MoveButton from "./MoveButton";

type Application = {
  id: string;
  company: string;
  role: string;
  status: string;
  location?: string | null;
};

export default function KanbanColumn({
  title,
  applications,
}: {
  title: string;
  applications: Application[];
}) {
  return (
    <div className="bg-gray-100 rounded-lg p-4 min-h-[500px]">
      <h2 className="text-xl font-bold mb-4">
        {title}
      </h2>

      <div className="space-y-4">
        {applications.length === 0 && (
          <div className="bg-white p-4 rounded shadow">
            No applications
          </div>
        )}

        {applications.map((app : any) => (
          <div
            key={app.id}
            className="bg-white p-4 rounded-lg shadow border"
          >
            <h3 className="font-bold text-lg">
              {app.company}
            </h3>

            <p className="text-gray-700">
              {app.role}
            </p>

            {app.location && (
              <p className="text-sm text-gray-500 mt-1">
                📍 {app.location}
              </p>
            )}

            <div className="mt-3">
              <StatusBadge
                status={app.status}
              />
            </div>

            <div className="mt-4">
              <MoveButton
                id={app.id}
                currentStatus={app.status}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}