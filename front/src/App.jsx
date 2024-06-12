import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';

import MyBoard from './components/MyBoard/MyBoard';
import Toolbar from './components/Toolbar/Toolbar';
import Scene from './pages/Scene/Scene';
import HomePage from './pages/HomeScene/HomeScene';
import LoginPage from './pages/LoginScene/LoginScene';
import SignUpPage from './pages/SignUpScene/SignUpScene';
import RootPage from './pages/RootPage/RootPage';
import axios from './axios/axios';

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<RootPage />}>
      <Route index element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignUpPage />} />
      <Route element={<Scene />} />
    </Route>
  ));

  const testApi = async () => {
    const result = await axios.post("/user/register", {
      login: "alex",
      password: "pass",
      email: "alexdziunyk@gmail.com"
    });

    console.log(result);

  }

  const login = async () => {
    const result = await axios.post("/user/login", {
      login: "alex",
      password: "pass",
    });

    console.log(result);

  }

  useEffect(() => {
    login()
  }, []);

  return (
    <div className='app'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App


