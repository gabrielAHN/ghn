"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import 'default-passive-events'

import { useGraphMode } from "../../provider/GraphModeContext";
import { getSortedMonths } from "@/components/util";
import { covidMarks, congestionMarks } from "../ModeData";

export default function GraphComponent({ chartData }) {
  const chartRef = useRef(null);
  const { graphMode } = useGraphMode();
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current, null, {
        width: "auto",
        height: "auto",
      });
      chartInstance.current.getZr().off('mousewheel');
    }
    const currentChart = chartInstance.current;

    const handleResize = () => {
      if (currentChart) {
        currentChart.resize();
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
    if (!chartRef.current || !chartInstance.current) return;
    if (!chartData || chartData.length === 0) return;

    const currentChart = chartInstance.current;

    const years = Array.from(new Set(chartData.map(row => row.year))).sort((a, b) => a.localeCompare(b));
    const formattedMonths = [];
    const subscriberCounts = [];
    const customerCounts = [];

    years.forEach((year) => {
      const dataForYear = chartData.filter(row => row.year === year);
      const sortedMonths = getSortedMonths(dataForYear);
      sortedMonths.forEach((month) => {
        formattedMonths.push(`${month}-${year}`);
        const row = dataForYear.find(r => r.month === month);
        subscriberCounts.push(row ? row.subscriber_count : null);
        customerCounts.push(row ? row.customer_count : null);
      });
    });

    let markLineData;
    if (graphMode === "covid") {
      markLineData = covidMarks
        .map((mark) => {
          const idx = formattedMonths.indexOf(`${mark.month}-${mark.year}`);
          if (idx !== -1) {
            return {
              xAxis: idx,
              label: {
                show: true,
                formatter: mark.label,
                position: "insideEndTop",
              },
            };
          }
          return null;
        })
        .filter(Boolean);
    } else if (graphMode === "congestion") {
      markLineData = congestionMarks
        .map((mark) => {
          const idx = formattedMonths.indexOf(`${mark.month}-${mark.year}`);
          if (idx !== -1) {
            return {
              xAxis: idx,
              label: {
                show: true,
                formatter: mark.label,
                position: "insideEndTop",
              },
            };
          }
          return null;
        })
        .filter(Boolean);
    }

    const option = {
      tooltip: { trigger: "axis" },
      legend: { data: ["Subscribers", "Customers"], top: 1 },
      grid: { left: "5%", right: "5%", bottom: "10%", containLabel: true },
      xAxis: {
        type: "category",
        data: formattedMonths,
        axisLabel: {
          rotate: 45,
          fontSize: 12,
          interval: formattedMonths.length <= 12 ? 0 : 'auto',
        },
      },
      yAxis: { type: "value" },
      series: [
        {
          name: "Subscribers",
          type: "line",
          smooth: true,
          data: subscriberCounts,
          markLine: markLineData
            ? { symbol: ["none", "none"], data: markLineData }
            : undefined,
        },
        {
          name: "Customers",
          type: "line",
          smooth: true,
          data: customerCounts,
        },
      ],
    };

    currentChart.setOption(option);
    currentChart.resize();
  }, [chartData, graphMode]);

  return (
    <div className="w-full h-full">
      <div ref={chartRef} className="w-full h-[21em] min-h-[200px]" />
    </div>
  );
}