import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { IoPersonOutline } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

interface Props{
    setRouteAuth?:any
}

const Forgot:React.FC<Props> = ({setRouteAuth}) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    const handleRoute = () => {
        setRouteAuth("Login")
    }

    return (
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{
            mt: 5,
            "& .MuiInputBase-input":
            {
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                // backgroundColor:"white",
                // borderRadius: "10px",
                color: "white",
            },
            "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
            },
            "& .MuiInputBase-input::placeholder": {
                color: "white",
            },
            '& legend': { display: 'none' },
            '& .MuiInputLabel-root': {
                display: 'none'
            },
        }}>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={12}>
                    <div className='flex items-center border border-white rounded-xl overflow-hidden'>
                        <div className='p-4'>
                            <CiLock color="white" size={24} />
                        </div>
                        <TextField
                            name="email"
                            required
                            fullWidth
                            id="firstName"
                            label="email"
                            focused
                            placeholder='Nhập email'
                        />
                    </div>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <div className='text-right '>
                        <a className='text-white' href='#' onClick={()=>handleRoute()}>Đăng nhập</a>
                    </div>
                </Grid>
            </Grid>

            <div className='w-full h-[1px] bg-white mt-5'>

            </div>

            <div className='w-full text-center'>
                <Button
                    type="submit"
                    variant="contained"
                    className=''
                    sx={{ mt: 6, mb: 2, backgroundColor: "#FE568E" }}
                >
                    Xác nhận
                </Button>
            </div>
        </Box>
    );
};

export default Forgot;