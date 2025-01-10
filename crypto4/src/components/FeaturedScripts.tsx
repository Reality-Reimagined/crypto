// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Code2, Star, TrendingUp, ChevronRight, BookOpen, BarChart2, ArrowUp, ArrowDown } from 'lucide-react';
// import { cn } from '../lib/utils';

// const featuredScripts = [
//   {
//     id: 'rsi-strategy',
//     name: 'RSI Trading Strategy',
//     description: 'Classic RSI strategy with customizable overbought/oversold levels',
//     category: 'Technical',
//     rating: 4.8,
//     downloads: 12453,
//     performance: {
//       winRate: 68.5,
//       profitFactor: 2.1,
//       sharpeRatio: 1.8,
//       maxDrawdown: 12.4,
//       monthlyReturns: 4.2,
//       backtest: {
//         period: '2020-2023',
//         totalTrades: 842,
//         profitableTrades: 576,
//         avgTradeLength: '3.2 days'
//       }
//     },
//     code: `// RSI Trading Strategy
// //@version=5
// strategy("RSI Strategy", overlay=true)
// length = input(14, "RSI Length")
// overbought = input(70)
// oversold = input(30)
// rsi = ta.rsi(close, length)
// if ta.crossover(rsi, oversold)
//     strategy.entry("RSI Buy", strategy.long)
// if ta.crossunder(rsi, overbought)
//     strategy.close("RSI Buy")`
//   },
//   {
//     id: 'macd-cross',
//     name: 'MACD Crossover System',
//     description: 'Advanced MACD crossover strategy with multiple timeframe analysis',
//     category: 'Momentum',
//     rating: 4.6,
//     downloads: 8932,
//     performance: {
//       winRate: 62.3,
//       profitFactor: 1.9,
//       sharpeRatio: 1.6,
//       maxDrawdown: 15.8,
//       monthlyReturns: 3.5,
//       backtest: {
//         period: '2019-2023',
//         totalTrades: 1240,
//         profitableTrades: 772,
//         avgTradeLength: '4.5 days'
//       }
//     },
//     code: `// MACD Crossover Strategy...`
//   },
//   {
//     id: 'supertrend-mtf',
//     name: 'SuperTrend Multi-Timeframe',
//     description: 'SuperTrend indicator with multiple timeframe confirmation and volatility filters',
//     category: 'Trend',
//     rating: 4.9,
//     downloads: 18234,
//     performance: {
//       winRate: 71.2,
//       profitFactor: 2.4,
//       sharpeRatio: 2.1,
//       maxDrawdown: 11.2,
//       monthlyReturns: 5.1,
//       backtest: {
//         period: '2021-2023',
//         totalTrades: 632,
//         profitableTrades: 450,
//         avgTradeLength: '5.8 days'
//       }
//     },
//     code: `// SuperTrend MTF Strategy
// //@version=5
// strategy("SuperTrend MTF", overlay=true)
// atrPeriod = input(10, "ATR Length")
// factor = input.float(3.0, "Factor", step = 0.01)

// [supertrend, direction] = ta.supertrend(factor, atrPeriod)

// if direction < 0 and direction[1] > 0
//     strategy.entry("ST Short", strategy.short)
// else if direction > 0 and direction[1] < 0
//     strategy.entry("ST Long", strategy.long)`
//   },
//   {
//     id: 'vwap-mean-reversion',
//     name: 'VWAP Mean Reversion',
//     description: 'Mean reversion strategy using VWAP bands and volume profile',
//     category: 'Mean Reversion',
//     rating: 4.7,
//     downloads: 14567,
//     performance: {
//       winRate: 65.8,
//       profitFactor: 1.95,
//       sharpeRatio: 1.75,
//       maxDrawdown: 13.6,
//       monthlyReturns: 3.8,
//       backtest: {
//         period: '2020-2023',
//         totalTrades: 956,
//         profitableTrades: 629,
//         avgTradeLength: '2.1 days'
//       }
//     },
//     code: `// VWAP Mean Reversion
// //@version=5
// strategy("VWAP Mean Reversion", overlay=true)
// vwapDev = input(2.0, "VWAP Deviation")
// vwap = ta.vwap
// upperBand = vwap + ta.stdev(close, 20) * vwapDev
// lowerBand = vwap - ta.stdev(close, 20) * vwapDev

// if close < lowerBand and volume > ta.sma(volume, 20)
//     strategy.entry("Long", strategy.long)
// if close > upperBand
//     strategy.close("Long")`
//   },
//   {
//     id: 'fibonacci-retracement',
//     name: 'Fibonacci Retracement Strategy',
//     description: 'Dynamic Fibonacci levels with volume confirmation for crypto swing trading',
//     category: 'Price Action',
//     rating: 4.8,
//     downloads: 13567,
//     performance: {
//       winRate: 69.4,
//       profitFactor: 2.2,
//       sharpeRatio: 1.9,
//       maxDrawdown: 13.2,
//       monthlyReturns: 4.1,
//       backtest: {
//         period: '2021-2023',
//         totalTrades: 486,
//         profitableTrades: 337,
//         avgTradeLength: '4.8 days'
//       }
//     },
//     code: `// Fibonacci Retracement Strategy
// //@version=5
// strategy("Fib Retracement", overlay=true)
// lookback = input(20, "Swing Lookback")
// highPoint = ta.highest(high, lookback)
// lowPoint = ta.lowest(low, lookback)

