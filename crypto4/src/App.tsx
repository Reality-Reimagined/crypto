import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Trading } from './pages/Trading';
import { News } from './pages/News';
import { PineEditor } from './components/PineEditor';
import { FeaturedScripts } from './components/FeaturedScripts'
import { NewsAnalysis } from './pages/NewsAnalysis'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="trading" element={<Trading />} />
          <Route path="news" element={<News />} />
          <Route path="editor" element={<PineEditor />} />
          <Route path="featuredScripts" element={<FeaturedScripts />} />
          <Route path="newsanalysis" element={<NewsAnalysis />} />          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;