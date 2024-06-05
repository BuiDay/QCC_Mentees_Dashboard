import ApexCharts from 'react-apexcharts'

const RadarChart = () => {
    const series = [{
        name: 'Series 1',
        data: [80, 50, 30, 40, 100, 20],
    }]

    const options = {
        chart: {
            height: 350,
            type: 'radar',
            toolbar: false
        },
        markers: {
            size: 5,
            hover: {
                size: 10
            }
        },
        fill: {
            opacity: 0.5,
            colors: []
        },
        yaxis: {
            stepSize: 20
        },
        xaxis: {
            categories: ['January', 'February', 'March', 'April', 'May', 'June']
        }
    }
    return (
        <div className='flex w-full h-full justify-center items-center'>

            <ApexCharts options={options} series={series} type="radar" height={300} />

        </div>
    );
};

export default RadarChart;