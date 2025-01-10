import React, { useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { getNews } from '../lib/api';
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

interface ArticleContent {
  id: string;
  content: string;
  loading: boolean;
  error?: string;
}

export function News() {
  const [filter, setFilter] = useState('important');
  const [expandedArticles, setExpandedArticles] = useState<Set<string>>(new Set());
  const [articleContents, setArticleContents] = useState<{ [key: string]: ArticleContent }>({});
  const { data: news, error } = useSWR('cryptoNews', () => getNews());

  const filters = [
    { value: 'important', label: 'Important' },
    { value: 'hot', label: 'Trending' },
    { value: 'saved', label: 'Saved' }
  ];

  const fetchArticleContent = async (id: string, url: string) => {
    if (articleContents[id]?.content) return;

    setArticleContents(prev => ({
      ...prev,
      [id]: { id, content: '', loading: true }
    }));

    try {
      const response = await axios.get(url);
      const parser = new DOMParser();
      const doc = parser.parseFromString(response.data, 'text/html');
      
      // Try to find the main article content
      const article = doc.querySelector('article') || 
                     doc.querySelector('.article-content') || 
                     doc.querySelector('.post-content') ||
                     doc.querySelector('main');
                     
      let content = article ? article.textContent || '' : '';
      
      // Clean up the content
      content = content
        .replace(/\s+/g, ' ')
        .trim();

      setArticleContents(prev => ({
        ...prev,
        [id]: { id, content, loading: false }
      }));
    } catch (err) {
      setArticleContents(prev => ({
        ...prev,
        [id]: { 
          id, 
          content: '', 
          loading: false, 
          error: 'Failed to load article content. Click the external link to read the full article.'
        }
      }));
    }
  };

  const toggleArticle = async (id: string, url: string) => {
    const willExpand = !expandedArticles.has(id);
    
    setExpandedArticles(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });

    if (willExpand) {
      fetchArticleContent(id, url);
    }
  };

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
        {news.map(item => {
          const isExpanded = expandedArticles.has(item.id);
          const articleContent = articleContents[item.id];
          
          return (
            <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div 
                className="p-6 cursor-pointer hover:bg-gray-50"
                onClick={() => toggleArticle(item.id, item.url)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 pr-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      )}
                    </div>
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
                    className="flex items-center text-blue-600 hover:text-blue-700 ml-4"
                    onClick={e => e.stopPropagation()}
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
              
              {isExpanded && (
                <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                  {articleContent?.loading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  ) : articleContent?.error ? (
                    <p className="text-red-500">{articleContent.error}</p>
                  ) : articleContent?.content ? (
                    <div className="prose max-w-none">
                      <p className="text-gray-700 whitespace-pre-line">{articleContent.content}</p>
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">Loading article content...</p>
                  )}
                  
                  {item.currencies && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {item.currencies.map(currency => (
                        <span 
                          key={currency.code} 
                          className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                        >
                          {currency.title}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}