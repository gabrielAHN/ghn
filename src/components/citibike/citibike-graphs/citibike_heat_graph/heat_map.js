import ReactEcharts from 'echarts-for-react';

export default function HeatGraph({ data }) {
  return (
    <ReactEcharts
      style={{ height: '60vh', width: '100%' }}
      option={{
        tooltip: {
          position: 'top',
        },
        animation: false,
        grid: {
          height: '85%',
          y: '0%',
        },
        xAxis: {
          type: 'category',
          data: data.months,
          splitArea: {
            show: true,
          },
        },
        yAxis: {
          type: 'category',
          data: data.hours,
          splitArea: {
            show: true,
          },
        },
        visualMap: {
          min: 0,
          max: data.max_value,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '0.1%',
          inRange: {
            color: ['#f3e79b', '#fac484', '#f8a07e', '#eb7f86', '#ce6693', '#a059a0', '#5c53a5']
          },
        },
        series: [
          {
            name: 'Trip Amount per Hour and Month',
            type: 'heatmap',
            data: data.value,
            label: {
              show: false,
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      }}
    />
  )
}