// fib618 = highPoint - (highPoint - lowPoint) * 0.618
// fib500 = highPoint - (highPoint - lowPoint) * 0.500
// fib382 = highPoint - (highPoint - lowPoint) * 0.382

// if close < fib382 and ta.crossover(close, fib382)
//     strategy.entry("Long", strategy.long)`
//   },
//   {
//     id: 'vwap-scalping',
//     name: 'VWAP Scalping System',
//     description: 'High-frequency scalping strategy using VWAP deviations and volume delta',
//     category: 'Scalping',
//     rating: 4.5,
//     downloads: 9876,
//     performance: {
//       winRate: 65.2,
//       profitFactor: 1.8,
//       sharpeRatio: 1.5,
//       maxDrawdown: 8.4,
//       monthlyReturns: 2.8,
//       backtest: {
//         period: '2022-2023',
//         totalTrades: 1562,
//         profitableTrades: 1018,
//         avgTradeLength: '1.2 hours'
//       }
//     },
//     code: `// VWAP Scalping Strategy
// //@version=5
// strategy("VWAP Scalper", overlay=true)
// vwapDev = input.float(1.5, "VWAP Deviation")
// volumeThresh = input.float(1.5, "Volume Threshold")

// vwap = ta.vwap
// upperBand = vwap + ta.stdev(close, 20) * vwapDev
// lowerBand = vwap - ta.stdev(close, 20) * vwapDev

// volMA = ta.sma(volume, 20)
// highVol = volume > volMA * volumeThresh

// if close < lowerBand and highVol
//     strategy.entry("Long", strategy.long)`
//   },
//   {
//     id: 'funding-rate-arb',
//     name: 'Funding Rate Arbitrage',
//     description: 'Perpetual futures arbitrage strategy based on funding rate differentials',
//     category: 'Arbitrage',
//     rating: 4.7,
//     downloads: 8234,
//     performance: {
//       winRate: 82.3,
//       profitFactor: 2.5,
//       sharpeRatio: 2.2,
//       maxDrawdown: 5.6,
//       monthlyReturns: 2.4,
//       backtest: {
//         period: '2022-2023',
//         totalTrades: 924,
//         profitableTrades: 761,
//         avgTradeLength: '8 hours'
//       }
//     },
//     code: `// Funding Rate Arbitrage
// //@version=5
// strategy("Funding Arb", overlay=true)
// fundingThresh = input.float(0.01, "Funding Threshold %")
// holdingPeriod = input.int(8, "Holding Period (Hours)")

// if fundingRate > fundingThresh
//     strategy.entry("Short Perp", strategy.short)
//     strategy.exit("Exit", "Short Perp", limit=close, when=time > time + holdingPeriod * 3600000)`
//   },
//   {
//     id: 'orderflow-momentum',
//     name: 'Order Flow Momentum',
//     description: 'Advanced order flow analysis with CVD and delta divergence',
//     category: 'Order Flow',
//     rating: 4.9,
//     downloads: 11234,
//     performance: {
//       winRate: 71.5,
//       profitFactor: 2.1,
//       sharpeRatio: 1.9,
//       maxDrawdown: 12.8,
//       monthlyReturns: 3.9,
//       backtest: {
//         period: '2021-2023',
//         totalTrades: 842,
//         profitableTrades: 602,
//         avgTradeLength: '2.4 days'
//       }
//     },
//     code: `// Order Flow Momentum
// //@version=5
// strategy("Order Flow Momentum", overlay=true)
// deltaLength = input.int(14, "Delta Length")
// cvdLength = input.int(20, "CVD Length")

// delta = volume * (close - open) / math.abs(high - low)
// cvd = ta.cum(delta)
// deltaMA = ta.sma(delta, deltaLength)
// cvdMA = ta.sma(cvd, cvdLength)

