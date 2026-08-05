interface Props {
  total: number;
  applied: number;
  interview: number;
  offer: number;
  rejected: number;
}

export default function DashboardStats({
  total,
  applied,
  interview,
  offer,
  rejected,
}: Props) {
  const cards = [
    {
      title: "Total Applications",
      value: total,
      color: "bg-blue-500",
    },
    {
      title: "Applied",
      value: applied,
      color: "bg-yellow-500",
    },
    {
      title: "Interview",
      value: interview,
      color: "bg-purple-500",
    },
    {
      title: "Offer",
      value: offer,
      color: "bg-green-500",
    },
    {
      title: "Rejected",
      value: rejected,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`${card.color} rounded-xl shadow-lg text-white p-6`}
        >
          <h2 className="text-lg font-semibold">
            {card.title}
          </h2>

          <p className="text-4xl font-bold mt-4">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}