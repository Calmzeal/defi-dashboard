"use client";

import Link from 'next/link';
import { useChainStore } from '@/hooks/useChainStore';

export function Header() {
  const { selectedChain, setSelectedChain } = useChainStore();
  
  return (
    <header className='bg-white shadow'>
      <div className='container mx-auto px-4 py-4'>
        <nav className='flex items-center justify-between'>
          <Link href='/' className='text-xl font-bold'>
            DeFi Dashboard
          </Link>
          <div className='flex items-center space-x-4'>
            <select 
              className='px-3 py-2 border rounded-lg'
              value={selectedChain}
              onChange={(e) => setSelectedChain(e.target.value)}
            >
              <option value='ethereum'>Ethereum</option>
              <option value='polygon'>Polygon</option>
              <option value='arbitrum'>Arbitrum</option>
            </select>
          </div>
        </nav>
      </div>
    </header>
  );
}
