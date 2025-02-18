"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import YearSelector from "@/components/selectors/YearSelectors";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";

export default function Header(props) {
  const {
    CurrentTime,
    setCurrentTime,
    minTime,
    maxTime,
    YearData,
    graphYear,
    setGraphYear,
    MapStatus,
  } = props;

  const [isPlaying, setIsPlaying] = useState(false);
  const step = 500;
  const requestRef = useRef(null);
  const previousTimeRef = useRef(null);

  const uniqueYears = useMemo(() => {
    if (YearData && YearData.length > 0) {
      return [...new Set(YearData.map((item) => item.year))].sort((a, b) => a - b);
    }
    return [];
  }, [YearData]);

  useEffect(() => {
    if (MapStatus) {
      setIsPlaying(true);
    }
  }, [MapStatus]);

  useEffect(() => {
    const animate = (time) => {
      if (previousTimeRef.current !== null) {
        const delta = time - previousTimeRef.current;
        setCurrentTime((curr) => {
          const increment = (step / 100) * delta;
          if (curr + increment < maxTime) {
            return curr + increment;
          } else {
            return minTime;
          }
        });
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    if (isPlaying && MapStatus) {
      requestRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isPlaying, MapStatus, maxTime, minTime, step, setCurrentTime]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <YearSelector
        YearData={YearData}
        graphYear={graphYear}
        setGraphYear={setGraphYear}
      />
      <div className="flex flex-col gap-3 md:flex-row w-full">
        <Button
          onClick={togglePlay}
          disabled={!MapStatus}
          className={`
            h-10
            w-full md:w-20
            ${isPlaying ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}
            text-white
          `}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <DualRangeSlider
          className="
            w-full
            [&_[role=slider]]:bg-blue-400
            [&_[role=slider]]:border-blue-300
            [&>span:first-child]:bg-blue-200
            [&>span:first-child>span]:bg-blue-500
          "
          value={[CurrentTime ?? minTime]}
          onValueChange={(value) => setCurrentTime(value[0])}
          min={minTime}
          max={maxTime}
          step={step}
          disabled={!MapStatus}
        />
      </div>
    </div>
  );
}