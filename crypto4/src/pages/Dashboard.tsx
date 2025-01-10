import React from 'react';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import { getTopCoins, getNews } from '../lib/api';
import { LineChart, Newspaper, Code2 } from 'lucide-react';
import { cn } from '../lib/utils';

export function Dashboard() {
  const { data: favoriteCoins } = useSWR('topCoins', () => {
    const favorites = JSON.parse(localStorage.getItem('cryptoFavorites') || '[]');
    return getTopCoins().then(coins => 
      coins.filter(coin => favorites.includes(coin.id))
    );
  });

  const { data: news } = useSWR('cryptoNews', () => getNews());

  const savedScripts = JSON.parse(localStorage.getItem('pineScripts') || '[]');

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Favorites */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Favorite Coins</h2>
            <Link to="/trading" className="text-blue-600 hover:text-blue-700">View All</Link>
          </div>
          <div className="space-y-4">
            {favoriteCoins?.map(coin => (
              <Link
                key={coin.id}
                to={`/trading?coin=${coin.id}`}
                className="flex items-center p-3 hover:bg-gray-50 rounded-lg"
              >
                <img src={coin.image} alt={coin.name} className="w-8 h-8 mr-3" />
                <div className="flex-1">
                  <div className="font-medium">{coin.symbol.toUpperCase()}</div>
                  <div className="text-sm text-gray-500">${coin.current_price.toLocaleString()}</div>
                </div>
                <div className={cn(
                  "text-sm font-medium",
                  coin.price_change_percentage_24h >= 0 ? "text-green-600" : "text-red-600"
                )}>
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Saved Scripts */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Saved Scripts</h2>
            <Link to="/editor" className="text-blue-600 hover:text-blue-700">New Script</Link>
          </div>
          <div className="space-y-4">
            {savedScripts.map((script: any) => (
              <Link
                key={script.id}
                to={`/editor?script=${script.id}`}
                className="flex items-center p-3 hover:bg-gray-50 rounded-lg"
              >
                <Code2 className="w-6 h-6 text-gray-400 mr-3" />
                <div>
                  <div className="font-medium">{script.name}</div>
                  <div className="text-sm text-gray-500">Last edited: {new Date(script.lastEdited).toLocaleDateString()}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* News Feed */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Latest News</h2>
            <Link to="/news" className="text-blue-600 hover:text-blue-700">View All</Link>
          </div>
          <div className="space-y-4">
            {news?.slice(0, 5).map(item => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 hover:bg-gray-50 rounded-lg"
              >
                <div className="font-medium mb-1">{item.title}</div>
                <div className="text-sm text-gray-500">
                  {new Date(item.published_at).toLocaleDateString()}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}