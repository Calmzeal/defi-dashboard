"use client";

import { useProtocolData } from "@/hooks/useProtocolData";
import { useChainStore } from "@/hooks/useChainStore";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ErrorMessage } from "@/components/ui/ErrorMessage";

function formatTVL(value: number) {
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`;
  return `$${value.toFixed(2)}`;
}

export function TVLChart() {
  const selectedChain = useChainStore((state) => state.selectedChain);
  const { data, isLoading, isError, error } = useProtocolData(selectedChain);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage message={error?.message || "Failed to load TVL data"} />;

  const chartData = data?.map(protocol => ({
    name: protocol.name,
    tvl: protocol.tvl
  })).sort((a, b) => b.tvl - a.tvl);

  return (
    <div className="h-[450px] w-full bg-white rounded-lg shadow p-8">
      <h3 className="text-lg font-semibold mb-8">TVL by Protocol</h3>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart 
          data={chartData}
          margin={{ top: 20, right: 40, left: 70, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#eaeaea" />
          <XAxis 
            dataKey="name" 
            height={60}
            tick={{ fontSize: 12, fill: "#666" }}
            interval={0}
            angle={-35}
            textAnchor="end"
            padding={{ left: 30, right: 30 }}
          />
          <YAxis 
            tickFormatter={formatTVL}
            width={90}
            tick={{ fontSize: 12, fill: "#666" }}
            tickCount={6}
            domain={[0, "auto"]}
          />
          <Tooltip 
            formatter={(value: number) => formatTVL(value)}
            labelStyle={{ fontSize: 12 }}
            contentStyle={{ 
              fontSize: 12,
              backgroundColor: "white",
              border: "1px solid #ccc",
              padding: "8px"
            }}
          />
          <Area 
            type="monotone" 
            dataKey="tvl" 
            stroke="#8884d8" 
            fill="#8884d8" 
            fillOpacity={0.2}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
