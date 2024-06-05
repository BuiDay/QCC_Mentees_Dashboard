import React from 'react';
import Logo_QCC from '../../assets/logo_qcc.png'
import DashboardNav from './dashboard-nav';
import { nav } from './nav'
import { AiOutlineLogout } from "react-icons/ai";

const Sidebar = () => {
    return (
        <nav className={`relative hidden h-screen lg:block w-72 bg-second`}>
            <div className='space-y-4 text-white h-full p-4'>
                <div className='px-3 py-2 bg-primary h-full rounded-2xl flex flex-col justify-between'>
                    <div className='space-y-1'>
                        <div className='grid items-start gap-10 py-4'>
                            <div className='w-[140px] m-auto'>
                                <img src={Logo_QCC} alt='qcc_logo'></img>
                            </div>
                            <div className='py-5'>
                                <div className='flex flex-col gap-3'>
                                    {/* <div>
                                        <h2>Menu</h2>
                                    </div> */}
                                    <div className=''>
                                        <DashboardNav items={nav} />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='pb-5'>
                        <div className='w-full h-[50px] bg-pink rounded-2xl cursor-pointer'>
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