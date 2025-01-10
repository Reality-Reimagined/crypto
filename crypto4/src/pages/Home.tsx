import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, LineChart, Code2, Zap } from 'lucide-react';
import useSWR from 'swr';
import { getTopCoins } from '../lib/api';
import { cn } from '../lib/utils';

const fetchCryptoFlows = async () => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/global');
    const json = await response.json();
    if (!json.data) throw new Error('Invalid data structure');
    return {
      totalMarketCap: json.data.total_market_cap.usd,
      marketCapChange: json.data.market_cap_change_percentage_24h,
      totalVolume: json.data.total_volume.usd,
      btcDominance: json.data.market_cap_percentage.btc
    };
  } catch (error) {
    console.error('Error fetching crypto flows:', error);
    return null;
  }
};

export function Home() {
  const { data: topCoins } = useSWR('topCoins', () => getTopCoins(6));
  const { data: cryptoFlows } = useSWR('cryptoFlows', fetchCryptoFlows, {
    refreshInterval: 30000 // Refresh every 30 seconds
  });

  const formatMarketCap = (value) => {
    if (!value) return '$0';
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    return `$${value.toLocaleString()}`;
  };

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <div className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Professional-Grade Crypto Trading Analysis
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Advanced charting, custom indicators, and automated trading strategies
              all in one platform.
            </p>
            <Link
              to="/trading"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Trading
              <ArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </div>

      {/* Crypto Flows */}
      {cryptoFlows && (
        <div className="container mx-auto px-4 -mt-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-sm text-gray-500">Total Market Cap</h3>
              <div className="text-2xl font-bold">
                {formatMarketCap(cryptoFlows?.totalMarketCap || 0)}
              </div>
              <div className={cn(
                "text-sm font-semibold mt-1",
                (cryptoFlows?.marketCapChange || 0) >= 0 ? "text-green-600" : "text-red-600"
              )}>
                {(cryptoFlows?.marketCapChange || 0) > 0 ? '+' : ''}
                {(cryptoFlows?.marketCapChange || 0).toFixed(2)}%
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-sm text-gray-500">24h Volume</h3>
              <div className="text-2xl font-bold">
                {formatMarketCap(cryptoFlows?.totalVolume || 0)}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {((cryptoFlows?.totalVolume || 0) / (cryptoFlows?.totalMarketCap || 1) * 100).toFixed(2)}% of Market Cap
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-sm text-gray-500">BTC Dominance</h3>
              <div className="text-2xl font-bold">
                {(cryptoFlows?.btcDominance || 0).toFixed(2)}%
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-sm text-gray-500">Market Direction</h3>
              <div className={cn(
                "text-2xl font-bold",
                (cryptoFlows?.marketCapChange || 0) >= 0 ? "text-green-600" : "text-red-600"
              )}>
                {(cryptoFlows?.marketCapChange || 0) >= 0 ? 'Bullish' : 'Bearish'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Features */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <LineChart className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Advanced Charts</h3>
            <p className="text-gray-600">
              Professional-grade charting with multiple timeframes and indicators.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Code2 className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Strategy Editor</h3>
            <p className="text-gray-600">
              Create and backtest custom trading strategies with Pine Script.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Zap className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Real-Time Data</h3>
            <p className="text-gray-600">
              Live cryptocurrency market data and instant updates.
            </p>
          </div>
        </div>
      </div>

      {/* Market Overview */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Market Overview</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {topCoins?.map((coin: any) => (
            <Link
              key={coin.id}
              to={`/trading?coin=${coin.id}`}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-4">
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="w-8 h-8 mr-3"
                />
                <h3 className="text-lg font-semibold">{coin.name}</h3>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">
                  ${coin.current_price.toLocaleString()}
                </span>
                <span
                  className={cn(
                    "font-semibold",
                    coin.price_change_percentage_24h >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  )}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}




// import React from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowRight, LineChart, Code2, Zap } from 'lucide-react';
// import useSWR from 'swr';
// import { getTopCoins } from '../lib/api';
// import { cn } from '../lib/utils';

// const fetchCryptoFlows = async () => {
//   try {
//     const response = await fetch('https://api.coingecko.com/api/v3/global');
//     const json = await response.json();
//     if (!json.data) throw new Error('Invalid data structure');
//     return {
//       totalMarketCap: json.data.total_market_cap.usd,
//       marketCapChange: json.data.market_cap_change_percentage_24h
//     };
//   } catch (error) {
//     console.error('Error fetching crypto flows:', error);
//     return null;
//   }
// };

// export function Home() {
//   const { data: topCoins } = useSWR('topCoins', () => getTopCoins(6));
//   const { data: cryptoFlows } = useSWR('cryptoFlows', fetchCryptoFlows);

//   const formatMarketCap = (value) => {
//     if (!value) return '$0';
//     if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
//     if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
//     return `$${value.toLocaleString()}`;
//   };

//   return (
//     <div className="bg-gray-100">
//       {/* Hero Section */}
//       <div className="bg-gray-900 text-white">
//         <div className="container mx-auto px-4 py-24">
//           <div className="max-w-3xl">
//             <h1 className="text-5xl font-bold mb-6">
//               Professional-Grade Crypto Trading Analysis
//             </h1>
//             <p className="text-xl text-gray-300 mb-8">
//               Advanced charting, custom indicators, and automated trading strategies
//               all in one platform.
//             </p>
//             <Link
//               to="/trading"
//               className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Start Trading
//               <ArrowRight className="ml-2" />
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Crypto Flows */}
//       {cryptoFlows && (
//         <div className="container mx-auto px-4 -mt-12">
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <div className="flex justify-between items-center">
//               <div>
//                 <h3 className="text-sm text-gray-500">Total Market Cap</h3>
//                 <div className="text-2xl font-bold">
//                   {formatMarketCap(cryptoFlows?.totalMarketCap)}
//                 </div>
//               </div>
//               <div className="text-right">
//                 <h3 className="text-sm text-gray-500">24h Change</h3>
//                 <div className={cn(
//                   "text-2xl font-bold",
//                   (cryptoFlows?.marketCapChange || 0) >= 0 ? "text-green-600" : "text-red-600"
//                 )}>
//                   {(cryptoFlows?.marketCapChange || 0) > 0 ? '+' : ''}
//                   {(cryptoFlows?.marketCapChange || 0).toFixed(2)}%
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Features */}
//       <div className="container mx-auto px-4 py-16">
//         <div className="grid md:grid-cols-3 gap-8">
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <LineChart className="w-12 h-12 text-blue-600 mb-4" />
//             <h3 className="text-xl font-semibold mb-2">Advanced Charts</h3>
//             <p className="text-gray-600">
//               Professional-grade charting with multiple timeframes and indicators.
//             </p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <Code2 className="w-12 h-12 text-blue-600 mb-4" />
//             <h3 className="text-xl font-semibold mb-2">Strategy Editor</h3>
//             <p className="text-gray-600">
//               Create and backtest custom trading strategies with Pine Script.
//             </p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <Zap className="w-12 h-12 text-blue-600 mb-4" />
//             <h3 className="text-xl font-semibold mb-2">Real-Time Data</h3>
//             <p className="text-gray-600">
//               Live cryptocurrency market data and instant updates.
//             </p>
//           </div>
//         </div>
//       </div>

      

//       {/* Market Overview */}
//       <div className="container mx-auto px-4 py-16">
//         <h2 className="text-3xl font-bold mb-8">Market Overview</h2>
//         <div className="grid md:grid-cols-3 gap-6">
//           {topCoins?.map((coin: any) => (
//             <Link
//               key={coin.id}
//               to={`/trading?coin=${coin.id}`}
//               className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
//             >
//               <div className="flex items-center mb-4">
//                 <img
//                   src={coin.image}
//                   alt={coin.name}
//                   className="w-8 h-8 mr-3"
//                 />
//                 <h3 className="text-lg font-semibold">{coin.name}</h3>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-2xl font-bold">
//                   ${coin.current_price.toLocaleString()}
//                 </span>
//                 <span
//                   className={cn(
//                     "font-semibold",
//                     coin.price_change_percentage_24h >= 0
//                       ? "text-green-600"
//                       : "text-red-600"
//                   )}
//                 >
//                   {coin.price_change_percentage_24h.toFixed(2)}%
//                 </span>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


// import React from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowRight, LineChart, Code2, Zap } from 'lucide-react';
// import useSWR from 'swr';
// import { getTopCoins } from '../lib/api';
// import { cn } from '../lib/utils';

// export function Home() {
//   const { data: topCoins } = useSWR('topCoins', () => getTopCoins(6));

//   return (
//     <div className="bg-gray-100">
//       {/* Hero Section */}
//       <div className="bg-gray-900 text-white">
//         <div className="container mx-auto px-4 py-24">
//           <div className="max-w-3xl">
//             <h1 className="text-5xl font-bold mb-6">
//               Professional-Grade Crypto Trading Analysis
//             </h1>
//             <p className="text-xl text-gray-300 mb-8">
//               Advanced charting, custom indicators, and automated trading strategies
//               all in one platform.
//             </p>
//             <Link
//               to="/trading"
//               className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Start Trading
//               <ArrowRight className="ml-2" />
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Features */}
//       <div className="container mx-auto px-4 py-16">
//         <div className="grid md:grid-cols-3 gap-8">
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <LineChart className="w-12 h-12 text-blue-600 mb-4" />
//             <h3 className="text-xl font-semibold mb-2">Advanced Charts</h3>
//             <p className="text-gray-600">
//               Professional-grade charting with multiple timeframes and indicators.
//             </p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <Code2 className="w-12 h-12 text-blue-600 mb-4" />
//             <h3 className="text-xl font-semibold mb-2">Strategy Editor</h3>
//             <p className="text-gray-600">
//               Create and backtest custom trading strategies with Pine Script.
//             </p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <Zap className="w-12 h-12 text-blue-600 mb-4" />
//             <h3 className="text-xl font-semibold mb-2">Real-Time Data</h3>
//             <p className="text-gray-600">
//               Live cryptocurrency market data and instant updates.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Market Overview */}
//       <div className="container mx-auto px-4 py-16">
//         <h2 className="text-3xl font-bold mb-8">Market Overview</h2>
//         <div className="grid md:grid-cols-3 gap-6">
//           {topCoins?.map((coin: any) => (
//             <Link
//               key={coin.id}
//               to={`/trading?coin=${coin.id}`}
//               className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
//             >
//               <div className="flex items-center mb-4">
//                 <img
//                   src={coin.image}
//                   alt={coin.name}
//                   className="w-8 h-8 mr-3"
//                 />
//                 <h3 className="text-lg font-semibold">{coin.name}</h3>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-2xl font-bold">
//                   ${coin.current_price.toLocaleString()}
//                 </span>
//                 <span
//                   className={cn(
//                     "font-semibold",
//                     coin.price_change_percentage_24h >= 0
//                       ? "text-green-600"
//                       : "text-red-600"
//                   )}
//                 >
//                   {coin.price_change_percentage_24h.toFixed(2)}%
//                 </span>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }