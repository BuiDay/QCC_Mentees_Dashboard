import React from 'react';
import { CiLock } from "react-icons/ci";
import ModalReward from './ModalReward';
interface IProps {
    data?: {
        title: string,
        icon: any,
        unlock: boolean
    }
}

const RewardItem: React.FC<IProps> = ({ data }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);

    return (
        <>
            <div className='w-[60px] h-[60px] cursor-pointer'>
                {
                    data?.unlock ?
                        <img src={data?.icon} alt="" className='w-full h-full object-cover' onClick={handleOpen}/> :
                        <div className='bg-gray-300 w-full h-full rounded-2xl flex justify-center items-center shadow-primary'>
                            <CiLock color='white' size={28} />
                        </div>
                }
            </div>
            {
                open && <ModalReward open={open} setOpen={setOpen} data={data}/>
            }
        </>

    );
};

export default RewardItem;