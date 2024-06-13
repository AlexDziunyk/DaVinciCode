import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import './style.scss';

const RootPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate('/projects');
    } else {
      navigate('/');
    }

  }, []);

  return (
    <div>
      <Navbar />
      <div className='root__outlet'>
        <Outlet />
      </div>
    </div>
  )
}

export default RootPage