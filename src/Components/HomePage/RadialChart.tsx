import ApexCharts from 'react-apexcharts'

const RadialChart = () => {
    const series = [80]
    const options = {
        chart: {
            type: 'radialBar',
            offsetY: -20,
            sparkline: {
                enabled: true
            }
        },
        colors: ["#FE568E"],
        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 90,
                track: {
                    background: "#e7e7e7",
                    strokeWidth: '100%',
                    margin: 10, // margin is in pixels
                    dropShadow: {
                        enabled: true,
                        top: 2,
                        left: 0,
                        color: '#999',
                        opacity: 0.1,
                        blur: 2
                    }
                },
                dataLabels: {
                    show: false,
                    value: {
                        offsetY: -2,
                        fontSize: '30px'
                    }
                }
            }
        },
        grid: {
            padding: {
                top: -10
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                shadeIntensity: 0.4,
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 1,

            },
        },
    }
    return (
        <div className='w-full h-full'>
            <ApexCharts options={options} series={series} type='radialBar' width={300} className=""/>
           
        </div>
    );
};

export default RadialChart;