// if ta.crossover(delta, deltaMA) and cvd > cvdMA
//     strategy.entry("Long", strategy.long)`
//   },
// //   {
// //     id: 'rsi-strategy',
// //     name: 'RSI Trading Strategy',
// //     description: 'Classic RSI strategy with customizable overbought/oversold levels',
// //     category: 'Technical',
// //     rating: 4.8,
// //     downloads: 12453,
// //     performance: {
// //       winRate: 68.5,
// //       profitFactor: 2.1,
// //       sharpeRatio: 1.8,
// //       maxDrawdown: 12.4,
// //       monthlyReturns: 4.2,
// //       backtest: {
// //         period: '2020-2023',
// //         totalTrades: 842,
// //         profitableTrades: 576,
// //         avgTradeLength: '3.2 days'
// //       }
// //     },
// //     code: `// RSI Trading Strategy
// // //@version=5
// // strategy("RSI Strategy", overlay=true)
// // length = input(14, "RSI Length")
// // overbought = input(70)
// // oversold = input(30)
// // rsi = ta.rsi(close, length)
// // if ta.crossover(rsi, oversold)
// //     strategy.entry("RSI Buy", strategy.long)
// // if ta.crossunder(rsi, overbought)
// //     strategy.close("RSI Buy")`
// //   },
//   {
//     id: 'ichimoku-cloud',
//     name: 'Ichimoku Cloud System',
//     description: 'Complete Ichimoku trading system with cloud breakouts and trend confirmation',
//     category: 'Trend',
//     rating: 4.7,
//     downloads: 9876,
//     performance: {
//       winRate: 64.8,
//       profitFactor: 2.0,
//       sharpeRatio: 1.7,
//       maxDrawdown: 14.2,
//       monthlyReturns: 3.8,
//       backtest: {
//         period: '2020-2023',
//         totalTrades: 624,
//         profitableTrades: 404,
//         avgTradeLength: '5.4 days'
//       }
//     },
//     code: `// Ichimoku Cloud Strategy
// //@version=5
// strategy("Ichimoku Cloud", overlay=true)
// conversionPeriods = input(9, "Conversion Line Length")
// basePeriods = input(26, "Base Line Length")
// laggingSpan2Periods = input(52, "Leading Span B Length")
// displacement = input(26, "Displacement")

// [tenkan, kijun, spanA, spanB] = ta.ichimoku(conversionPeriods, basePeriods, laggingSpan2Periods, displacement)

// if ta.crossover(close, spanA) and close > spanB
//     strategy.entry("Long", strategy.long)
// if ta.crossunder(close, spanA) and close < spanB
//     strategy.close("Long")`
//   },
//   {
//     id: 'volume-profile',
//     name: 'Volume Profile Trading',
//     description: 'Advanced volume profile strategy using POC and value area',
//     category: 'Volume',
//     rating: 4.9,
//     downloads: 15234,
//     performance: {
//       winRate: 72.1,
//       profitFactor: 2.3,
//       sharpeRatio: 2.0,
//       maxDrawdown: 11.8,
//       monthlyReturns: 4.5,
//       backtest: {
//         period: '2021-2023',
//         totalTrades: 728,
//         profitableTrades: 525,
//         avgTradeLength: '4.1 days'
//       }
//     },
//     code: `// Volume Profile Strategy
// //@version=5
// strategy("Volume Profile", overlay=true)
// lookback = input(20, "Lookback Period")
// valueAreaPercent = input(70, "Value Area %")

// [poc, vaHigh, vaLow] = ta.valueatrisk(close, volume, lookback, valueAreaPercent)

// if close < vaLow and volume > ta.sma(volume, lookback)
//     strategy.entry("Long", strategy.long)
// if close > vaHigh
//     strategy.close("Long")`
//   },
//   {
//     id: 'harmonic-patterns',
//     name: 'Harmonic Pattern Scanner',
//     description: 'Identifies and trades Gartley, Butterfly, and Bat patterns',
//     category: 'Pattern Recognition',
//     rating: 4.6,
//     downloads: 11432,
//     performance: {
//       winRate: 67.3,
//       profitFactor: 1.9,
//       sharpeRatio: 1.6,
//       maxDrawdown: 15.4,
//       monthlyReturns: 3.6,
//       backtest: {
//         period: '2020-2023',
//         totalTrades: 542,
//         profitableTrades: 365,
//         avgTradeLength: '6.2 days'
//       }
//     },
//     code: `// Harmonic Pattern Strategy
// //@version=5
// strategy("Harmonic Patterns", overlay=true)
// tolerance = input.float(0.05, "Pattern Tolerance")
// stopLoss = input.float(2.0, "Stop Loss %")

// // Pattern Detection Functions
// isGartley = (swing) => {
//     // Gartley pattern detection logic
//     return true
// }

// if isGartley(high)
//     strategy.entry("Gartley", strategy.long)
//     strategy.exit("Exit", "Gartley", stop=close * (1 - stopLoss/100))`
//   }
// ];
  
// // ];



// // import React from 'react';
// // import { Link } from 'react-router-dom';
// // import { Code2, Star, TrendingUp, ChevronRight, BookOpen } from 'lucide-react';
// // import { cn } from '../lib/utils';

