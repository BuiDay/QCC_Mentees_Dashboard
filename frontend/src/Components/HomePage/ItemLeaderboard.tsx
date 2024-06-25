import React from 'react';
import AvatarDefault from '../../assets/avatar_default.png'

interface IProps{
    active?:boolean
}

const ItemLeaderboard:React.FC<IProps> = ({active}) => {
    return (
        <div className={`flex justify-between items-center p-2`}>
            <div className='flex items-center gap-4'>
                <span className={`text-[12px] ${active ? "text-pink":" text-gray-500"}`}>4</span>
                <div className='flex items-center gap-2'>
                    <div className='w-[40px] h-[40px] rounded-full overflow-hidden'>
                        <img src={AvatarDefault} alt="" />
                    </div>
                    <span className={`text-[12px] ${active ? "text-pink font-bold":" text-gray-500"}`}>Xuân Quỳnh</span>
                </div>
            </div>
            <div>
                <span className={`text-[12px] ${active ? "text-pink":" text-gray-500"} font-bold`}>4</span>
            </div>
        </div>
    );
};

export default ItemLeaderboard;