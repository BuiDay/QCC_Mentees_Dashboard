import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { IoPersonOutline } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useLoginMutation } from '../../redux/features/auth/authApi';
import { useNavigate } from 'react-router-dom';

interface Props {
    setRouteAuth?: any
}

const Login: React.FC<Props> = ({ setRouteAuth }) => {
    const [login, { isError, isSuccess, isLoading, error }] = useLoginMutation()
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        })
        await login({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    const handleRoute = () => {
        setRouteAuth("Forgot")
    }

    useEffect(() => {
        if (isError) {
            const err = error as any
            const message = err.data?.message || 'An error occured'
            setErrorMessage(message)
        }
        if (isSuccess) {
            navigate('/dashboard')
        }
    }, [isSuccess, isError])


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
                            <IoPersonOutline color="white" size={24} />
                        </div>
                        <TextField
                            name="email"
                            required
                            fullWidth
                            id="firstName"
                            label="Email"
                            focused
                            placeholder='Nhập email'
                        />
                    </div>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <div className='flex items-center border border-white rounded-xl overflow-hidden'>
                        <div className='p-4'>
                            <CiLock color="white" size={24} />
                        </div>
                        <TextField
                            name="password"
                            required
                            fullWidth
                            id="firstName"
                            label="password"
                            focused
                            placeholder='Nhập password'
                        />
                    </div>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <div className='text-right '>
                        <a className='text-white' href='#' onClick={() => handleRoute()}>Quên mật khẩu?</a>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <div className='text-center'>
                        <h2 className='text-red-500 transition-opacity'>{errorMessage}</h2>
                    </div>
                </Grid>
            </Grid>
            <div className='w-full h-[1px] bg-white mt-5'></div>
            <div className='w-full text-center'>
                <Button
                    type="submit"
                    variant="contained"
                    className=''
                    sx={{ mt: 6, mb: 2, backgroundColor: "#FE568E" }}
                >
                    Đăng nhập
                </Button>
            </div>
        </Box>
    );
};

export default Login;