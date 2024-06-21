import React from 'react';
import People_Working from '../assets/people_working.png'
import HomeProfile from '../Components/HomePage/HomeProfile';
import RadarChart from '../Components/HomePage/RadarChart';
import AreaChart from '../Components/HomePage/AreaChart';
import { MdOutlineDesignServices } from "react-icons/md";
import { VscFeedback } from "react-icons/vsc";
import CollectionReward from '../Components/HomePage/Reaward/CollectionReward';
import { FaBell } from "react-icons/fa6";
import RadialChart from '../Components/HomePage/RadialChart';

const Home = () => {
    return (
        <div className='h-full p-3'>
            <div className='grid grid-cols-8 h-full gap-4'>
                <div className='col-span-6 '>
                    <div className='w-full h-full grid grid-rows-8 gap-4'>
                        <div className='row-span-3'>
                            <div className='flex flex-col gap-5 h-full'>
                                <div className='flex items-center justify-between'>
                                    <h2 className='text-[24px] font-bold tracking-tight'></h2>
                                    <div className='flex items-center gap-5'>
                                        <span className='text-white'>Ngày 5, tháng 6, năm 2024</span>
                                        <div className='relative'>
                                            <FaBell color='white' size={28} />
                                            <div className='w-[25px] h-[25px] absolute bg-red-500 top-[-10px] right-[-10px] rounded-full flex items-center justify-center'>
                                                <span className='text-white ]'>1</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full h-full bg-white rounded-2xl shadow-md'>
                                    <div className='p-[40px] relative h-full flex justify-around items-center'>
                                        <div className='grid grid-rows-2 gap-3'>
                                            <h1 className='text-[28px] font-bold text-pink'>Xin chào, bạn Duy Nhất</h1>
                                            <div className='text-[18px] text-black'>
                                                <p>Bạn đã đi hết <strong>80%</strong> quá trình học</p>
                                                <p>Hãy giữ vững phong độ và phát triển kĩ năng nhé!</p>
                                            </div>
                                        </div>
                                        <div className=''>
                                            <div className='h-[150px] w-[150px] bg-red-600 flex items-center justify-center rounded-full overflow-hidden'>
                                                <div className='h-[145px] w-[145px] bg-white rounded-full flex items-center justify-center'>
                                                    <p className='text-[32px] font-bold text-green-400'>4</p>
                                                </div>
                                            </div>
                                            {/* <RadialChart /> */}
                                          
                                        </div>
                                        {/* <div className='max-w-[320px] absolute bottom-[0px] right-[50px]'>
                                            <img src={People_Working} alt="People_Working" />
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row-span-5'>
                            <div className='grid grid-rows-8 gap-4 h-full'>
                                <div className='row-span-4 flex flex-col'>
                                    <div>
                                        <h1 className='font-bold text-white'>Top skills</h1>
                                    </div>
                                    <div className='w-full h-full'>
                                        <div className='grid w-full h-full grid-cols-8 gap-4'>
                                            <div className='col-span-2'>
                                                <div className='h-full flex flex-col justify-end relative'>
                                                    <div className='max-w-[60px] max-h-[60px] w-full h-full rounded-2xl absolute top-0 left-0 right-0 m-auto top-skill-bg-3 shadow-primary z-10'>
                                                        <div className='w-full h-full flex items-center justify-center'>
                                                            <MdOutlineDesignServices color='white' size={34} />
                                                        </div>

                                                    </div>
                                                    <div className='rounded-3xl bg-white/[0.07]  h-[85%] w-full shadow-primary'>
                                                        <div className='w-full h-full flex flex-col items-center justify-center'>
                                                            <h3 className='font-semibold text-white'>Tư duy thiết kế</h3>
                                                            <h2 className='text-[34px] font-bold text-white'>4.5</h2>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-span-2'>
                                                <div className='h-full flex flex-col justify-end relative'>
                                                    <div className='max-w-[60px] max-h-[60px] w-full h-full rounded-2xl absolute top-0 left-0 right-0 m-auto top-skill-bg-2 shadow-primary z-10'>
                                                        <div className='w-full h-full flex items-center justify-center'>
                                                            <VscFeedback color='white' size={34} />
                                                        </div>

                                                    </div>
                                                    <div className='rounded-3xl bg-white/[0.07]  h-[85%] w-full shadow-primary'>
                                                        <div className='w-full h-full flex flex-col items-center justify-center'>
                                                            <h3 className='font-semibold text-white'>Tư duy thiết kế</h3>
                                                            <h2 className='text-[34px] font-bold text-white'>4.5</h2>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-span-2'>
                                                <div className='h-full flex flex-col justify-end relative'>
                                                    <div className='max-w-[60px] max-h-[60px] w-full h-full rounded-2xl absolute top-0 left-0 right-0 m-auto top-skill-bg-3 shadow-primary z-10'>
                                                        <div className='w-full h-full flex items-center justify-center'>
                                                            <MdOutlineDesignServices color='white' size={34} />
                                                        </div>

                                                    </div>
                                                    <div className='rounded-3xl bg-white/[0.07] h-[85%] w-full shadow-primary'>
                                                        <div className='w-full h-full flex flex-col items-center justify-center'>
                                                            <h3 className='font-semibold text-white'>Tư duy thiết kế</h3>
                                                            <h2 className='text-[34px] font-bold text-white'>4.5</h2>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-span-2'>
                                                <div className='h-full flex flex-col justify-end relative'>
                                                    <div className='max-w-[60px] max-h-[60px] w-full h-full rounded-2xl absolute top-0 left-0 right-0 m-auto top-skill-bg-2 shadow-primary z-10'>
                                                        <div className='w-full h-full flex items-center justify-center'>
                                                            <MdOutlineDesignServices color='white' size={34} />
                                                        </div>

                                                    </div>
                                                    <div className='rounded-3xl bg-white/[0.07] h-[85%] w-full shadow-primary'>
                                                        <div className='w-full h-full flex flex-col items-center justify-center'>
                                                            <h3 className='font-semibold text-white'>Tư duy thiết kế</h3>
                                                            <h2 className='text-[34px] font-bold text-white'>4.5</h2>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='row-span-4'>
                                    <div className='w-full h-full'>
                                        <div className='grid w-full h-full grid-cols-8 gap-4'>
                                            <div className='col-span-4 bg-white/[0.07]  rounded-2xl shadow-primary w-full p-4'>
                                                <div className=''>
                                                    <h3 className=' font-semibold text-white '>Điểm từng project</h3>
                                                </div>
                                                <AreaChart />
                                            </div>
                                            <div className='col-span-4 bg-white/[0.07] rounded-2xl shadow-primary w-full p-4 flex flex-col'>
                                                <div className=''>
                                                    <h3 className=' font-semibold text-white  '>Bộ sưu tập</h3>
                                                </div>
                                                <CollectionReward />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
                <div className='col-span-2'>
                    <HomeProfile />
                </div>
            </div>

        </div>
    );
};

export default Home;