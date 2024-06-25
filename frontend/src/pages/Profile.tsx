import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Info from '../Components/Profile/Form/Info';
import Experience from '../Components/Profile/Form/Experience';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Profile = () => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div className='h-full w-full'>
            <div className='p-4 h-full flex flex-col'>
                <div className='w-full h-ful rounded-3xl mt-4 p-[50px]'>
                    <div>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab label="Thông tin cá nhân" {...a11yProps(0)} />
                                    <Tab label="Kinh nghiệm cá nhân" {...a11yProps(1)} />
                                </Tabs>
                            </Box>
                            <CustomTabPanel value={value} index={0}>
                                <div className='w-[90%] m-auto'>
                                    <Info />
                                </div>
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={1}>
                                <div className='w-[90%] m-auto'>
                                    <Experience />
                                </div>
                            </CustomTabPanel>
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;