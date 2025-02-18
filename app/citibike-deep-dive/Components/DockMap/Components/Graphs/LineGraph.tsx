"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import {
  TooltipComponent,
  LegendComponent,
  GridComponent,
  MarkPointComponent,
  MarkLineComponent
} from "echarts/components";
import { LineChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { rgbToHex, ColorDict } from "@/components/style";
import { useGraphMode } from "@/app/citibike-deep-dive/provider/GraphModeContext";
import {
  covidMarks,
  congestionMarks
} from "@/app/citibike-deep-dive/Components/ModeData";

echarts.use([
  TooltipComponent,
  LegendComponent,
  GridComponent,
  MarkPointComponent,
  MarkLineComponent,
  LineChart,
  CanvasRenderer
]);

function buildMarkLineData(marks, sortedMonths) {
  return marks
    .map((mark) => {
      const idx = sortedMonths.indexOf(mark.month);
      if (idx !== -1) {
        return {
          xAxis: idx,
          label: {
            show: true,
            formatter: mark.label,
            position: "above",
            fontSize: 10,
            color: "#333",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            borderRadius: 3,
            padding: [2, 4]
          },
          lineStyle: {
            color: "#666",
            type: "dashed"
          }
        };
      }
      return null;
    })
    .filter(Boolean);
}

export default function LineGraph({ monthData }) {
  const { graphMode } = useGraphMode();
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    chartInstance.current = echarts.init(chartRef.current);

    const handleResize = () => {
      if (chartInstance.current) {
        chartInstance.current.resize();
      }
    };

    window.addEventListener("resize", handleResize);


    return () => {
      window.removeEventListener("resize", handleResize);
      if (chartInstance.current) {
        chartInstance.current.dispose();
        chartInstance.current = null;
      }
    };
  }, []);


  useEffect(() => {
    if (!chartInstance.current || !monthData || Object.keys(monthData).length === 0) return;

    const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const sortedMonths = monthOrder.filter((m) => monthData[m]);

    const startsData = sortedMonths.map((m) => monthData[m].month_starts);
    const endsData = sortedMonths.map((m) => monthData[m].month_ends);

    let markLineData = [];
    if (graphMode === "covid") {
      markLineData = buildMarkLineData(covidMarks, sortedMonths);
    } else if (graphMode === "congestion") {
      markLineData = buildMarkLineData(congestionMarks, sortedMonths);
    }

    const option = {
      tooltip: {
        trigger: "axis",
        formatter: (params) => {
          const [starts, ends] = params || [];
          if (!starts || !ends) return "";

          let tooltipStr = `
            <b>${starts.axisValue}</b><br/>
            🚲 Starts: ${starts.data}<br/>
            🏁 Ends: ${ends.data}
          `;

          if (graphMode === "covid" || graphMode === "congestion") {
            const relevantMarks = graphMode === "covid" ? covidMarks : congestionMarks;
            const foundMark = relevantMarks.find((mark) => mark.month === starts.axisValue);
            if (foundMark) {
              tooltipStr += `<br/>${foundMark.label}`;
            }
          }
          return tooltipStr;
        }
      },
      legend: {
        data: ["Starts", "Ends"]
      },
      grid: {
        top: "10%",
        bottom: "45%",
        left: "8%",
        right: "8%",
        containLabel: true
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: sortedMonths
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          name: "Starts",
          type: "line",
          smooth: true,
          data: startsData,
          itemStyle: {
            color: rgbToHex(ColorDict["start"])
          }
        },
        {
          name: "Ends",
          type: "line",
          smooth: true,
          data: endsData,
          itemStyle: {
            color: rgbToHex(ColorDict["end"])
          }
        }
      ]
    };

    if (markLineData.length) {
      option.series.push({
        name: "MarkLines",
        type: "line",
        data: [],
        showSymbol: false,
        markLine: {
          symbol: ["none", "none"],
          data: markLineData
        }
      });
    }

    chartInstance.current.setOption(option, true);
  }, [monthData, graphMode]);

  return (
    <div
      ref={chartRef}
      style={{
        width: "100%",
        height: "250px"
      }}
    />
  );
}