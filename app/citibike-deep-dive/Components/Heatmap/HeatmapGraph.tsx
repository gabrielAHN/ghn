"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { getSortedMonths } from "@/components/util";

function HeatmapGraph({ chartData }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartData || chartData.length === 0) return;

    const chartInstance = echarts.init(chartRef.current);
    const hours = Array.from(new Set(chartData.map(item => item.hour))).sort((a, b) => a - b);
    const months = getSortedMonths(chartData);

    const heatmapData = chartData.map(item => [
      hours.indexOf(item.hour),
      months.indexOf(item.month),
      item.total_count || "-"
    ]);

    const option = {
      tooltip: { position: "top" },
      grid: {
        left: "90%",
        right: "90%",
        top: "65em",
        bottom: "30em",
        containLabel: true
      },
      xAxis: {
        type: "category",
        data: hours.map(hour => `${hour}:00`),
        splitArea: { show: true }
      },
      yAxis: {
        type: "category",
        data: months,
        splitArea: { show: true }
      },
      visualMap: {
        min: Math.min(...chartData.map(d => d.total_count)),
        max: Math.max(...chartData.map(d => d.total_count)),
        calculable: true,
        top: "10px",
        orient: "horizontal",
        left: "center",
        inRange: {
          color: [
            "#fef6b5","#ffdd9a","#ffc285","#ffa679","#fa8a76","#f16d7a","#e15383"
          ]
        }
      },
      series: [
        {
          name: "Activity Count",
          type: "heatmap",
          data: heatmapData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    };

    chartInstance.setOption(option);

    const handleResize = () => chartInstance.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chartInstance.dispose();
    };
  }, [chartData]);

  return <div ref={chartRef} className="w-full h-[30em]" />;
}

export default HeatmapGraph;
