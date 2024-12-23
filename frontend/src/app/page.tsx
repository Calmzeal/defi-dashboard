"use client";

import { Header } from "@/components/common/Header";
import { ProtocolCard } from "@/components/dashboard/ProtocolCard";
import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { TVLChart } from "@/components/charts/TVLChart";
import { useChainStore } from "@/hooks/useChainStore";
import { useProtocolData, SortField, SortOrder } from "@/hooks/useProtocolData";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { useState } from "react";

export default function Home() {
  const selectedChain = useChainStore((state) => state.selectedChain);
  const [sortBy, setSortBy] = useState<SortField>("tvl");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  
  const { data: protocols, isLoading, isError, error } = useProtocolData(
    selectedChain,
    sortBy,
    sortOrder
  );

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">DeFi Analytics Dashboard</h1>
        
        <StatsOverview />
        <div className="mb-8">
          <TVLChart />
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Top Protocols</h2>
          <div className="flex gap-4">
            <select
              className="px-3 py-2 border rounded-lg"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortField)}
            >
              <option value="tvl">Sort by TVL</option>
              <option value="apy">Sort by APY</option>
              <option value="volume24h">Sort by Volume</option>
            </select>
            <button
              className="px-3 py-2 border rounded-lg"
              onClick={() => setSortOrder(prev => prev === "desc" ? "asc" : "desc")}
            >
              {sortOrder === "desc" ? "↓ Desc" : "↑ Asc"}
            </button>
          </div>
        </div>

        {isError ? (
          <ErrorMessage message={error?.message || "Failed to load protocols"} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <div className="col-span-3">
                <LoadingSpinner />
              </div>
            ) : (
              protocols?.map((protocol) => (
                <ProtocolCard
                  key={protocol.id}
                  name={protocol.name}
                  tvl={protocol.tvl}
                  apy={protocol.apy}
                  chain={protocol.chain}
                />
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}
