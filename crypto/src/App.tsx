import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Trading } from './pages/Trading';
import { PineEditor } from './components/PineEditor';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="trading" element={<Trading />} />
          <Route path="editor" element={<PineEditor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;