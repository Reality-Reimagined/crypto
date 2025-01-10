import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import useSWR from 'swr';
import { Chart } from '../components/Chart';
import { TechnicalAnalysis } from '../components/TechnicalAnalysis';
import { getMarketData, getTopCoins, searchCoins, calculateRSI, calculateEMA, calculateMACD, calculateBollingerBands } from '../lib/api';
import { cn } from '../lib/utils';
import { Search, ChevronDown, Star, Clock, TrendingUp, ChevronUp } from 'lucide-react';

export function Trading() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCoin = searchParams.get('coin') || 'bitcoin';
  const [searchQuery, setSearchQuery] = useState('');
  const [timeframe, setTimeframe] = useState('1');
  const [enabledIndicators, setEnabledIndicators] = useState<Set<string>>(new Set());
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'change' | 'marketcap'>('marketcap');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showAnalysis, setShowAnalysis] = useState(true);
  
  const { data: topCoins, mutate: refreshCoins } = useSWR('topCoins', () => getTopCoins(250), {
    refreshInterval: 30000
  });
  
  const { data: marketData } = useSWR(
    ['marketData', selectedCoin, timeframe],
    () => getMarketData(selectedCoin, parseInt(timeframe)),
    { refreshInterval: 30000 }
  );

  const { data: searchResults } = useSWR(
    searchQuery ? ['search', searchQuery] : null,
    () => searchCoins(searchQuery)
  );

  useEffect(() => {
    const savedFavorites = localStorage.getItem('cryptoFavorites');
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)));
    }
  }, []);

  const toggleFavorite = (e: React.MouseEvent, coinId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(coinId)) {
        next.delete(coinId);
      } else {
        next.add(coinId);
      }
      localStorage.setItem('cryptoFavorites', JSON.stringify([...next]));
      return next;
    });
  };

  const displayedCoins = React.useMemo(() => {
    let coins = searchQuery ? searchResults : topCoins;
    if (!coins) return [];

    return [...coins].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return sortOrder === 'asc' 
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        case 'price':
          return sortOrder === 'asc'
            ? a.current_price - b.current_price
            : b.current_price - a.current_price;
        case 'change':
          return sortOrder === 'asc'
            ? (a.price_change_percentage_24h || 0) - (b.price_change_percentage_24h || 0)
            : (b.price_change_percentage_24h || 0) - (a.price_change_percentage_24h || 0);
        case 'marketcap':
          return sortOrder === 'asc'
            ? (a.market_cap || 0) - (b.market_cap || 0)
            : (b.market_cap || 0) - (a.market_cap || 0);
        default:
          return 0;
      }
    });
  }, [searchResults, topCoins, searchQuery, sortBy, sortOrder]);

  const timeframes = [
    { label: '1D', value: '1' },
    { label: '7D', value: '7' },
    { label: '30D', value: '30' },
    { label: '90D', value: '90' },
    { label: '1Y', value: '365' },
  ];

  const indicators = React.useMemo(() => {
    if (!marketData) return [];

    const result = [];
    const times = marketData.map(d => d.time);
    const closes = marketData.map(d => d.close);

    if (enabledIndicators.has('RSI')) {
      const rsiValues = calculateRSI(closes);
      result.push({
        name: 'RSI',
        data: times.slice(14).map((time, i) => ({
          time,
          value: rsiValues[i]
        })),
        color: '#2962FF',
        overlay: false
      });
    }

    if (enabledIndicators.has('EMA')) {
      const ema20 = calculateEMA(closes, 20);
      result.push({
        name: 'EMA 20',
        data: times.map((time, i) => ({
          time,
          value: ema20[i]
        })),
        color: '#FF6B6B',
        overlay: true
      });
    }

    if (enabledIndicators.has('MACD')) {
      const { macdLine, signalLine } = calculateMACD(closes);
      result.push({
        name: 'MACD',
        data: times.slice(26).map((time, i) => ({
          time,
          value: macdLine[i]
        })),
        color: '#2962FF',
        overlay: false
      });
      result.push({
        name: 'Signal',
        data: times.slice(26).map((time, i) => ({
          time,
          value: signalLine[i]
        })),
        color: '#FF6B6B',
        overlay: false
      });
    }

    if (enabledIndicators.has('BB')) {
      const bands = calculateBollingerBands(closes);
      const validBands = bands.filter(band => band.upper !== null);
      const startIndex = times.length - validBands.length;
      
      result.push({
        name: 'BB Upper',
        data: validBands.map((band, i) => ({
          time: times[startIndex + i],
          value: band.upper!
        })),
        color: '#4CAF50',
        overlay: true
      });
      result.push({
        name: 'BB Lower',
        data: validBands.map((band, i) => ({
          time: times[startIndex + i],
          value: band.lower!
        })),
        color: '#4CAF50',
        overlay: true
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

  const handleSort = (type: 'name' | 'price' | 'change' | 'marketcap') => {
    if (sortBy === type) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(type);
      setSortOrder('desc');
    }
  };

  const selectedCoinData = displayedCoins?.find(coin => coin.id === selectedCoin);

  return (
    <div className="h-full flex">
      {/* Coin List Sidebar */}
      <div className="w-72 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search coins..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <div className="flex space-x-2">
            <div
              onClick={() => handleSort('name')}
              className={cn(
                "flex-1 px-2 py-1.5 text-sm rounded-lg cursor-pointer",
                sortBy === 'name' ? "bg-blue-100 text-blue-700" : "bg-gray-100 hover:bg-gray-200"
              )}
            >
              Name
              <ChevronDown className={cn(
                "inline-block ml-1 h-4 w-4 transition-transform",
                sortBy === 'name' && sortOrder === 'desc' && "transform rotate-180"
              )} />
            </div>
            <div
              onClick={() => handleSort('change')}
              className={cn(
                "flex-1 px-2 py-1.5 text-sm rounded-lg cursor-pointer",
                sortBy === 'change' ? "bg-blue-100 text-blue-700" : "bg-gray-100 hover:bg-gray-200"
              )}
            >
              24 Hour Change
              <ChevronDown className={cn(
                "inline-block ml-1 h-4 w-4 transition-transform",
                sortBy === 'change' && sortOrder === 'desc' && "transform rotate-180"
              )} />
            </div>
            <div
              onClick={() => handleSort('marketcap')}
              className={cn(
                "flex-1 px-2 py-1.5 text-sm rounded-lg cursor-pointer",
                sortBy === 'marketcap' ? "bg-blue-100 text-blue-700" : "bg-gray-100 hover:bg-gray-200"
              )}
            >
              MCap
              <ChevronDown className={cn(
                "inline-block ml-1 h-4 w-4 transition-transform",
                sortBy === 'marketcap' && sortOrder === 'desc' && "transform rotate-180"
              )} />
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {displayedCoins?.map((coin: any) => (
            <div
              key={coin.id}
              onClick={() => setSearchParams({ coin: coin.id })}
              className={cn(
                "w-full flex items-center p-4 hover:bg-gray-50 border-b border-gray-100 cursor-pointer",
                selectedCoin === coin.id && "bg-blue-50"
              )}
            >
              <div
                onClick={(e) => toggleFavorite(e, coin.id)}
                className="mr-3 cursor-pointer"
              >
                <Star
                  className={cn(
                    "h-5 w-5",
                    favorites.has(coin.id)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300 hover:text-gray-400"
                  )}
                />
              </div>
              <img
                src={coin.image || coin.large}
                alt={coin.name}
                className="w-6 h-6 mr-3"
              />
              <div className="flex-1">
                <div className="font-medium">{coin.symbol?.toUpperCase()}</div>
                <div className="text-sm text-gray-500">
                  MCap: ${(coin.market_cap / 1e9).toFixed(2)}B
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">
                  ${coin.current_price?.toLocaleString()}
                </div>
                <div
                  className={cn(
                    "text-sm font-medium",
                    coin.price_change_percentage_24h >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  )}
                >
                  {coin.price_change_percentage_24h?.toFixed(2)}%
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          onClick={() => refreshCoins()}
          className="p-4 border-t border-gray-200 text-blue-600 hover:bg-blue-50 flex items-center justify-center cursor-pointer"
        >
          <Clock className="w-4 h-4 mr-2" />
          Refresh Prices
        </div>
      </div>

      {/* Chart Area */}
      <div className="flex-1">
        <div className="h-full flex flex-col">
          <div className="flex-1 p-4">
            <div className="bg-white rounded-lg shadow-lg p-4 h-full">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-2xl font-bold flex items-center">
                    {selectedCoinData?.name}
                    <span className="text-gray-500 ml-2">
                      {selectedCoinData?.symbol?.toUpperCase()}/USD
                    </span>
                  </h2>
                  <div className="flex items-center mt-1">
                    <span className="text-2xl font-bold mr-3">
                      ${selectedCoinData?.current_price?.toLocaleString()}
                    </span>
                    <span
                      className={cn(
                        "flex items-center text-sm font-semibold",
                        selectedCoinData?.price_change_percentage_24h >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      )}
                    >
                      <TrendingUp className="w-4 h-4 mr-1" />
                      {selectedCoinData?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                    <span className="ml-4 text-sm text-gray-500">
                      Market Cap: ${(selectedCoinData?.market_cap / 1e9).toFixed(2)}B
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {timeframes.map(({ label, value }) => (
                    <div
                      key={value}
                      onClick={() => setTimeframe(value)}
                      className={cn(
                        "px-3 py-1 rounded cursor-pointer",
                        timeframe === value
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      )}
                    >
                      {label}
                    </div>
                  ))}
                </div>
              </div>
              {marketData && <Chart data={marketData} indicators={indicators} />}
            </div>
          </div>

          {/* Technical Analysis Panel */}
          <div className="border-t border-gray-200">
            <div
              onClick={() => setShowAnalysis(!showAnalysis)}
              className="p-2 bg-white flex items-center justify-between cursor-pointer hover:bg-gray-50"
            >
              <h3 className="text-lg font-semibold">Technical Analysis</h3>
              {showAnalysis ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
            </div>
            {showAnalysis && (
              <div className="p-4 bg-white">
                <TechnicalAnalysis
                  onIndicatorToggle={handleIndicatorToggle}
                  enabledIndicators={enabledIndicators}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}