export interface Protocol {
  id: string;
  name: string;
  tvl: number;
  apy: number;
  volume24h: number;
  chain: string;
}

export interface ChainConfig {
  id: string;
  name: string;
  rpcUrl: string;
}
