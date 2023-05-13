import React from 'react';
import ReactEcharts from 'echarts-for-react';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function StationGraphs({ station_info, slider_data, years_data }) {
  var graph_data = {}

  var station_trip_totals = station_info.date_data[slider_data]

  graph_data['month_year'] =
    Object.entries(station_info.date_data).map(
      ([key, value]) => {
        return key
      })
  graph_data['start'] =
    Object.entries(station_info.date_data).map(
      ([key, value]) => {
        return value['start']
      })
  graph_data['end'] =
    Object.entries(station_info.date_data).map(
      ([key, value]) => {
        return value['end']
      })

  var station_totals =
    Object.entries(
      station_info.date_data[slider_data]).map(
        ([key, value]) => {
          return {
            name: capitalizeFirstLetter(key) + ` Station`,
            value: value
          }
        }
      )

    var years = [...new Set(
      Object.entries(station_info.date_data)
      .map((
        [key, value]) => {
          return key.split('/')[1]
        }
      ))]

    var year_start_total = 
      years.map(
        (year) => 
          Object.entries(station_info.date_data).filter(
            ([key, value]) => key.split('/')[1] === year
          ).map(
            ([key, value]) => {
              return station_info.date_data[key].start
            }
          ).reduce((a, b) => a + b, 0)
        )
    var year_end_total = 
        years.map(
          (year) => 
            Object.entries(station_info.date_data).filter(
              ([key, value]) => key.split('/')[1] === year
            ).map(
              ([key, value]) => {
                return station_info.date_data[key].end
              }
            ).reduce((a, b) => a + b, 0)
          )

  return (
    <ReactEcharts
      style={{ height: '65vh' }}
      option={{
        title: [
          {
            text: 'Station Trip Total by Months',
            left: '50%',
            top: '27%',
            textStyle: {
              fontSize: '12vh'
            },
            textAlign: 'center'
          },
          {
            text: 'Station Trip Total by Year',
            left: '50%',
            top: '62%',
            textStyle: {
              fontSize: '12vh'
            },
            textAlign: 'center'
          }
        ],
        grid: [
          { top: '35%', bottom: '45%', left: '50 vh' },
          { top: '70%', bottom: '5%', left: '60 vh', }
        ],
        color: ['#f51919', '#1366F5'],
        tooltip: 
          {
            trigger: 'item', gridIndex: 0
          },
        //   ,
        //   {
        //     trigger: 'axis', gridIndex: 1
        //   }
        // ],
        xAxis: [
          {
            gridIndex: 0,
            type: 'category',
            data: graph_data.month_year
          },
          {
            gridIndex: 1,
            type: 'category',
            data: years,
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            gridIndex: 0
          },
          {
            gridIndex: 1,
            type: 'value',
          },
        ],
        series: [
          {
            type: 'pie',
            radius: 50,
            center: ['50%', '12%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            labelLine: {
              show: true
            },
            data: station_totals,
            tooltip: {
              trigger: 'item'
            }
          },
          {
            name: 'End of Trips',
            type: 'line',
            markPoint: {
              symbolSize: 30,
              data: [
                {
                  coord: [slider_data, station_info.date_data[slider_data].end],
                }
              ]
            },
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: graph_data.end,
            smooth: true,
            tooltip: {
              trigger: 'axis',
            }
          },
          {
            xAxisIndex: 0,
            yAxisIndex: 0,
            name: 'Start of Trips',
            type: 'line',
            data: graph_data.start,
            smooth: true,
            tooltip: {
              trigger: 'axis',
            },
            markPoint: {
              symbolSize: 30,
              data: [
                {
                  coord: [slider_data, station_trip_totals.start],
                }
              ]
            }
          },
          {
            xAxisIndex: 1,
            yAxisIndex: 1,
            name: 'Start',
            type: 'bar',
            data: year_end_total
          },
          {
            xAxisIndex: 1,
            yAxisIndex: 1,
            name: 'End',
            type: 'bar',
            data: year_start_total
          }
        ]
      }}
    />
  )
}
