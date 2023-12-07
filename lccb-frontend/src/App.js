import React from 'react';
import NavBar from './components/NavBar';
import RecipePage from './components/RecipePage';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to="/recipes" replace />} />
          <Route path="/recipes" element={<RecipePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
