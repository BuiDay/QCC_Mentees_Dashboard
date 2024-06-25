import { Grid, MenuItem, TextField } from '@mui/material';
import React from 'react';
import RadarChart from '../Components/Evaluation/RadarChart';

const Evaluation = () => {
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
                                <h2 className='font-bold text-white text-[24px]'>Social Marketing Starter K10</h2>
                                <h2 className='font-bol text-white text-[18px] mt-2'>Nhận xét và đánh giá của mentor theo từng dự án</h2>
                                <Grid container spacing={4} marginTop={1}>
                                    <Grid item xs={12} sm={12} spacing={4}>
                                        <div className='text-white'>
                                            <div className='text-right pr-[100px]'>
                                                <select name="Project" id="" className='text-black p-2 rounded-md '>
                                                    <option value="1">Project 1</option>
                                                    <option value="2">Project 2</option>
                                                </select>
                                            </div>
                                            <div className=''>
                                                <h1 className='text-center font-bold text-[20px]'>Chủ đề: Moodboard Guidelines</h1>
                                            </div>
                                        </div>
                                    </Grid>

                                    <Grid item sm={5}>
                                        <div className='w-full'>
                                            <RadarChart />
                                            <p className='text-center text-white text-[18px]'>Điểm trung bình: <span className='text-green-500'>3.3</span></p>
                                        </div>
                                    </Grid>
                                    <Grid item sm={7} >
                                        <div className='px-4 text-white'>
                                            <p className='font-bold'>   Nhận xét của Mentor:</p>
<p className='text-justify mt-4'> Task này về phần Plan bạn có đưa ra được nhưng tâm lý và hành vi khá cơ bản, chưa đánh sâu vào tệp Khách Hàng của thương hiệu, ví dụ như phần tâm lý: "Khách Hàng có sự quan tâm, yêu thích đặc biệt với các sản phẩm Samsung", cũng như là bạn chưa nêu ra, chưa phân tích cụ thể tâm lý và hành vi của Khách Hàng trong chiến dịch này là như thế nào.



Về Project booking KOL/KOC bạn chọn làm kêu gọi tham gia challenge nhưng về phía Timeline và idea triển khai chưa được đặc sắc lắm.



Và Proposal của Task này bạn làm cũng nằm ở mức trung bình, không có tính creative cao như Project trước bạn đã làm.</p>
                                           
                                        </div>
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

export default Evaluation;