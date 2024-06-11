import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import './style.scss';

const RootPage = () => {
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