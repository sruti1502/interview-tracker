type Props = {
  stats: {
    totalApplications: number;
    interviews: number;
    offers: number;
    rejected: number;
  };
};

export default function DashboardCards({
  stats,
}: Props) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="border p-4 rounded">
        <h3>Total Applications</h3>
        <p className="text-3xl font-bold">
          {stats.totalApplications}
        </p>
      </div>

      <div className="border p-4 rounded">
        <h3>Interviews</h3>
        <p className="text-3xl font-bold">
          {stats.interviews}
        </p>
      </div>

      <div className="border p-4 rounded">
        <h3>Offers</h3>
        <p className="text-3xl font-bold">
          {stats.offers}
        </p>
      </div>

      <div className="border p-4 rounded">
        <h3>Rejected</h3>
        <p className="text-3xl font-bold">
          {stats.rejected}
        </p>
      </div>
    </div>
  );
}