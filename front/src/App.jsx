import './App.css';
import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, useNavigate } from 'react-router-dom';

import Scene from './pages/Scene/Scene';
import HomePage from './pages/HomeScene/HomeScene';
import LoginPage from './pages/LoginScene/LoginScene';
import SignUpPage from './pages/SignUpScene/SignUpScene';
import RootPage from './pages/RootPage/RootPage';
import ProjectsPage from './pages/ProjectsScene/ProjectsScene';

import { AuthProvider } from './context/AuthContext';
import { ProjectsProvider } from './context/ProjectsContext';

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<RootPage />}>
      <Route index element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignUpPage />} />
      <Route path='profile' element={<ProjectsPage />} />
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


