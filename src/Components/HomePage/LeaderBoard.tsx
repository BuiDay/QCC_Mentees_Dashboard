import React from 'react';
import ItemLeaderboard from './ItemLeaderboard';
import Top3 from '../../assets/top-3.png'
import Crown from '../../assets/crown.png'

const LeaderBoard = () => {
    return (
        <div className='w-full h-full bg-primary'>
            <div className='h-full'>
                <div className='grid grid-rows-2 h-full'>
                    <div className='row-span-1 relative'>
                        <h3 className='text-center text-white font-semibold pt-2'>Leaderboard</h3>
                        <div className='w-full mt-4'>
                            <div className='grid grid-cols-3 text-white'>
                                <div className='col-span-1 text-center'>
                                    <div className='w-[70px] h-[70px] border rounded-full m-auto mt-3'>

                                    </div>
                                    <p>4.8</p>
                                    <p className='text-[14px]'>Thị Nững</p>
                                </div>
                                <div className='col-span-1 text-center relative'>
                                    <div className='w-[90px] h-[90px] border rounded-full  m-auto'>

                                    </div>
                                    <div className='absolute w-[40px] top-[-20px] left-0 mx-auto right-0'>
                                        <img src={Crown} alt="" />
                                    </div>
                                    <p>5</p>
                                    <p className='text-[14px]'>Thị Quỳnh</p>
                                </div>
                                <div className='col-span-1 text-center'>
                                    <div className='w-[60px] h-[60px] border rounded-full m-auto mt-5'>

                                    </div>
                                    <p>4.7</p>
                                    <p className='text-[14px]'>Thị Mẹt</p>
                                </div>
                            </div>
                        </div>
                        <div className='absolute bottom-0 w-[95%] left-0 right-0 mx-auto'>
                            <img src={Top3} alt="" className='' />
                        </div>
                    </div>
                    <div className='row-span-1'>
                        <div className='w-full h-full bg-white rounded-t-xl'>
                            <div className=''>
                                <div className='flex flex-col'>
                                    <ItemLeaderboard />
                                    <ItemLeaderboard />
                                    <ItemLeaderboard />
                                    <ItemLeaderboard active={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeaderBoard;