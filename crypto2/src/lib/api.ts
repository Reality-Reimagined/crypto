import axios from 'axios';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';
const CRYPTO_NEWS_API = 'https://cryptopanic.com/api/v1/posts';
const NEWS_API_KEY = '82f8514cff057b36b5eb1a9e473777c3628b3662'; // Note: User needs to get their own API key

// Cache implementations remain the same...
// Previous market data and top coins cache code...


// import axios from 'axios';

// const COINGECKO_API = 'https://api.coingecko.com/api/v3';

export async function getMarketData(coinId: string, days = 1, interval = '5m') {
  const response = await axios.get(
    `${COINGECKO_API}/coins/${coinId}/ohlc`,
    {
      params: {
        vs_currency: 'usd',
        days,
      },
    }
  );

  return response.data.map(([timestamp, open, high, low, close]: number[]) => ({
    time: Math.floor(timestamp / 1000), // Convert to Unix timestamp in seconds
    open,
    high,
    low,
    close
  }));
}

export async function getTopCoins(limit = 50) {
  const response = await axios.get(`${COINGECKO_API}/coins/markets`, {
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: limit,
      page: 1,
      sparkline: false,
    },
  });

  return response.data;
}

export async function searchCoins(query: string) {
  const response = await axios.get(`${COINGECKO_API}/search`, {
    params: { query }
  });
  return response.data.coins;
}

// // Technical indicators
// export const calculateRSI = (prices: number[], period = 14) => {
//   const changes = prices.slice(1).map((price, i) => price - prices[i]);
//   let gains = changes.map(change => change > 0 ? change : 0);
//   let losses = changes.map(change => change < 0 ? -change : 0);

//   const avgGain = gains.slice(0, period).reduce((a, b) => a + b) / period;
//   const avgLoss = losses.slice(0, period).reduce((a, b) => a + b) / period;
  
//   const rs = avgGain / avgLoss;
//   return 100 - (100 / (1 + rs));
// };
// Technical Indicators
export const calculateRSI = (prices: number[], period = 14) => {
  if (prices.length < period + 1) return [];
  
  const changes = prices.slice(1).map((price, i) => price - prices[i]);
  const gains = changes.map(change => change > 0 ? change : 0);
  const losses = changes.map(change => change < 0 ? -change : 0);

  let avgGain = gains.slice(0, period).reduce((a, b) => a + b) / period;
  let avgLoss = losses.slice(0, period).reduce((a, b) => a + b) / period;

  const rsiValues = [100 - (100 / (1 + avgGain / avgLoss))];

  for (let i = period; i < prices.length - 1; i++) {
    avgGain = (avgGain * (period - 1) + gains[i]) / period;
    avgLoss = (avgLoss * (period - 1) + losses[i]) / period;
    rsiValues.push(100 - (100 / (1 + avgGain / avgLoss)));
  }

  return rsiValues;
};

export const calculateEMA = (prices: number[], period: number) => {
  const multiplier = 2 / (period + 1);
  let ema = [prices[0]];

  for (let i = 1; i < prices.length; i++) {
    ema.push((prices[i] - ema[i - 1]) * multiplier + ema[i - 1]);
  }

  return ema;
};

export const calculateMACD = (prices: number[]) => {
  const ema12 = calculateEMA(prices, 12);
  const ema26 = calculateEMA(prices, 26);
  const macdLine = ema12.map((value, i) => value - ema26[i]);
  const signalLine = calculateEMA(macdLine, 9);
  const histogram = macdLine.map((value, i) => value - signalLine[i]);

  return { macdLine, signalLine, histogram };
};

export const calculateBollingerBands = (prices: number[], period = 20, stdDev = 2) => {
  const sma = prices.map((_, i) => {
    if (i < period - 1) return null;
    const slice = prices.slice(i - period + 1, i + 1);
    return slice.reduce((a, b) => a + b) / period;
  });

  const bands = sma.map((mean, i) => {
    if (mean === null) return { upper: null, middle: null, lower: null };
    const slice = prices.slice(i - period + 1, i + 1);
    const variance = slice.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / period;
    const std = Math.sqrt(variance);
    return {
      upper: mean + stdDev * std,
      middle: mean,
      lower: mean - stdDev * std
    };
  });

  return bands;
};

// News API
export const getNews = async (currencies = '', filter = 'important') => {
  const response = await axios.get(CRYPTO_NEWS_API, {
    params: {
      auth_token: NEWS_API_KEY,
      currencies,
      filter,
      public: true
    }
  });
  return response.data.results;
};