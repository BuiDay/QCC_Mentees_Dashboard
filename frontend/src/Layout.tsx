import React from "react";
import Header from "./Common/Header/Header";
import { Outlet } from "react-router-dom";
import Sidebar from "./Common/Sidebar/Sidebar";

const Layout = () => {
  return (
    <div className="min-h-screen h-full">
      <Header />
      <div className="flex h-screen overflow-hidden z-4">
        {/* <SidebarProfile />   */}
        <Sidebar />
        <main className="w-full h-full">
          <div className="bg-s w-full h-full rounded-[50px] p-3">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
