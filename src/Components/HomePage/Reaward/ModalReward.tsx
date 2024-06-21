import React from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    borderRadius: "40px",
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    outline: 0,
};

interface IProps {
    open?: any,
    data?: {
        title: string,
        icon: any,
        unlock: boolean
    },
    setOpen?: any
}

const ModalReward: React.FC<IProps> = ({ open, setOpen, data }) => {
    const handleClose = () => setOpen(false);
    console.log(data)
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" className='text-center'>
                    <span className='font-bold'>
                        Congratulations!
                    </span>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <div className=''>
                        <div className=''>
                            <div className='max-w-[150px] m-auto'>
                                <img src={data?.icon} alt="" />
                            </div>
                        </div>
                        <h3 className='text-center mt-4 text-gray-500 text-[14px] uppercase'>
                            {data?.title}
                        </h3>
                        <div className='mt-5 max-w-[150px] shadow-primary max-h-[50px] bg-pink m-auto rounded-2xl p-1 cursor-pointer' onClick={handleClose}>
                            <p className='text-center text-white'>OK</p>
                        </div>
                    </div>

                </Typography>
            </Box>
        </Modal>
    );
};

export default ModalReward;