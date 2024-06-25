import React from 'react';
import Avatar from '../../assets/9.png'
import { FaCheck } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
const ItemCourse = () => {

    const navigate = useNavigate()

    return (
        <div className='w-[350px] cursor-pointer' onClick={() => navigate('/courses/1')}>
            <div className='bg-white w-full h-full rounded-3xl shadow-primary'>
                <div className='flex flex-col p-4 gap-5'>
                    <h3 className='font-semibold text-pink'>Social Marketing Starter K10</h3>
                    <div>
                        <div className='flex items-center gap-2'>
                            <div className='w-[40px]'>
                                <img src={Avatar} alt="" />
                            </div>
                            <h3 className='font-medium'>Xuân Quỳnh</h3>
                        </div>
                        <div className='mt-2'>
                            <div className='flex flex-col justify-between'>
                                <div className='text-[14px]'> <strong>Số buổi học:</strong> <span className='text-green-500 font-semibold'>12</span></div>
                                <div className='text-[14px]'> <strong> Project đã làm:</strong> <span className='text-green-500 font-semibold'>6/6</span></div>
                                <div className='text-[14px]'> <strong> Thời gian kết thúc:</strong> <span className='text-red-500 font-semibold'>04/05/2024</span></div>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <div className='flex items-center justify-end gap-1'>
                                <FaCheck color='green' />
                                Đã hoàn thành
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemCourse;