import ApexCharts from 'react-apexcharts'

const AreaChart = () => {
    const series = [{
        name: 'Diem',
        data: [3, 4, 4.4]
    }]
    const options:any = {
        chart: {
            type: 'area',
            toolbar: false
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        colors: ["#FE568E"],
        grid: {
            borderColor: "#555",
            clipMarkers: false,
            yaxis: {
              lines: {
                show: false
              }
            }
          },
        xaxis: {
            labels: {
                show: false,
            },
            categories: ["Project 1","Project 2","Project 3"]
        },

        yaxis: {
            show: false,
        },
        fill: {
            gradient: {
                enabled: true,
                opacityFrom: 0.4,
                opacityTo: 0.2
            }
        },
        markers: {
            size: 3,
            colors: ["#FE568E"],
            strokeColor: "#FE568E",
            strokeWidth: 2
        },
    }
    return (
        <div className='w-full h-full'>
            <ApexCharts options={options} series={series} type='area' height={150} />
        </div>
    );
};

export default AreaChart;