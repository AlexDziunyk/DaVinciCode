import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider, useNavigate } from 'react-router-dom';

import MyBoard from './components/MyBoard/MyBoard';
import Toolbar from './components/Toolbar/Toolbar';
import Scene from './pages/Scene/Scene';
import HomePage from './pages/HomeScene/HomeScene';
import LoginPage from './pages/LoginScene/LoginScene';
import SignUpPage from './pages/SignUpScene/SignUpScene';
import RootPage from './pages/RootPage/RootPage';
import ProfilePage from './pages/ProfileScene/ProfileScene';
import ProjectsPage from './pages/ProjectsScene/ProjectsScene';

import { AuthProvider } from './context/AuthContext';
import axios from './axios/axios';
import GoogleCallback from './config/GoogleCallback';
import { ProjectsProvider } from './context/ProjectsContext';

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<RootPage />}>
      <Route index element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignUpPage />} />
      {/* <Route path="auth/google/callback" component={GoogleCallback} /> */}
      {/* <Route path='scene' element={<Scene />} /> */}
      <Route path='profile' element={<ProfilePage />} />
      <Route path='profile/projects' element={<ProjectsPage />} />
      <Route path='projects/:id' element={<Scene />} />
    </Route>
  ));


  return (
    <div className='app'>
      <AuthProvider>
        <ProjectsProvider>
          <RouterProvider router={router} />
        </ProjectsProvider>
      </AuthProvider>
    </div>
  );
}

export default App


