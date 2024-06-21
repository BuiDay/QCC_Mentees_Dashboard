import React from 'react';
import RewardItem from './RewardItem';
import Idea from '../../../assets/rewards/idea.png'
import Content from '../../../assets/rewards/content.png'
import deadline from '../../../assets/rewards/deadline.png'
import design from '../../../assets/rewards/design.png'
import insight from '../../../assets/rewards/insight.png'
import proposal from '../../../assets/rewards/proposal.png'
import research from '../../../assets/rewards/research.png'
import reward from '../../../assets/rewards/reward.png'
import top1Mentee from '../../../assets/rewards/top1Mentee.png'

const dataReward = [
    {
        title: "Chúa tể content ✍️",
        icon: Content,
        unlock:true,
    },
    {
        title: "Bậc thầy thống trị idea💡",
        icon: Idea,
        unlock:true,
    }
    ,
    {
        title: "Kẻ hủy diệt deadline⌛",
        icon: deadline,
        unlock:true,
    }
    ,
    {
        title: "Ngôi sao vàng trong làng design🎨",
        icon: design,
        unlock:true,
    },
    {
        title: "Người nắm giữ insight✊",
        icon: insight,
        unlock:true,
    },
    {
        title: "Nghệ nhân chinh phục proposal👑",
        icon: proposal,
        unlock:false,
    },
    {
        title: "Chiến thần research 🕵️",
        icon: research,
        unlock:false,
    },
    {
        title: "Kẻ chiếm lĩnh reward️🏆",
        icon: reward,
        unlock:false,
    },
    {
        title: "Học sinh giỏi, mentee xuất sắc nhất🥇",
        icon: top1Mentee,
        unlock:false,
    }
]

const CollectionReward = () => {

    return (
        <div className='w-full h-full'>
            <div className='p-4 w-full'>
                <div className='flex gap-5 flex-wrap m-auto'>
                    {
                        dataReward.map((item, index) => <RewardItem key={index} data={item} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default CollectionReward;