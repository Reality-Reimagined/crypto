import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { LineChart, Code2, FileTerminal , Settings, Home, Newspaper, LayoutDashboard, BookOpenCheck } from 'lucide-react';
import { cn } from '../lib/utils';

export function Layout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-16 bg-gray-900 flex flex-col items-center py-4 space-y-4">
        <Link
          to="/"
          className="p-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
        >
          <Home size={24} />
        </Link>
        <Link
          to="/dashboard"
          className="p-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
        >
          <LayoutDashboard size={24} />
        </Link>
        <Link
          to="/trading"
          className="p-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
        >
          <LineChart size={24} />
        </Link>
        <Link
          to="/news"
          className="p-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
        >
          <Newspaper size={24} />
        </Link>
        <Link
          to="/editor"
          className="p-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
        >
          <Code2 size={24} />
        </Link>
        <Link
          to="/featuredScripts"
          className="p-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
        >
          <FileTerminal size={24} /> 
        </Link>
                <Link
          to="/newsanalysis"
          className="p-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
        >
          <BookOpenCheck size={24} /> 
        </Link>
        <div className="flex-1" />
        <button className="p-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
          <Settings size={24} />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}