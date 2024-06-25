import React from 'react';
import Grid from '@mui/material/Grid';
import ItemCourse from '../Components/Courses/ItemCourse';
import Avatar from '../assets/9.png'
import LinearProgress, { LinearProgressProps,linearProgressClasses } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const Course = () => {
    const [progress, setProgress] = React.useState(69);

    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 10,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
          },
          [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: theme.palette.mode === 'light' ? '#FE568E' : '#308fe8',
          },
      }));

    function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                    <BorderLinearProgress variant="determinate" {...props} />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body2" color="#FE568E">{`${Math.round(
                        props.value,
                    )}%`}</Typography>
                </Box>
            </Box>
        );
    }

    return (
        <div className='h-full w-full'>
            <div className='p-4 h-full flex flex-col'>
                <div className=''>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={12}>
                            <Grid item direction="row" spacing={4}>
                                <div className='flex flex-col gap-2 py-5'>
                                    <h1 className='text-white text-[18px]'> <strong>Xin chào,</strong> Nhất bùi</h1>
                                    <p className='text-white text-[12px]'>Chúc bạn một ngày tốt lành!</p>
                                </div>
                                <div className='mt-5 w-full'>
                                    <h2 className='font-bold text-white'>Các khóa học của bạn</h2>
                                    <div className='flex items-center w-full p-5'>
                                        <div className='flex gap-5 mt-5'>
                                            <ItemCourse />
                                            <div className='w-[350px]'>
                                                <div className='bg-white w-full h-full rounded-3xl shadow-primary'>
                                                    <div className='flex flex-col p-4 gap-5'>
                                                        <h3 className='font-semibold text-pink'>Content Foundation K10</h3>
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
                                                                    <div className='text-[14px]'> <strong> Project đã làm:</strong> <span className='text-red-500 font-semibold'>1</span><span className='text-green-500 font-semibold'>/3</span></div>
                                                                    <div className='text-[14px]'> <strong> Thời gian kết thúc:</strong> <span className='text-red-500 font-semibold'>04/05/2024</span></div>
                                                                </div>
                                                            </div>
                                                            <Box sx={{ width: '100%' }} marginTop={1}>
                                                                <LinearProgressWithLabel value={progress} />
                                                            </Box>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>

                    </Grid>
                </div>
            </div>
        </div>
    );
};

export default Course;