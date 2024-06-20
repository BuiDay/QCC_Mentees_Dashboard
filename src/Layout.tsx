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
              <main className='w-full h-full'>
                <div className='bg-white w-full h-full rounded-tl-[40px] rounded-bl-[40px]'>
                  <Outlet />
                </div>
              </main>
            </div>
          </div>
    );
};

export default Layout;