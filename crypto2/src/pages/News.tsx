import React, { useState } from 'react';
import useSWR from 'swr';
import { getNews } from '../lib/api';
import { ExternalLink } from 'lucide-react';

export function News() {
  const [filter, setFilter] = useState('important');
  const { data: news, error } = useSWR(['cryptoNews', filter], () => getNews('', filter));

  const filters = [
    { value: 'important', label: 'Important' },
    { value: 'hot', label: 'Trending' },
    { value: 'saved', label: 'Saved' }
  ];

  if (error) return <div className="p-6 max-w-4xl mx-auto">Failed to load news</div>;
  if (!news) return <div className="p-6 max-w-4xl mx-auto">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Crypto News</h1>
        <div className="flex space-x-2">
          {filters.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`px-4 py-2 rounded-lg ${
                filter === value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {news.map(item => (
          <div key={item.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                <p className="text-gray-600 mb-4">{item.metadata?.description}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>{new Date(item.published_at).toLocaleString()}</span>
                  <span className="mx-2">•</span>
                  <span>{item.source.title}</span>
                </div>
              </div>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 hover:text-blue-700"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}




// import React, { useState } from 'react';
// import useSWR from 'swr';
// import { getNews } from '../lib/api';
// import { ExternalLink, Filter } from 'lucide-react';

// export function News() {
//   const [filter, setFilter] = useState('important');
//   const { data: news } = useSWR(['cryptoNews', filter], () => getNews('', filter));

//   const filters = [
//     { value: 'important', label: 'Important' },
//     { value: 'hot', label: 'Trending' },
//     { value: 'saved', label: 'Saved' }
//   ];

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">Crypto News</h1>
//         <div className="flex space-x-2">
//           {filters.map(({ value, label }) => (
//             <button
//               key={value}
//               onClick={() => setFilter(value)}
//               className={`px-4 py-2 rounded-lg ${
//                 filter === value
//                   ? 'bg-blue-600 text-white'
//                   : 'bg-gray-100 hover:bg-gray-200'
//               }`}
//             >
//               {label}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="space-y-6">
//         {news?.map(item => (
//           <div key={item.id} className="bg-white rounded-lg shadow-lg p-6">
//             <div className="flex justify-between items-start">
//               <div>
//                 <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
//                 <p className="text-gray-600 mb-4">{item.metadata?.description}</p>
//                 <div className="flex items-center text-sm text-gray-500">
//                   <span>{new Date(item.published_at).toLocaleString()}</span>
//                   <span className="mx-2">•</span>
//                   <span>{item.source.title}</span>
//                 </div>
//               </div>
//               <a
//                 href={item.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center text-blue-600 hover:text-blue-700"
//               >
//                 <ExternalLink className="w-5 h-5" />
//               </a>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );