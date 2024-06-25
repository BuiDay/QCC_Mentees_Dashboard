import { Button } from '@mui/material';
import React from 'react';
import { BsFileEarmarkText } from "react-icons/bs";
import { LuClock3 } from "react-icons/lu";
import Countdown from 'react-countdown';
import { IoIosAttach } from "react-icons/io";

const ItemAssginment = () => {
    const renderer = ({ hours, minutes, seconds, completed }:any) => {
        if (completed) {
          // Render a completed state
          return 
        } else {
          // Render a countdown
          return <span>Còn {hours} giờ : {minutes} phút : {seconds}</span>;
        }
      };
    return (
        <div className='w-full'>
            <div className='bg-white w-full h-full rounded-3xl shadow-primary'>
                <div className='flex flex-col p-4 gap-3'>
                    <h3 className='font-semibold text-pink'>Social Marketing Starter K10</h3>
                    <div className=''>
                        <div className='flex w-full justify-around'>
                            <div className='flex items-center gap-1'>
                                <BsFileEarmarkText />
                                <span>Project 1</span>
                            </div>
                            <div className='flex items-center gap-1'>
                                <LuClock3 />
                                <span>01/07/2024</span>
                            </div>
                        </div>
                        <div className='text-[14px] mt-3'>
                            <p className='font-bold'>Mô tả:</p>
                            <p className='text-justify'>Thực hành viết script cho 1 short video hay TVC thực tế, ứng dụng vẽ moodboard và demo thành phẩm</p>
                        </div>
                        <div className='flex items-center mt-3 gap-1 w-fit hover:underline cursor-pointer'>
                            <IoIosAttach color=''/>
                            <span className='text-[14px'>Đính kèm file</span>
                        </div>
                        <div className='mt-5'>
                            <div className='flex items-center justify-end gap-5'>
                                <Countdown date={Date.now() + 100000000} renderer={renderer}></Countdown>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ backgroundColor: "#FE568E", borderRadius: "30px" }}
                                >
                                    Nộp bài
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemAssginment;