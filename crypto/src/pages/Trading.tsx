import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import useSWR from 'swr';
import { Chart } from '../components/Chart';
import { TechnicalAnalysis } from '../components/TechnicalAnalysis';
import { getMarketData, getTopCoins, searchCoins, calculateRSI } from '../lib/api';
import { cn } from '../lib/utils';
import { Search } from 'lucide-react';

export function Trading() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCoin = searchParams.get('coin') || 'bitcoin';
  const [searchQuery, setSearchQuery] = useState('');
  const [timeframe, setTimeframe] = useState('1');
  const [enabledIndicators, setEnabledIndicators] = useState<Set<string>>(new Set());
  
  const { data: topCoins } = useSWR('topCoins', () => getTopCoins(100));
  const { data: marketData } = useSWR(
    ['marketData', selectedCoin, timeframe],
    () => getMarketData(selectedCoin, parseInt(timeframe)),
    { refreshInterval: 30000 }
  );

  const { data: searchResults } = useSWR(
    searchQuery ? ['search', searchQuery] : null,
    () => searchCoins(searchQuery)
  );

  const displayedCoins = searchQuery ? searchResults : topCoins;

  const timeframes = [
    { label: '1D', value: '1' },
    { label: '7D', value: '7' },
    { label: '30D', value: '30' },
    { label: '90D', value: '90' },
    { label: '1Y', value: '365' },
  ];

  // Calculate indicators
  const indicators = React.useMemo(() => {
    if (!marketData) return [];

    const result = [];
    const times = marketData.map(d => d.time);
    const closes = marketData.map(d => d.close);

    if (enabledIndicators.has('RSI')) {
      const rsiValues = calculateRSI(closes);
      result.push({
        name: 'RSI',
        data: times.map((time, i) => ({
          time,
          value: rsiValues[i] || 0
        })),
        color: '#2962FF'
      });
    }

    return result;
  }, [marketData, enabledIndicators]);

  const handleIndicatorToggle = (indicator: string) => {
    setEnabledIndicators(prev => {
      const next = new Set(prev);
      if (next.has(indicator)) {
        next.delete(indicator);
      } else {
        next.add(indicator);
      }
      return next;
    });
  };

  return (
    <div className="h-full flex">
      {/* Coin List Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search coins..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {displayedCoins?.map((coin: any) => (
            <a
              key={coin.id}
              href={`/trading?coin=${coin.id}`}
              className={cn(
                "flex items-center p-4 hover:bg-gray-50",
                selectedCoin === coin.id && "bg-blue-50"
              )}
            >
              <img
                src={coin.image || coin.large}
                alt={coin.name}
                className="w-6 h-6 mr-3"
              />
              <div className="flex-1">
                <div className="font-medium">{coin.symbol?.toUpperCase()}</div>
                <div className="text-sm text-gray-500">{coin.name}</div>
              </div>
              {coin.price_change_percentage_24h && (
                <div
                  className={cn(
                    "text-sm font-medium",
                    coin.price_change_percentage_24h >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  )}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </div>
              )}
            </a>
          ))}
        </div>
      </div>

      {/* Chart Area */}
      <div className="flex-1">
        <PanelGroup direction="vertical">
          <Panel defaultSize={60}>
            <div className="h-full p-4">
              <div className="bg-white rounded-lg shadow-lg p-4 h-full">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">{selectedCoin.toUpperCase()}/USD</h2>
                  <div className="flex space-x-2">
                    {timeframes.map(({ label, value }) => (
                      <button
                        key={value}
                        onClick={() => setTimeframe(value)}
                        className={cn(
                          "px-3 py-1 rounded",
                          timeframe === value
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 hover:bg-gray-200"
                        )}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                {marketData && <Chart data={marketData} indicators={indicators} />}
              </div>
            </div>
          </Panel>
          <PanelResizeHandle className="h-2 bg-gray-200 hover:bg-gray-300 transition-colors" />
          <Panel defaultSize={40}>
            <div className="h-full p-4">
              <div className="bg-white rounded-lg shadow-lg p-4 h-full">
                <h3 className="text-lg font-semibold mb-4">Technical Analysis</h3>
                <TechnicalAnalysis
                  onIndicatorToggle={handleIndicatorToggle}
                  enabledIndicators={enabledIndicators}
                />
              </div>
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}