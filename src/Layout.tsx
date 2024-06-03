import React from 'react';
import Header from './Common/Header/Header';
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <div className='min-h-screen h-full'>
            <Header />
            <div className='flex h-screen overflow-hidden z-4'>
              <main className='w-full pt-16 bg-pri'>
                <Outlet />
              </main>
            </div>
          </div>
    );
};

export default Layout;