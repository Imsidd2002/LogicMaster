import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PuzzleView from './pages/PuzzleView';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-neo-yellow text-neo-black font-sans selection:bg-neo-pink selection:text-white pb-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/puzzle/:id" element={<PuzzleView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
