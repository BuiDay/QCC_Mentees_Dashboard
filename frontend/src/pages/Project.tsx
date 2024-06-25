import React from 'react';
import Grid from '@mui/material/Grid';
import ItemAssginment from '../Components/Projects/ItemAssginment';

const Project = () => {
    return (
        <div className='h-full w-full'>
            <div className='p-4 h-full flex flex-col'>
                <div className=''>
                    <div className='flex flex-col gap-2 py-5'>
                        <h1 className='text-white text-[18px]'> <strong>Xin chào,</strong> Nhất bùi</h1>
                        <p className='text-white text-[12px]'>Chúc bạn một ngày tốt lành!</p>
                    </div>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={12} spacing={4}>
                            <div className='mt-5 w-full'>
                                <h2 className='font-bold text-white text-[20px]'>Nộp dự án</h2>
                                <Grid container spacing={4} marginTop={1}>
                                    <Grid item sm={4}>
                                        <ItemAssginment />
                                    </Grid>
                                    <Grid item sm={4} >
                                        <ItemAssginment />
                                    </Grid>
                                    <Grid item sm={4}>
                                        <ItemAssginment />
                                    </Grid>
                                    <Grid item sm={4}>
                                        <ItemAssginment />
                                    </Grid>
                                    <Grid item sm={4}>
                                        <ItemAssginment />
                                    </Grid>
                                    <Grid item sm={4}>
                                        <ItemAssginment />
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div >
    );
};

export default Project;