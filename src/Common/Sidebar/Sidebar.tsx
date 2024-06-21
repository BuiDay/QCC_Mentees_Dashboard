import React from 'react';
import Logo_QCC from '../../assets/logo_qcc.png'
import DashboardNav from './dashboard-nav';
import { nav } from './nav'
import { AiOutlineLogout } from "react-icons/ai";

const Sidebar = () => {
    return (
        <nav className={`relative hidden h-screen lg:block w-80`}>
            <div className='space-y-4 text-white h-full p-4'>
                <div className='py-2 rounded-3xl h-full flex flex-col justify-between items-center'>
                    <div className='space-y-1 w-full'>
                        <div className='grid items-start gap-10 py-4'>
                            <div className='w-[160px] ml-5'>
                                <img src={Logo_QCC} alt='qcc_logo'></img>
                            </div>
                            <div className='py-5'>
                                <div className='flex flex-col gap-3'>
                                    {/* <div>
                                        <h2>Menu</h2>
                                    </div> */}
                                    <div className='pl-3'>
                                        <DashboardNav items={nav} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='pb-5'>
                        <div className='w-full h-[50px] bg-pink rounded-2xl shadow-xl cursor-pointer px-6'>
                            <div className='flex w-full h-full items-center justify-center gap-2'>
                                <div>
                                    <AiOutlineLogout size={24}/>
                                </div>
                                <span>Đăng xuất</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;