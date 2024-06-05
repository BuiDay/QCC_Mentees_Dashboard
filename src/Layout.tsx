import React from 'react';
import Header from './Common/Header/Header';
import { Outlet } from 'react-router-dom'
import SidebarProfile from './Components/HomePage/HomeProfile';
import Sidebar from './Common/Sidebar/Sidebar';

const Layout = () => {
    return (
        <div className='min-h-screen h-full'>
            <Header />
            <div className='flex h-screen overflow-hidden z-4'>
              {/* <SidebarProfile />   */}
              <Sidebar />
              <main className='w-full p-4 h-full bg-second'>
                <Outlet />
              </main>
            </div>
          </div>
    );
};

export default Layout;