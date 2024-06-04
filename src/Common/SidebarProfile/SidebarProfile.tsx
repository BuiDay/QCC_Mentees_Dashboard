import React from 'react';
import { FaPlus } from "react-icons/fa6";
import ApexCharts from 'react-apexcharts'

const SidebarProfile = () => {
    const series = [{
        name: 'Series 1',
        data: [80, 50, 30, 40, 100, 20],
      }]

      const options = {
        chart: {
          height: 350,
          type: 'radar',
          toolbar:false
        },
        markers: {
            size: 5,
            hover: {
              size: 10
            }
          },
          fill: {
            opacity: 0.5,
            colors: []
          },
        yaxis: {
          stepSize: 20
        },
        xaxis: {
          categories: ['January', 'February', 'March', 'April', 'May', 'June']
        }
      }
    return (
        <nav className={`relative hidden h-screen border-l border-zinc-300 pt-[30px] lg:block w-4/12`}>
            <div className='space-y-4 py-4 text-gray-500'>
                <div className='px-3 py-2'>
                    <div className='space-y-1'>
                        <div className='grid items-start gap-2'>
                            <div className='flex flex-col items-center gap-4'>
                                <div className='h-[150px] w-[150px] rounded-full border-[3px] relative'>
                                    <div>

                                    </div>
                                    <div className='absolute bottom-2 right-2 bg-red-500 rounded-full'>
                                        <div className='p-1 cursor-pointer'>
                                            <FaPlus color='white' />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className='text-center'>
                                        <h1 className='text-[20px] text-black font-semibold'>Bùi Văn Duy Nhất</h1>
                                        <p className='text-[14px]'>Social Marketing Starter</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <ApexCharts options={options} series={series} type="radar" height={300} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default SidebarProfile;