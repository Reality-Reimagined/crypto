// import React, { useState } from 'react';
// import { BookOpen, RefreshCcw, TrendingUp, AlertTriangle } from 'lucide-react';
// import useSWR from 'swr';
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import axios from 'axios';

// const getNews = async () => {
//   const url = `https://cryptopanic.com/api/free/v1/posts/?auth_token=${import.meta.env.VITE_NEWS_API_KEY}&public=true`;
//   const response = await axios.get(url);
//   return response.data.results;
// };

// const fetchNewsAnalysis = async () => {
//   try {
//     // Get news using your existing function
//     const newsData = await getNews();

//     // Initialize Gemini AI
//     const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });

//     const analysisPrompt = `Analyze these crypto news articles and provide a structured analysis with:
//       1. Key market developments with impact scores (1-10)
//       2. Overall market sentiment (bullish/bearish) with reasoning
//       3. Potential risk factors
      
//       News data: ${JSON.stringify(newsData)}
      
//       Provide the response in this JSON format:
//       {
//         "summaries": [
//           {
//             "title": "News Title",
//             "analysis": "Detailed analysis",
//             "impactScore": number
//           }
//         ],
//         "sentiment": "bullish or bearish",
//         "sentimentAnalysis": "Detailed sentiment explanation",
//         "risks": ["risk1", "risk2", "risk3"]
//       }`;

//     const result = await model.generateContent(analysisPrompt);
//     const response = await result.response;
//     return JSON.parse(response.text());
//   } catch (error) {
//     console.error('Error in news analysis:', error);
//     return null;
//   }
// };
import React, { useState } from 'react';
import { BookOpen, RefreshCcw, TrendingUp, AlertTriangle } from 'lucide-react';
import useSWR from 'swr';
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from 'axios';

const getNews = async () => {
  const url = `https://cryptopanic.com/api/free/v1/posts/?auth_token=${import.meta.env.VITE_NEWS_API_KEY}&public=true`;
  const response = await axios.get(url);
  return response.data.results;
};

const fetchNewsAnalysis = async () => {
  try {
    const newsData = await getNews();

    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const analysisPrompt = `You are a crypto market analyst. Analyze these crypto news articles and provide a structured analysis. Return ONLY a JSON object with this exact structure, no markdown or additional text:
    {
      "summaries": [
        {
          "title": "Brief title of the news",
          "analysis": "Your analysis of the impact",
          "impactScore": 7
        }
      ],
      "sentiment": "bullish",
      "sentimentAnalysis": "Explanation of market sentiment",
      "risks": ["Risk factor 1", "Risk factor 2"]
    }

    News data to analyze: ${JSON.stringify(newsData)}`;

    const result = await model.generateContent(analysisPrompt);
    const response = await result.response;
    
    // Clean the response text to ensure valid JSON
    const cleanedResponse = response.text().replace(/``````/g, '').trim();
    return JSON.parse(cleanedResponse);
  } catch (error) {
    console.error('Error in news analysis:', error);
    return {
      summaries: [],
      sentiment: 'neutral',
      sentimentAnalysis: 'Unable to analyze at this time',
      risks: ['Analysis currently unavailable']
    };
  }
};

// Rest of your component code stays the same...


export function NewsAnalysis() {
  const [timeframe, setTimeframe] = useState('24h');
  const { data: newsAnalysis, mutate } = useSWR('newsAnalysis', fetchNewsAnalysis);

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Market Intelligence</h1>
            <p className="mt-2 text-gray-600">AI-powered news analysis and market insights</p>
          </div>
          <div className="flex items-center space-x-4">
            <select 
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
            <button
              onClick={() => mutate()}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <RefreshCcw className="h-4 w-4 mr-2" />
              Refresh Analysis
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Key Market Developments</h2>
              <div className="space-y-4">
                {newsAnalysis?.summaries?.map((summary, index) => (
                  <div key={index} className="border-b pb-4">
                    <h3 className="font-medium text-lg mb-2">{summary.title}</h3>
                    <p className="text-gray-600">{summary.analysis}</p>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>Impact Score: {summary.impactScore}/10</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Market Sentiment</h2>
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${
                  newsAnalysis?.sentiment === 'bullish' ? 'bg-green-50' : 'bg-red-50'
                }`}>
                  <div className="text-2xl font-bold mb-2">
                    {newsAnalysis?.sentiment === 'bullish' ? 'Bullish' : 'Bearish'}
                  </div>
                  <p className="text-sm text-gray-600">
                    {newsAnalysis?.sentimentAnalysis}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Risk Factors</h2>
              <div className="space-y-3">
                {newsAnalysis?.risks?.map((risk, index) => (
                  <div key={index} className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">{risk}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// // import React, { useState, useEffect } from 'react';
// // import { BookOpen, RefreshCcw, TrendingUp, AlertTriangle } from 'lucide-react';
// // import useSWR from 'swr';
// // // GEMINI_API_KEY=AIzaSyDwvCmBZol6Ol6H_GGZgWcD-1VdvQOPFw0
// // const fetchNewsAnalysis = async () => {
// //   try {
// //     const response = await fetch('https://api.gemini.google.com/v1/news/analyze', {
// //       headers: {
// //         'Content-Type': 'application/json',
// //         'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`
// //       }
// //     });
// //     const data = await response.json();
// //     return data;
// //   } catch (error) {
// //     console.error('Error fetching news analysis:', error);
// //     return null;
// //   }
// // };

// // export function NewsAnalysis() {
// //   const [timeframe, setTimeframe] = useState('24h');
// //   const { data: newsAnalysis, mutate } = useSWR('newsAnalysis', fetchNewsAnalysis);

// // import React, { useState } from 'react';
// // import { BookOpen, RefreshCcw, TrendingUp, AlertTriangle } from 'lucide-react';
// // import useSWR from 'swr';
// // import { GoogleGenerativeAI } from "@google/generative-ai";

// // const fetchNewsAnalysis = async (timeframe) => {
// //   try {
// //     // First fetch news from CryptoPanic
// //     const cryptoPanicResponse = await fetch(`https://cryptopanic.com/api/free/v1/posts/?auth_token=${process.env.CRYPTOPANIC_API_KEY}&public=true`, {
// //       headers: {
// //         'Accept': 'application/json',
// //       }
// //     });
// //     const newsData = await cryptoPanicResponse.json();

// //     // Initialize Gemini AI
// //     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// //     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });

// //     // Create structured prompt for analysis
// //     const analysisPrompt = `Analyze these crypto news articles and provide a structured analysis with:
// //       1. Key market developments with impact scores (1-10)
// //       2. Overall market sentiment (bullish/bearish) with reasoning
// //       3. Potential risk factors
      
// //       News data: ${JSON.stringify(newsData.results)}
      
// //       Provide the response in this JSON format:
// //       {
// //         "summaries": [
// //           {
// //             "title": "News Title",
// //             "analysis": "Detailed analysis",
// //             "impactScore": number
// //           }
// //         ],
// //         "sentiment": "bullish or bearish",
// //         "sentimentAnalysis": "Detailed sentiment explanation",
// //         "risks": ["risk1", "risk2", "risk3"]
// //       }`;

// //     const result = await model.generateContent(analysisPrompt);
// //     const response = await result.response;
// //     return JSON.parse(response.text());
// //   } catch (error) {
// //     console.error('Error in news analysis:', error);
// //     return null;
// //   }
// // };

// // export function NewsAnalysis() {
// //   const [timeframe, setTimeframe] = useState('24h');
// //   const { data: newsAnalysis, mutate } = useSWR(['newsAnalysis', timeframe], 
// //     () => fetchNewsAnalysis(timeframe), 
// //     { refreshInterval: 300000 } // Refresh every 5 minutes
// //   );

//   // Rest of the component remains the same...

// import React, { useState } from 'react';
// import { BookOpen, RefreshCcw, TrendingUp, AlertTriangle } from 'lucide-react';
// import useSWR from 'swr';
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import axios from 'axios';

// const getNews = async () => {
//   const url = `https://cryptopanic.com/api/free/v1/posts/?auth_token=${import.meta.env.VITE_CRYPTOPANIC_API_KEY}&public=true`;
//   const response = await axios.get(url);
//   return response.data.results;
// };

// const fetchNewsAnalysis = async () => {
//   try {
//     // Get news using your existing function
//     const newsData = await getNews();

//     // Initialize Gemini AI
//     const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });

//     const analysisPrompt = `Analyze these crypto news articles and provide a structured analysis with:
//       1. Key market developments with impact scores (1-10)
//       2. Overall market sentiment (bullish/bearish) with reasoning
//       3. Potential risk factors
      
//       News data: ${JSON.stringify(newsData)}
      
//       Provide the response in this JSON format:
//       {
//         "summaries": [
//           {
//             "title": "News Title",
//             "analysis": "Detailed analysis",
//             "impactScore": number
//           }
//         ],
//         "sentiment": "bullish or bearish",
//         "sentimentAnalysis": "Detailed sentiment explanation",
//         "risks": ["risk1", "risk2", "risk3"]
//       }`;

//     const result = await model.generateContent(analysisPrompt);
//     const response = await result.response;
//     return JSON.parse(response.text());
//   } catch (error) {
//     console.error('Error in news analysis:', error);
//     return null;
//   }
// };

// export function NewsAnalysis() {
//   const [timeframe, setTimeframe] = useState('24h');
//   const { data: newsAnalysis, mutate } = useSWR('newsAnalysis', fetchNewsAnalysis);

//   // Rest of the component remains the same...

//   return (
//     <div className="min-h-screen bg-gray-100 py-12">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">Market Intelligence</h1>
//             <p className="mt-2 text-gray-600">AI-powered news analysis and market insights</p>
//           </div>
//           <div className="flex items-center space-x-4">
//             <select 
//               value={timeframe}
//               onChange={(e) => setTimeframe(e.target.value)}
//               className="px-4 py-2 border rounded-lg"
//             >
//               <option value="24h">Last 24 Hours</option>
//               <option value="7d">Last 7 Days</option>
//               <option value="30d">Last 30 Days</option>
//             </select>
//             <button
//               onClick={() => mutate()}
//               className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//             >
//               <RefreshCcw className="h-4 w-4 mr-2" />
//               Refresh Analysis
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-lg shadow-lg p-6">
//               <h2 className="text-xl font-semibold mb-4">Key Market Developments</h2>
//               <div className="space-y-4">
//                 {newsAnalysis?.summaries?.map((summary, index) => (
//                   <div key={index} className="border-b pb-4">
//                     <h3 className="font-medium text-lg mb-2">{summary.title}</h3>
//                     <p className="text-gray-600">{summary.analysis}</p>
//                     <div className="mt-2 flex items-center text-sm text-gray-500">
//                       <TrendingUp className="h-4 w-4 mr-1" />
//                       <span>Impact Score: {summary.impactScore}/10</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="space-y-6">
//             <div className="bg-white rounded-lg shadow-lg p-6">
//               <h2 className="text-xl font-semibold mb-4">Market Sentiment</h2>
//               <div className="space-y-4">
//                 <div className={`p-4 rounded-lg ${
//                   newsAnalysis?.sentiment === 'bullish' ? 'bg-green-50' : 'bg-red-50'
//                 }`}>
//                   <div className="text-2xl font-bold mb-2">
//                     {newsAnalysis?.sentiment === 'bullish' ? 'Bullish' : 'Bearish'}
//                   </div>
//                   <p className="text-sm text-gray-600">
//                     {newsAnalysis?.sentimentAnalysis}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg shadow-lg p-6">
//               <h2 className="text-xl font-semibold mb-4">Risk Factors</h2>
//               <div className="space-y-3">
//                 {newsAnalysis?.risks?.map((risk, index) => (
//                   <div key={index} className="flex items-start">
//                     <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
//                     <span className="text-gray-600">{risk}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
