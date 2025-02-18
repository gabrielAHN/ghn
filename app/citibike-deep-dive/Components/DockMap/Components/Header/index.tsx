import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import { useGraphMode } from "@/app/citibike-deep-dive/provider/GraphModeContext";
import { SliderControls } from "./SliderControls";
import { SelectControls } from "./SelectControls";

interface YearDataItem {
  year: number;
  month: number | null;
  complete: boolean;
}

interface HeaderProps {
  YearData: YearDataItem[];
  SliderYear: number;
  setSliderYear: (year: number) => void;
  SliderMonth: string;
  setSliderMonth: (month: string) => void;
}

export default function Header({
  YearData,
  SliderYear,
  setSliderYear,
  SliderMonth,
  setSliderMonth,
}: HeaderProps) {
  const { graphMode } = useGraphMode();

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthToIndex = Object.fromEntries(monthNames.map((name, index) => [name, index + 1]));
  const years = [...new Set(YearData.map((item) => item.year))].sort((a, b) => a - b);
  const minYear = years[0] ?? new Date().getFullYear();
  const selectedYearData = YearData.find((item) => item.year === SliderYear);
  const startMonthIndex = SliderYear === 2013 ? 5 : 0;
  const endMonthIndex = selectedYearData?.complete ? 11 : (selectedYearData?.month ? selectedYearData.month - 1 : 0);
  const availableMonths = monthNames.slice(startMonthIndex, endMonthIndex + 1);

  const [isPlaying, setIsPlaying] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const useSliders = !isMobile;

  useEffect(() => {
    if (years.length > 0 && !years.includes(SliderYear)) {
      const newYear = years[0];
      setSliderYear(newYear);
      const newYearData = YearData.find((item) => item.year === newYear);
      if (newYearData) {
        const startMonthIndex = newYear === 2013 ? 5 : 0;
        const endMonthIndex = newYearData.complete ? 11 : (newYearData.month ? newYearData.month - 1 : 0);
        const newAvailableMonths = monthNames.slice(startMonthIndex, endMonthIndex + 1);
        setSliderMonth(newAvailableMonths[0]);
      }
    }
  }, [YearData, years, SliderYear, monthNames, setSliderYear, setSliderMonth]);

  useEffect(() => {
    if (!availableMonths.includes(SliderMonth)) {
      setSliderMonth(availableMonths[0]);
    }
  }, [SliderYear, availableMonths, SliderMonth, setSliderMonth]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        const currentMonthIdx = monthToIndex[SliderMonth] - 1;
        const currentYearIdx = years.indexOf(SliderYear);

        if (currentMonthIdx < endMonthIndex) {
          setSliderMonth(monthNames[currentMonthIdx + 1]);
        } else if (currentYearIdx < years.length - 1) {
          const nextYear = years[currentYearIdx + 1];
          setSliderYear(nextYear);
          const nextYearData = YearData.find((item) => item.year === nextYear);
          if (nextYearData) {
            const startMonthIndex = nextYear === 2013 ? 5 : 0;
            const endMonthIndex = nextYearData.complete ? 11 : (nextYearData.month ? nextYearData.month - 1 : 0);
            const nextAvailableMonths = monthNames.slice(startMonthIndex, endMonthIndex + 1);
            setSliderMonth(nextAvailableMonths[0]);
          }
        } else {
          setSliderYear(minYear);
          const firstYearData = YearData.find((item) => item.year === minYear);
          if (firstYearData) {
            const startMonthIndex = minYear === 2013 ? 5 : 0;
            const endMonthIndex = firstYearData.complete ? 11 : (firstYearData.month ? firstYearData.month - 1 : 0);
            const firstAvailableMonths = monthNames.slice(startMonthIndex, endMonthIndex + 1);
            setSliderMonth(firstAvailableMonths[0]);
          }
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, SliderYear, SliderMonth, years, minYear, endMonthIndex, monthToIndex, monthNames, YearData, setSliderYear, setSliderMonth]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <div className="w-full md:w-auto flex justify-center md:justify-start">
        <Button
          onClick={togglePlay}
          className={`h-[4em] w-full md:w-[10em] flex items-center justify-center ${
            isPlaying ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
          } text-white`}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
      </div>
      {useSliders ? (
        <SliderControls
          YearData={YearData}
          SliderYear={SliderYear}
          setSliderYear={setSliderYear}
          SliderMonth={SliderMonth}
          setSliderMonth={setSliderMonth}
          graphMode={graphMode}
        />
      ) : (
        <SelectControls
          YearData={YearData}
          SliderYear={SliderYear}
          setSliderYear={setSliderYear}
          SliderMonth={SliderMonth}
          setSliderMonth={setSliderMonth}
          graphMode={graphMode}
        />
      )}
    </div>
  );
}