// // const featuredScripts = [
// //   {
// //     id: 'rsi-strategy',
// //     name: 'RSI Trading Strategy',
// //     description: 'Classic RSI strategy with customizable overbought/oversold levels',
// //     category: 'Technical',
// //     rating: 4.8,
// //     downloads: 12453,
// //     code: `// RSI Trading Strategy
// // //@version=5
// // strategy("RSI Strategy", overlay=true)
// // length = input(14, "RSI Length")
// // overbought = input(70)
// // oversold = input(30)
// // rsi = ta.rsi(close, length)
// // if ta.crossover(rsi, oversold)
// //     strategy.entry("RSI Buy", strategy.long)
// // if ta.crossunder(rsi, overbought)
// //     strategy.close("RSI Buy")`
// //   },
// //   {
// //     id: 'macd-cross',
// //     name: 'MACD Crossover System',
// //     description: 'Advanced MACD crossover strategy with multiple timeframe analysis',
// //     category: 'Momentum',
// //     rating: 4.6,
// //     downloads: 8932,
// //     code: `// MACD Crossover Strategy
// // //@version=5
// // strategy("MACD Cross", overlay=true)
// // fast = input(12)
// // slow = input(26)
// // signal = input(9)
// // [macd, signal, hist] = ta.macd(close, fast, slow, signal)
// // if ta.crossover(macd, signal)
// //     strategy.entry("MACD Buy", strategy.long)
// // if ta.crossunder(macd, signal)
// //     strategy.close("MACD Buy")`
// //   },
// //   {
// //     id: 'bb-squeeze',
// //     name: 'Bollinger Bands Squeeze',
// //     description: 'Volatility breakout strategy using Bollinger Bands squeeze',
// //     category: 'Volatility',
// //     rating: 4.9,
// //     downloads: 15678,
// //     code: `// BB Squeeze Strategy
// // //@version=5
// // strategy("BB Squeeze", overlay=true)
// // length = input(20)
// // mult = input(2.0)
// // basis = ta.sma(close, length)
// // dev = mult * ta.stdev(close, length)
// // upper = basis + dev
// // lower = basis - dev
// // squeeze = ta.bb(close, length, mult)
// // if close > upper
// //     strategy.entry("BB Buy", strategy.long)
// // if close < lower
// //     strategy.close("BB Buy")`
// //   }
// // ];

// export function FeaturedScripts() {
//   return (
//     <div className="min-h-screen bg-gray-100 py-12">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Featured Trading Scripts</h1>
//           <Link
//             to="/editor"
//             className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             Create New Script
//             <Code2 className="ml-2 h-4 w-4" />
//           </Link>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {featuredScripts.map((script) => (
//             <div key={script.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
//               <div className="p-6">
//                 <div className="flex items-start justify-between">
//                   <div>
//                     <h3 className="text-xl font-semibold text-gray-900 mb-1">
//                       {script.name}
//                     </h3>
//                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                       {script.category}
//                     </span>
//                   </div>
//                   <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
//                 </div>
                
//                 <p className="mt-3 text-gray-600 text-sm">
//                   {script.description}
//                 </p>

//                 <div className="mt-4 flex items-center justify-between">
//                   <div className="flex items-center space-x-4">
//                     <div className="flex items-center">
//                       <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
//                       <span className="ml-1 text-sm text-gray-600">{script.rating}</span>
//                     </div>
//                     <div className="flex items-center">
//                       <TrendingUp className="h-4 w-4 text-gray-400" />
//                       <span className="ml-1 text-sm text-gray-600">
//                         {script.downloads.toLocaleString()} uses
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-6 flex space-x-3">
//                   <Link
//                     to={`/editor?script=${script.id}`}
//                     state={{ code: script.code }}
//                     className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50"
//                   >
//                     Open in Editor
//                     <ChevronRight className="ml-2 h-4 w-4" />
//                   </Link>
//                   <button
//                     onClick={() => {/* Add preview functionality */}}
//                     className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
//                   >
//                     <BookOpen className="h-4 w-4 text-gray-500" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code2, Star, TrendingUp, ChevronRight, BookOpen, X, BarChart2 } from 'lucide-react';

