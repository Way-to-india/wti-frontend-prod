interface ProfileStatsProps {
  stats: {
    tourQueries: number;
    hotelQueries: number;
    transportQueries: number;
    contactQueries: number;
  };
}

export default function ProfileStats({ stats }: ProfileStatsProps) {
  const totalQueries = stats.tourQueries + stats.hotelQueries + stats.transportQueries + stats.contactQueries;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      {/* Total */}
      <StatCard
        icon="📊"
        label="Total Queries"
        value={totalQueries}
        color="from-purple-500 to-purple-600"
      />

      {/* Tour Queries */}
      <StatCard
        icon="🎯"
        label="Tour Queries"
        value={stats.tourQueries}
        color="from-blue-500 to-blue-600"
      />

      {/* Hotel Queries */}
      <StatCard
        icon="🏨"
        label="Hotel Queries"
        value={stats.hotelQueries}
        color="from-green-500 to-green-600"
      />

      {/* Transport Queries */}
      <StatCard
        icon="🚗"
        label="Transport"
        value={stats.transportQueries}
        color="from-orange-500 to-orange-600"
      />

      {/* Contact Queries */}
      <StatCard
        icon="📞"
        label="Contact"
        value={stats.contactQueries}
        color="from-pink-500 to-pink-600"
      />
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color
}: {
  icon: string;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className={`bg-gradient-to-br ${color} rounded-2xl p-6 shadow-lg text-white`}>
      <div className="text-4xl mb-3">{icon}</div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-sm text-white/90">{label}</div>
    </div>
  );
}