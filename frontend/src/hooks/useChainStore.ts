import { create } from 'zustand';

interface ChainStore {
  selectedChain: string;
  setSelectedChain: (chain: string) => void;
}

export const useChainStore = create<ChainStore>((set) => ({
  selectedChain: 'ethereum',
  setSelectedChain: (chain) => set({ selectedChain: chain }),
}));
