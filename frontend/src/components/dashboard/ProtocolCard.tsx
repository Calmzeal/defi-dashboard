"use client";

interface ProtocolCardProps {
  name: string;
  tvl: number;
  apy: number;
  chain: string;
}

export function ProtocolCard({ name, tvl, apy, chain }: ProtocolCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <span className="text-sm text-gray-500">{chain}</span>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">TVL</span>
          <span className="font-medium">${tvl.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">APY</span>
          <span className="font-medium">{apy.toFixed(2)}%</span>
        </div>
      </div>
    </div>
  );
}