// const featuredScripts = [
//   {
//     id: 'rsi-strategy',
//     name: 'RSI Trading Strategy',
//     description: 'Classic RSI strategy with customizable overbought/oversold levels',
//     category: 'Technical',
//     rating: 4.8,
//     downloads: 12453,
//     performance: {
//       winRate: 68.5,
//       profitFactor: 2.1,
//       sharpeRatio: 1.8,
//       maxDrawdown: 12.4,
//       monthlyReturns: 4.2,
//       backtest: {
//         period: '2020-2023',
//         totalTrades: 842,
//         profitableTrades: 576,
//         avgTradeLength: '3.2 days'
//       }
//     },
//     code: `// RSI Trading Strategy
// //@version=5
// strategy("RSI Strategy", overlay=true)
// length = input(14, "RSI Length")
// overbought = input(70)
// oversold = input(30)
// rsi = ta.rsi(close, length)
// if ta.crossover(rsi, oversold)
//     strategy.entry("RSI Buy", strategy.long)
// if ta.crossunder(rsi, overbought)
//     strategy.close("RSI Buy")`
//   },
//   {
//     id: 'ichimoku-cloud',
//     name: 'Ichimoku Cloud System',
//     description: 'Complete Ichimoku trading system with cloud breakouts and trend confirmation',
//     category: 'Trend',
//     rating: 4.7,
//     downloads: 9876,
//     performance: {
//       winRate: 64.8,
//       profitFactor: 2.0,
//       sharpeRatio: 1.7,
//       maxDrawdown: 14.2,
//       monthlyReturns: 3.8,
//       backtest: {
//         period: '2020-2023',
//         totalTrades: 624,
//         profitableTrades: 404,
//         avgTradeLength: '5.4 days'
//       }
//     },
//     code: `// Ichimoku Cloud Strategy
// //@version=5
// strategy("Ichimoku Cloud", overlay=true)
// conversionPeriods = input(9, "Conversion Line Length")
// basePeriods = input(26, "Base Line Length")
// laggingSpan2Periods = input(52, "Leading Span B Length")
// displacement = input(26, "Displacement")

// [tenkan, kijun, spanA, spanB] = ta.ichimoku(conversionPeriods, basePeriods, laggingSpan2Periods, displacement)

// if ta.crossover(close, spanA) and close > spanB
//     strategy.entry("Long", strategy.long)
// if ta.crossunder(close, spanA) and close < spanB
//     strategy.close("Long")`
//   },
//   {
//     id: 'volume-profile',
//     name: 'Volume Profile Trading',
//     description: 'Advanced volume profile strategy using POC and value area',
//     category: 'Volume',
//     rating: 4.9,
//     downloads: 15234,
//     performance: {
//       winRate: 72.1,
//       profitFactor: 2.3,
//       sharpeRatio: 2.0,
//       maxDrawdown: 11.8,
//       monthlyReturns: 4.5,
//       backtest: {
//         period: '2021-2023',
//         totalTrades: 728,
//         profitableTrades: 525,
//         avgTradeLength: '4.1 days'
//       }
//     },
//     code: `// Volume Profile Strategy
// //@version=5
// strategy("Volume Profile", overlay=true)
// lookback = input(20, "Lookback Period")
// valueAreaPercent = input(70, "Value Area %")

// [poc, vaHigh, vaLow] = ta.valueatrisk(close, volume, lookback, valueAreaPercent)

// if close < vaLow and volume > ta.sma(volume, lookback)
//     strategy.entry("Long", strategy.long)
// if close > vaHigh
//     strategy.close("Long")`
//   },
//   {
//     id: 'funding-rate-arb',
//     name: 'Funding Rate Arbitrage',
//     description: 'Perpetual futures arbitrage strategy based on funding rate differentials',
//     category: 'Arbitrage',
//     rating: 4.7,
//     downloads: 8234,
//     performance: {
//       winRate: 82.3,
//       profitFactor: 2.5,
//       sharpeRatio: 2.2,
//       maxDrawdown: 5.6,
//       monthlyReturns: 2.4,
//       backtest: {
//         period: '2022-2023',
//         totalTrades: 924,
//         profitableTrades: 761,
//         avgTradeLength: '8 hours'
//       }
//     },
//     code: `// Funding Rate Arbitrage
// //@version=5
// strategy("Funding Arb", overlay=true)
// fundingThresh = input.float(0.01, "Funding Threshold %")
// holdingPeriod = input.int(8, "Holding Period (Hours)")

// if fundingRate > fundingThresh
//     strategy.entry("Short Perp", strategy.short)
//     strategy.exit("Exit", "Short Perp", limit=close, when=time > time + holdingPeriod * 3600000)`
//   }
// ];

