import React from 'react';
import { FaPlus } from "react-icons/fa6";
import AvatarDefault from '../../assets/avatar.jpg'
import { IoIosPhonePortrait } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import LeaderBoard from './LeaderBoard';
const HomeProfile = () => {

  return (
      <div className='h-full grid grid-rows-5 gap-4'>
        <div className='flex flex-col items-center bg-white p-4 rounded-2xl row-span-2 shadow-md'>
          <div className='relative'>
            <div className='h-[150px] w-[150px] rounded-full border-[3px] overflow-hidden'>
              <div className=''>
                <img src={AvatarDefault} alt="" className='' />
              </div>
            </div>
            <div className='absolute bottom-3 right-3 bg-pink rounded-full'>
              <div className='p-1 cursor-pointer'>
                <FaPlus color='white' />
              </div>
            </div>
          </div>
          <div className='w-full px-5'>
            <div className='text-center'>
              <h1 className='text-[20px] text-pink font-semibold'>Bùi Văn Duy Nhất</h1>
              <p className='text-[12px] text-gray-500'>buivanduynhat@gmail.com</p>
              <div className='w-full h-[1px] bg-pink my-3'></div>
              <div className='flex flex-col mt-3 gap-1'>
                <div className='flex items-center justify-center gap-1'>
                  <span className='text-[14px]'><IoIosPhonePortrait color='#FE568E' size={18}/></span>
                  <span className='text-[14px] text-gray-500'>0933804785</span>
                </div>
                <div className='flex items-center justify-center gap-1'>
                  <span className='text-[14px]'><CiLocationOn color='#FE568E' size={18}/></span>
                  <span className='text-[14px] text-gray-500'>Quận 5, TP HCM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-white rounded-2xl row-span-3 overflow-hidden shadow-md'>
          <LeaderBoard />
        </div>
      </div>
  );
};

export default HomeProfile;