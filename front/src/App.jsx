import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MyBoard from './components/MyBoard/MyBoard';
import Toolbar from './components/Toolbar/Toolbar';
import Scene from './pages/Scene/Scene';
import HomePage from './pages/HomeScene/HomeScene';
import LoginPage from './pages/LoginScene/LoginScene';
import SignUpPage from './pages/SignUpScene/SignUpScene';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/scene" element={<Scene />} />
      </Routes>
    </Router>
  );
}

export default App


