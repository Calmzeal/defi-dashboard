"use client";

import { useQuery } from "@tanstack/react-query";
import { Protocol } from "@/types";

export type SortField = "tvl" | "apy" | "volume24h";
export type SortOrder = "asc" | "desc";

const MOCK_API_DELAY = 1000;

const mockDataByChain: Record<string, Protocol[]> = {
  ethereum: [
    { id: "1", name: "Ethereum Protocol 1", tvl: 1234567, apy: 5.67, volume24h: 234567, chain: "ethereum" },
    { id: "2", name: "Ethereum Protocol 2", tvl: 891234, apy: 4.89, volume24h: 123456, chain: "ethereum" },
  ],
  polygon: [
    { id: "3", name: "Polygon Protocol 1", tvl: 987654, apy: 12.34, volume24h: 345678, chain: "polygon" },
    { id: "4", name: "Polygon Protocol 2", tvl: 456789, apy: 8.90, volume24h: 234567, chain: "polygon" },
  ],
  arbitrum: [
    { id: "5", name: "Arbitrum Protocol 1", tvl: 456789, apy: 8.90, volume24h: 123456, chain: "arbitrum" },
    { id: "6", name: "Arbitrum Protocol 2", tvl: 345678, apy: 7.65, volume24h: 234567, chain: "arbitrum" },
  ],
};

const fetchProtocolData = async (
  chain: string,
  sortBy: SortField = "tvl",
  order: SortOrder = "desc"
): Promise<Protocol[]> => {
  await new Promise(resolve => setTimeout(resolve, MOCK_API_DELAY));
  const data = [...(mockDataByChain[chain] || [])];
  return data.sort((a, b) => {
    const modifier = order === "desc" ? -1 : 1;
    return (a[sortBy] - b[sortBy]) * modifier;
  });
};

export function useProtocolData(
  chain: string,
  sortBy: SortField = "tvl",
  order: SortOrder = "desc"
) {
  return useQuery({
    queryKey: ["protocols", chain, sortBy, order],
    queryFn: () => fetchProtocolData(chain, sortBy, order),
    staleTime: 30000,
  });
}
