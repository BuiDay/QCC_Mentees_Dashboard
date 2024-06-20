import React from 'react';
import People_Working from '../assets/people_working.png'
import HomeProfile from '../Components/HomePage/HomeProfile';
import RadarChart from '../Components/HomePage/RadarChart';

const Home = () => {
    return (
        <div className='h-full '>
            <div className='p-3'>
                <div className='grid grid-cols-8 h-full gap-4'>
                    <div className='col-span-6 '>
                        <div className=''>
                            <div className='flex flex-col gap-10'>
                                <div className='flex items-center justify-between'>
                                    <h2 className='text-xl font-bold tracking-tight'>Tổng quát</h2>
                                    <span className='text-gray-400'>Ngày 5, tháng 6, năm 2024</span>
                                </div>
                                <div className='w-full bg-pink/10 rounded-2xl shadow-md'>
                                    <div className='p-4 relative'>
                                        <div className='grid grid-rows-2 gap-3'>
                                            <h1 className='text-[20px] font-bold text-pink'>Xin chào, bạn Duy Nhất</h1>
                                            <div className='text-[14px]'>
                                                <p>Bạn đã đi hết <strong>80%</strong> quá trình học</p>
                                                <p>Hãy giữ vững phong độ và phát triển kĩ năng nhé!</p>
                                            </div>
                                        </div>
                                        <div className='w-[250px] absolute bottom-[0px] right-[50px]'>
                                            <img src={People_Working} alt="People_Working" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mt-4'>
                            <h3 className=' font-semibold '>Điểm kỹ năng</h3>
                        </div>
                        <div className='w-full mt-2'>
                            <div className='grid w-full grid-cols-8 gap-4'>
                                <div className='col-span-3 bg-white rounded-2xl shadow-md'>
                                    <RadarChart />
                                </div>
                                <div className='col-span-2 bg-red-200'>
                                    x
                                </div>
                                <div className='col-span-2 bg-red-700'>
                                    x
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-2'>
                        <HomeProfile />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;