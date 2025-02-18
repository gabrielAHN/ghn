"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import { TooltipComponent, LegendComponent } from "echarts/components";
import { PieChart as EChartsPieChart } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { ColorDict, rgbToHex } from "@/components/style";

echarts.use([
  TooltipComponent,
  LegendComponent,
  EChartsPieChart,
  CanvasRenderer,
  LabelLayout,
]);

interface PieChartProps {
  monthData: {
    month_starts: number;
    month_ends: number;
  };
}

function PieChart({ monthData }: PieChartProps) {
  const chartRef = useRef < HTMLDivElement > (null);
  const chartInstance = useRef < echarts.ECharts | null > (null);

  useEffect(() => {
    if (!chartRef.current || !monthData) return;

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }
    const myChart = chartInstance.current;

    const pieData = [
      { value: monthData.month_starts, name: "Starts" },
      { value: monthData.month_ends, name: "Ends" },
    ];

    const option = {
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "5%",
        left: "center",
        orient: "horizontal",
      },
      series: [
        {
          type: "pie",
          center: ["50%", "60%"],
          radius: "60%",
          avoidLabelOverlap: true,
          label: {
            show: false,
            position: "center",
          },
          labelLine: {
            show: false,
          },
          itemStyle: {
            borderRadius: 5
          },
          color: [
            rgbToHex(ColorDict["start"]),
            rgbToHex(ColorDict["end"]),
          ],
          data: pieData,
        },
      ],
    };

    myChart.setOption(option, true);

    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose();
        chartInstance.current = null;
      }
    };
  }, [monthData]);

  return <div ref={chartRef} style={{ height: "100px" }} />;
}

export default PieChart;
