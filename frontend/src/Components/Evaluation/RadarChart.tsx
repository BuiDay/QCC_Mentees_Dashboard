import { Radar } from 'react-chartjs-2'
const options: any = {
    scale: {
      gridLines: {
        color: 'black',
        lineWidth: 5
      },
      angleLines: {
        display: false
      },
      ticks: {
        beginAtZero: true,
        stepSize: 1
      },
      r: {
        min: 0,
        max: 5
      },
      pointLabels: {
        fontSize: 18,
        fontColor: 'green'
      }
    },
    legend: {
      position: 'left'
    }
  }
  const data = {
    labels:["Research","chiến lược",'kế hoạch',"content","hình ảnh","Đúng hạn","Thiết kế","đầu tư"],
    datasets: [
      {
        label: 'Điểm số',
        data:  [3,4,4,4,2,4] ,
        backgroundColor: 'rgba(0,0,0, 0.5)',
        borderColor: '#000',
        borderWidth: 2
      }
    ]
  }
const RadarChart = () => {
    
    return (
        <div className='flex w-full h-full justify-center items-center'>
            {/* <Radar data={data}/> */}
        </div>
    );
};

export default RadarChart;