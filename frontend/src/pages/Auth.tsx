import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { IoPersonOutline } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Logo from '../assets/logo_qcc.png'
import { BsPersonLock } from "react-icons/bs";
import { IoKeyOutline } from "react-icons/io5";
import Login from '../Components/Auth/Login';
import Forgot from '../Components/Auth/Forgot';

const Auth = () => {

    const [routeAuth, setRouteAuth] = useState("Login")

    return (
        <div className='min-h-screen w-full flex justify-center items-center'>
            <div className='max-w-[400px] h-full w-full m-auto'>
                <div className='w-[200px] m-auto'>
                    <img src={Logo} alt="" />
                </div>
                <div className='w-full mt-10 relative '>
                    {/* <div className='w-[100px] h-[100px] m-auto bg-primary border border-white rounded-full z-30'>
                        <div className='h-full w-full flex justify-center items-center'>
                            {
                                routeAuth === "Login" && <BsPersonLock color='white' size={44} />
                            }
                            {
                                routeAuth === "Forgot" && <IoKeyOutline color='white' size={44} />
                            }
                        </div>
                    </div> */}
                    {/* <div className=' w-full h-[1px] bg-white absolute top-0 bottom-0 my-auto z-10'>
                    </div> */}
                </div>
                {
                    routeAuth === "Login" && <Login setRouteAuth={setRouteAuth} />
                }
                {
                    routeAuth === "Forgot" && <Forgot setRouteAuth={setRouteAuth} />
                }
            </div>
        </div>
    );
};

export default Auth;