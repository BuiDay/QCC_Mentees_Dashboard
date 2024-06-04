import React from 'react';
import Header from './Common/Header/Header';
import { Outlet } from 'react-router-dom'
import SidebarProfile from './Common/SidebarProfile/SidebarProfile';

const Layout = () => {
    return (
        <div className='min-h-screen h-full'>
            <Header />
            <div className='flex h-screen overflow-hidden z-4 flex-row-reverse'>
              <SidebarProfile />  
              <main className='w-full pt-16 bg-pri'>
                <Outlet />
              </main>
            </div>
          </div>
    );
};

export default Layout;