const featuredScripts = [
  {
    id: 'rsi-strategy',
    name: 'RSI Trading Strategy',
    description: 'Classic RSI strategy with customizable overbought/oversold levels',
    category: 'Technical',
    rating: 4.8,
    downloads: 12453,
    performance: {
      winRate: 68.5,
      profitFactor: 2.1,
      sharpeRatio: 1.8,
      maxDrawdown: 12.4,
      monthlyReturns: 4.2,
      backtest: {
        period: '2020-2023',
        totalTrades: 842,
        profitableTrades: 576,
        avgTradeLength: '3.2 days'
      }
    },
    code: `// RSI Trading Strategy
//@version=5
strategy("RSI Strategy", overlay=true)
length = input(14, "RSI Length")
overbought = input(70)
oversold = input(30)
rsi = ta.rsi(close, length)
if ta.crossover(rsi, oversold)
    strategy.entry("RSI Buy", strategy.long)
if ta.crossunder(rsi, overbought)
    strategy.close("RSI Buy")`
  },
  {
    id: 'macd-cross',
    name: 'MACD Crossover System',
    description: 'Advanced MACD crossover strategy with multiple timeframe analysis',
    category: 'Momentum',
    rating: 4.6,
    downloads: 8932,
    performance: {
      winRate: 62.3,
      profitFactor: 1.9,
      sharpeRatio: 1.6,
      maxDrawdown: 15.8,
      monthlyReturns: 3.5,
      backtest: {
        period: '2019-2023',
        totalTrades: 1240,
        profitableTrades: 772,
        avgTradeLength: '4.5 days'
      }
    },
    code: `// MACD Crossover Strategy...`
  },
  {
    id: 'supertrend-mtf',
    name: 'SuperTrend Multi-Timeframe',
    description: 'SuperTrend indicator with multiple timeframe confirmation and volatility filters',
    category: 'Trend',
    rating: 4.9,
    downloads: 18234,
    performance: {
      winRate: 71.2,
      profitFactor: 2.4,
      sharpeRatio: 2.1,
      maxDrawdown: 11.2,
      monthlyReturns: 5.1,
      backtest: {
        period: '2021-2023',
        totalTrades: 632,
        profitableTrades: 450,
        avgTradeLength: '5.8 days'
      }
    },
    code: `// SuperTrend MTF Strategy
//@version=5
strategy("SuperTrend MTF", overlay=true)
atrPeriod = input(10, "ATR Length")
factor = input.float(3.0, "Factor", step = 0.01)

[supertrend, direction] = ta.supertrend(factor, atrPeriod)

if direction < 0 and direction[1] > 0
    strategy.entry("ST Short", strategy.short)
else if direction > 0 and direction[1] < 0
    strategy.entry("ST Long", strategy.long)`
  },
  {
    id: 'vwap-mean-reversion',
    name: 'VWAP Mean Reversion',
    description: 'Mean reversion strategy using VWAP bands and volume profile',
    category: 'Mean Reversion',
    rating: 4.7,
    downloads: 14567,
    performance: {
      winRate: 65.8,
      profitFactor: 1.95,
      sharpeRatio: 1.75,
      maxDrawdown: 13.6,
      monthlyReturns: 3.8,
      backtest: {
        period: '2020-2023',
        totalTrades: 956,
        profitableTrades: 629,
        avgTradeLength: '2.1 days'
      }
    },
    code: `// VWAP Mean Reversion
//@version=5
strategy("VWAP Mean Reversion", overlay=true)
vwapDev = input(2.0, "VWAP Deviation")
vwap = ta.vwap
upperBand = vwap + ta.stdev(close, 20) * vwapDev
lowerBand = vwap - ta.stdev(close, 20) * vwapDev

if close < lowerBand and volume > ta.sma(volume, 20)
    strategy.entry("Long", strategy.long)
if close > upperBand
    strategy.close("Long")`
  },
  {
    id: 'fibonacci-retracement',
    name: 'Fibonacci Retracement Strategy',
    description: 'Dynamic Fibonacci levels with volume confirmation for crypto swing trading',
    category: 'Price Action',
    rating: 4.8,
    downloads: 13567,
    performance: {
      winRate: 69.4,
      profitFactor: 2.2,
      sharpeRatio: 1.9,
      maxDrawdown: 13.2,
      monthlyReturns: 4.1,
      backtest: {
        period: '2021-2023',
        totalTrades: 486,
        profitableTrades: 337,
        avgTradeLength: '4.8 days'
      }
    },
    code: `// Fibonacci Retracement Strategy
//@version=5
strategy("Fib Retracement", overlay=true)
lookback = input(20, "Swing Lookback")
highPoint = ta.highest(high, lookback)
lowPoint = ta.lowest(low, lookback)

fib618 = highPoint - (highPoint - lowPoint) * 0.618
fib500 = highPoint - (highPoint - lowPoint) * 0.500
fib382 = highPoint - (highPoint - lowPoint) * 0.382

if close < fib382 and ta.crossover(close, fib382)
    strategy.entry("Long", strategy.long)`
  },
  {
    id: 'vwap-scalping',
    name: 'VWAP Scalping System',
    description: 'High-frequency scalping strategy using VWAP deviations and volume delta',
    category: 'Scalping',
    rating: 4.5,
    downloads: 9876,
    performance: {
      winRate: 65.2,
      profitFactor: 1.8,
      sharpeRatio: 1.5,
      maxDrawdown: 8.4,
      monthlyReturns: 2.8,
      backtest: {
        period: '2022-2023',
        totalTrades: 1562,
        profitableTrades: 1018,
        avgTradeLength: '1.2 hours'
      }
    },
    code: `// VWAP Scalping Strategy
//@version=5
strategy("VWAP Scalper", overlay=true)
vwapDev = input.float(1.5, "VWAP Deviation")
volumeThresh = input.float(1.5, "Volume Threshold")

vwap = ta.vwap
upperBand = vwap + ta.stdev(close, 20) * vwapDev
lowerBand = vwap - ta.stdev(close, 20) * vwapDev

volMA = ta.sma(volume, 20)
highVol = volume > volMA * volumeThresh

if close < lowerBand and highVol
    strategy.entry("Long", strategy.long)`
  },
  {
    id: 'funding-rate-arb',
    name: 'Funding Rate Arbitrage',
    description: 'Perpetual futures arbitrage strategy based on funding rate differentials',
    category: 'Arbitrage',
    rating: 4.7,
    downloads: 8234,
    performance: {
      winRate: 82.3,
      profitFactor: 2.5,
      sharpeRatio: 2.2,
      maxDrawdown: 5.6,
      monthlyReturns: 2.4,
      backtest: {
        period: '2022-2023',
        totalTrades: 924,
        profitableTrades: 761,
        avgTradeLength: '8 hours'
      }
    },
    code: `// Funding Rate Arbitrage
//@version=5
strategy("Funding Arb", overlay=true)
fundingThresh = input.float(0.01, "Funding Threshold %")
holdingPeriod = input.int(8, "Holding Period (Hours)")

if fundingRate > fundingThresh
    strategy.entry("Short Perp", strategy.short)
    strategy.exit("Exit", "Short Perp", limit=close, when=time > time + holdingPeriod * 3600000)`
  },
  {
    id: 'orderflow-momentum',
    name: 'Order Flow Momentum',
    description: 'Advanced order flow analysis with CVD and delta divergence',
    category: 'Order Flow',
    rating: 4.9,
    downloads: 11234,
    performance: {
      winRate: 71.5,
      profitFactor: 2.1,
      sharpeRatio: 1.9,
      maxDrawdown: 12.8,
      monthlyReturns: 3.9,
      backtest: {
        period: '2021-2023',
        totalTrades: 842,
        profitableTrades: 602,
        avgTradeLength: '2.4 days'
      }
    },
    code: `// Order Flow Momentum
//@version=5
strategy("Order Flow Momentum", overlay=true)
deltaLength = input.int(14, "Delta Length")
cvdLength = input.int(20, "CVD Length")

delta = volume * (close - open) / math.abs(high - low)
cvd = ta.cum(delta)
deltaMA = ta.sma(delta, deltaLength)
cvdMA = ta.sma(cvd, cvdLength)

if ta.crossover(delta, deltaMA) and cvd > cvdMA
    strategy.entry("Long", strategy.long)`
  },
//   {
//     id: 'rsi-strategy',
//     name: 'RSI Trading Strategy',
//     description: 'Classic RSI strategy with customizable overbought/oversold levels',
//     category: 'Technical',
//     rating: 4.8,
//     downloads: 12453,
//     performance: {
//       winRate: 68.5,
//       profitFactor: 2.1,
//       sharpeRatio: 1.8,
//       maxDrawdown: 12.4,
//       monthlyReturns: 4.2,
//       backtest: {
//         period: '2020-2023',
//         totalTrades: 842,
//         profitableTrades: 576,
//         avgTradeLength: '3.2 days'
//       }
//     },
//     code: `// RSI Trading Strategy
// //@version=5
// strategy("RSI Strategy", overlay=true)
// length = input(14, "RSI Length")
// overbought = input(70)
// oversold = input(30)
// rsi = ta.rsi(close, length)
// if ta.crossover(rsi, oversold)
//     strategy.entry("RSI Buy", strategy.long)
// if ta.crossunder(rsi, overbought)
//     strategy.close("RSI Buy")`
//   },
  {
    id: 'ichimoku-cloud',
    name: 'Ichimoku Cloud System',
    description: 'Complete Ichimoku trading system with cloud breakouts and trend confirmation',
    category: 'Trend',
    rating: 4.7,
    downloads: 9876,
    performance: {
      winRate: 64.8,
      profitFactor: 2.0,
      sharpeRatio: 1.7,
      maxDrawdown: 14.2,
      monthlyReturns: 3.8,
      backtest: {
        period: '2020-2023',
        totalTrades: 624,
        profitableTrades: 404,
        avgTradeLength: '5.4 days'
      }
    },
    code: `// Ichimoku Cloud Strategy
//@version=5
strategy("Ichimoku Cloud", overlay=true)
conversionPeriods = input(9, "Conversion Line Length")
basePeriods = input(26, "Base Line Length")
laggingSpan2Periods = input(52, "Leading Span B Length")
displacement = input(26, "Displacement")

[tenkan, kijun, spanA, spanB] = ta.ichimoku(conversionPeriods, basePeriods, laggingSpan2Periods, displacement)

if ta.crossover(close, spanA) and close > spanB
    strategy.entry("Long", strategy.long)
if ta.crossunder(close, spanA) and close < spanB
    strategy.close("Long")`
  },
  {
    id: 'volume-profile',
    name: 'Volume Profile Trading',
    description: 'Advanced volume profile strategy using POC and value area',
    category: 'Volume',
    rating: 4.9,
    downloads: 15234,
    performance: {
      winRate: 72.1,
      profitFactor: 2.3,
      sharpeRatio: 2.0,
      maxDrawdown: 11.8,
      monthlyReturns: 4.5,
      backtest: {
        period: '2021-2023',
        totalTrades: 728,
        profitableTrades: 525,
        avgTradeLength: '4.1 days'
      }
    },
    code: `// Volume Profile Strategy
//@version=5
strategy("Volume Profile", overlay=true)
lookback = input(20, "Lookback Period")
valueAreaPercent = input(70, "Value Area %")

[poc, vaHigh, vaLow] = ta.valueatrisk(close, volume, lookback, valueAreaPercent)

if close < vaLow and volume > ta.sma(volume, lookback)
    strategy.entry("Long", strategy.long)
if close > vaHigh
    strategy.close("Long")`
  },
  {
    id: 'harmonic-patterns',
    name: 'Harmonic Pattern Scanner',
    description: 'Identifies and trades Gartley, Butterfly, and Bat patterns',
    category: 'Pattern Recognition',
    rating: 4.6,
    downloads: 11432,
    performance: {
      winRate: 67.3,
      profitFactor: 1.9,
      sharpeRatio: 1.6,
      maxDrawdown: 15.4,
      monthlyReturns: 3.6,
      backtest: {
        period: '2020-2023',
        totalTrades: 542,
        profitableTrades: 365,
        avgTradeLength: '6.2 days'
      }
    },
    code: `// Harmonic Pattern Strategy
//@version=5
strategy("Harmonic Patterns", overlay=true)
tolerance = input.float(0.05, "Pattern Tolerance")
stopLoss = input.float(2.0, "Stop Loss %")

// Pattern Detection Functions
isGartley = (swing) => {
    // Gartley pattern detection logic
    return true
}

if isGartley(high)
    strategy.entry("Gartley", strategy.long)
    strategy.exit("Exit", "Gartley", stop=close * (1 - stopLoss/100))`
  }
];
  

