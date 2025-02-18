"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import {
  TooltipComponent,
  LegendComponent,
  GridComponent,
  TitleComponent,
} from "echarts/components";
import { BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { rgbToHex, ColorDict } from "@/components/style";
import { useGraphMode } from "@/app/citibike-deep-dive/provider/GraphModeContext";
import {
  covidYears,
  congestionYears,
} from "@/app/citibike-deep-dive/Components/ModeData";

echarts.use([
  TooltipComponent,
  LegendComponent,
  GridComponent,
  TitleComponent,
  BarChart,
  CanvasRenderer,
]);

export default function BarGraph({ stationData, currentYear }) {
  const { graphMode } = useGraphMode();
  const chartRef = useRef < HTMLDivElement > (null);
  const chartInstance = useRef < echarts.ECharts | null > (null);

  useEffect(() => {
    if (!chartRef.current || !stationData) return;

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }
    const myChart = chartInstance.current;


    const years = Object.keys(stationData)
      .map(Number)
      .sort((a, b) => a - b)
      .map(String);


    const startsData = years.map((year) => {
      const months = stationData[year].months;
      return Object.values(months).reduce((sum, m) => sum + m.month_starts, 0);
    });

    const endsData = years.map((year) => {
      const months = stationData[year].months;
      return Object.values(months).reduce((sum, m) => sum + m.month_ends, 0);
    });


    let markLineData = [];
    if (graphMode === "covid") {
      markLineData = Object.keys(covidYears)
        .filter((year) => years.includes(year))
        .map((year) => ({ xAxis: year }));
    } else if (graphMode === "congestion") {
      markLineData = Object.keys(congestionYears)
        .filter((year) => years.includes(year))
        .map((year) => ({ xAxis: year }));
    }


    const option = {
      tooltip: {
        trigger: "axis",
        formatter: (params) => {
          if (!params || params.length === 0) return "";
          const year = params[0].axisValue;
          const startsItem = params.find((p) => p.seriesName === "Starts");
          const endsItem = params.find((p) => p.seriesName === "Ends");

          let tooltipStr = `<b>${year}</b><br/>`;
          tooltipStr += `🚲 Starts: ${startsItem ? startsItem.data : 0}<br/>`;
          tooltipStr += `🏁 Ends: ${endsItem ? endsItem.data : 0}`;

          if (graphMode === "covid" && covidYears[year]) {
            tooltipStr += `<br/>${covidYears[year]}`;
          } else if (graphMode === "congestion" && congestionYears[year]) {
            tooltipStr += `<br/>${congestionYears[year]}`;
          }
          return tooltipStr;
        },
      },
      grid: {
        top: "10%",
        bottom: "30%",
        left: "10%",
        right: "10%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: years,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "Starts",
          type: "bar",
          data: startsData,
          itemStyle: {
            color: rgbToHex(ColorDict["start"]),
          },
        },
        {
          name: "Ends",
          type: "bar",
          data: endsData,
          itemStyle: {
            color: rgbToHex(ColorDict["end"]),
          },
        },
      ],
    };

    if (markLineData.length) {
      option.series.push({
        name: "MarkLines",
        type: "line",
        data: [],
        showSymbol: false,
        markLine: {
          symbol: ["none", "none"],
          lineStyle: { type: "dashed", color: "black" },
          label: { show: false },
          data: markLineData,
        },
      });
    }


    myChart.setOption(option, true);


    const handleResize = () => myChart.resize();
    window.addEventListener("resize", handleResize);


    return () => {
      window.removeEventListener("resize", handleResize);
      if (chartInstance.current) {
        chartInstance.current.dispose();
        chartInstance.current = null;
      }
    };
  }, [stationData, currentYear, graphMode]);

  return <div ref={chartRef} style={{ width: "100%", height: "200px" }} />;
}