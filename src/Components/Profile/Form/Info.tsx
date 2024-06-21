
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

import MenuItem from '@mui/material/MenuItem';

const currencies = [
    {
        value: 'Nam',
        label: 'Nam',
    },
    {
        value: 'Nữ',
        label: 'Nữ',
    },
];

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

export default function Info() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{
            mt: 3,
            "& .MuiInputBase-input":
            {
                
                backgroundColor:"white",
                borderRadius:"10px",
            },
            "& .MuiOutlinedInput-notchedOutline":{
                border:"none",
            }

        }}>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={8}>
                    <TextField
                        name="Họ và tên"
                        required
                        fullWidth
                        id="firstName"
                        label="Họ và tên"

                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        style={{ width: "100%" }}
                        id="outlined-select-currency"
                        select
                        label="Giới tính"
                    >
                        {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="Năm sinh"
                        required
                        fullWidth
                        id="firstName"
                        label="Năm sinh"

                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        style={{ width: "100%" }}
                        id="outlined-select-currency"
                        fullWidth
                        label="Số điện thoại"
                    >
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="Năm sinh"
                        required
                        fullWidth
                        id="firstName"
                        label="Email"

                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        style={{ width: "100%" }}
                        id="outlined-select-currency"
                        fullWidth
                        label="Trường đại học/Cao đẳng"
                    >
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        name="Năm sinh"
                        required
                        fullWidth
                        id="firstName"
                        label="Khóa học"

                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        style={{ width: "100%" }}
                        id="outlined-select-currency"
                        fullWidth
                        label="Tỉnh/thành phố"
                    >
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        name="Năm sinh"
                        required
                        fullWidth
                        id="firstName"
                        label="Quận/Huyện"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        style={{ width: "100%" }}
                        id="outlined-select-currency"
                        fullWidth
                        label="Định hướng công việc"
                    >
                    </TextField>
                </Grid>

            </Grid>
            <div className='w-full text-right'>
                <Button
                    type="submit"
                    variant="contained"

                    className=''
                    sx={{ mt: 3, mb: 2, backgroundColor: "#FE568E" }}
                >
                    Lưu
                </Button>
            </div>
        </Box>
    );
}