function PreviewModal({ script, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-900">{script.name}</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">Win Rate</div>
              <div className="text-xl font-bold text-gray-900">
                {script.performance.winRate}%
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">Profit Factor</div>
              <div className="text-xl font-bold text-gray-900">
                {script.performance.profitFactor}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">Sharpe Ratio</div>
              <div className="text-xl font-bold text-gray-900">
                {script.performance.sharpeRatio}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">Max Drawdown</div>
              <div className="text-xl font-bold text-gray-900">
                {script.performance.maxDrawdown}%
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Backtest Results</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Period</div>
                  <div className="font-medium">{script.performance.backtest.period}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Total Trades</div>
                  <div className="font-medium">{script.performance.backtest.totalTrades}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Profitable Trades</div>
                  <div className="font-medium">{script.performance.backtest.profitableTrades}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Avg Trade Length</div>
                  <div className="font-medium">{script.performance.backtest.avgTradeLength}</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Strategy Code</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <code>{script.code}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeaturedScripts() {
  const [previewScript, setPreviewScript] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Featured Trading Scripts</h1>
            <p className="mt-2 text-gray-600">Production-ready trading strategies for crypto markets</p>
          </div>
          <Link
            to="/editor"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create New Script
            <Code2 className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredScripts.map((script) => (
            <div key={script.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {script.name}
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {script.category}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                    <span className="ml-1 text-sm font-medium text-gray-600">
                      {script.rating}
                    </span>
                  </div>
                </div>
                
                <p className="mt-3 text-gray-600 text-sm">
                  {script.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <BarChart2 className="h-4 w-4 text-gray-400" />
                      <span className="ml-1 text-sm text-gray-600">
                        {script.performance.winRate}% Win Rate
                      </span>
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 text-gray-400" />
                      <span className="ml-1 text-sm text-gray-600">
                        {script.downloads.toLocaleString()} uses
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <span className="font-medium">Profit Factor:</span>
                    <span className="ml-1">{script.performance.profitFactor}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium">Max Drawdown:</span>
                    <span className="ml-1">{script.performance.maxDrawdown}%</span>
                  </div>
                </div>

                <div className="mt-6 flex space-x-3">
                  <Link
                    to={`/editor?script=${script.id}`}
                    state={{ code: script.code }}
                    className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                  >
                    Open in Editor
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => setPreviewScript(script)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    title="Preview Strategy"
                  >
                    <BookOpen className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="mt-12 text-center">
          <button className="px-6 py-3 bg-white text-gray-600 rounded-lg shadow hover:shadow-md transition-shadow">
            Load More Strategies
          </button>
        </div> */}
      </div>

      <PreviewModal
        script={previewScript}
        isOpen={!!previewScript}
        onClose={() => setPreviewScript(null)}
      />
    </div>
  );
}
