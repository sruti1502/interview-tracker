type Props = {
  total: number;
  interviews: number;
  offers: number;
  rejected: number;
};

export default function AnalyticsCards({
  total,
  interviews,
  offers,
  rejected,
}: Props) {
  const offerRate =
    total === 0
      ? 0
      : ((offers / total) * 100).toFixed(1);

  const interviewRate =
    total === 0
      ? 0
      : (
          (interviews / total) *
          100
        ).toFixed(1);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-blue-100 p-6 rounded">
        <h2>Total Applications</h2>

        <p className="text-3xl font-bold">
          {total}
        </p>
      </div>

      <div className="bg-yellow-100 p-6 rounded">
        <h2>Interviews</h2>

        <p className="text-3xl font-bold">
          {interviews}
        </p>
      </div>

      <div className="bg-green-100 p-6 rounded">
        <h2>Offers</h2>

        <p className="text-3xl font-bold">
          {offers}
        </p>
      </div>

      <div className="bg-red-100 p-6 rounded">
        <h2>Rejected</h2>

        <p className="text-3xl font-bold">
          {rejected}
        </p>
      </div>

      <div className="bg-purple-100 p-6 rounded">
        <h2>Offer Rate</h2>

        <p className="text-3xl font-bold">
          {offerRate}%
        </p>
      </div>

      <div className="bg-orange-100 p-6 rounded">
        <h2>Interview Rate</h2>

        <p className="text-3xl font-bold">
          {interviewRate}%
        </p>
      </div>
    </div>
  );
}