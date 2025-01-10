// components/dex/DexInterface.tsx
import { useState } from 'react';
import { TokenSelector } from './TokenSelector';
import { PriceChart } from './PriceChart';
import { OrderBook } from './OrderBook';
import { MarketMetrics } from './MarketMetrics';

export function DexInterface() {
  const [selectedPair, setSelectedPair] = useState(null);
  const [tokenIn, setTokenIn] = useState(null);
  const [tokenOut, setTokenOut] = useState(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <TokenSelector onSelect={setTokenIn} />
          <TokenSelector onSelect={setTokenOut} />
          <MarketMetrics pair={selectedPair} />
        </div>
      </div>
      <div className="space-y-6">
        <PriceChart pair={selectedPair} />
        <OrderBook pair={selectedPair} />
      </div>
    </div>
  );
}
