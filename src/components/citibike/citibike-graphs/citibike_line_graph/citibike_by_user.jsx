import React from 'react';
import ReactEcharts from 'echarts-for-react';


export default function LineGraph({data}) {

  return (
    <ReactEcharts
      option={{
        legend: {
          data: ['Short Term Plans', 'Annual Plan'],
          show: true,
          textStyle: {
            color: '#333',
            fontSize: 14,
          },
        },
        xAxis: {
          type: 'category',
          data: data.month_year
        },
        yAxis: {
          type: 'value'
        },
        tooltip: {
          trigger: 'axis'
        },
        series: [
          {
            name: 'Annual Plan',
            type: 'line',
            data: data.sub_amt,
            smooth: true
          },
          {
            name: 'Short Term Plans',
            type: 'line',
            data: data.user_amt,
            smooth: true,
            encode: {
              x: 'category',
              y: 'value',
              itemName: 'category',
              tooltip: ['value']
            }
          }
        ]
      }}
    />
  )
}
