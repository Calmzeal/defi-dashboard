"use client";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
}

function StatCard({ title, value, change }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-gray-500 text-sm mb-1">{title}</h3>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-semibold">{value}</span>
        {change !== undefined && (
          <span className={`text-sm ${change >= 0 ? "text-green-500" : "text-red-500"}`}>
            {change >= 0 ? "+" : ""}{change}%
          </span>
        )}
      </div>
    </div>
  );
}

export function StatsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard 
        title="Total Value Locked" 
        value="$1.23B"
        change={5.2}
      />
      <StatCard 
        title="24h Volume" 
        value="$231.5M"
        change={-2.3}
      />
      <StatCard 
        title="Active Protocols" 
        value="12"
      />
    </div>
  );
}
