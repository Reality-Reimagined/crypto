import axios from 'axios';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

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

// Technical indicators
export const calculateRSI = (prices: number[], period = 14) => {
  const changes = prices.slice(1).map((price, i) => price - prices[i]);
  let gains = changes.map(change => change > 0 ? change : 0);
  let losses = changes.map(change => change < 0 ? -change : 0);

  const avgGain = gains.slice(0, period).reduce((a, b) => a + b) / period;
  const avgLoss = losses.slice(0, period).reduce((a, b) => a + b) / period;
  
  const rs = avgGain / avgLoss;
  return 100 - (100 / (1 + rs));
};