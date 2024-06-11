import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';

import MyBoard from './components/MyBoard/MyBoard';
import Toolbar from './components/Toolbar/Toolbar';
import Scene from './pages/Scene/Scene';
import HomePage from './pages/HomeScene/HomeScene';
import LoginPage from './pages/LoginScene/LoginScene';
import SignUpPage from './pages/SignUpScene/SignUpScene';
import RootPage from './pages/RootPage/RootPage';

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<RootPage />}>
      <Route index element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignUpPage />} />
      <Route path="scene" element={<Scene />} />
    </Route>
  ))

  return (
    <div className='app'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App


