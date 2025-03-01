"use client";

import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGraphMode } from "@/app/citibike-deep-dive/provider/GraphModeContext";
import { covidYears, congestionYears } from "@/app/citibike-deep-dive/Components/ModeData";

interface YearData {
  year: number;
}

interface YearSelectorProps {
  YearData: YearData[] | undefined;
  graphYear: number | undefined;
  setGraphYear: (year: number) => void;
}

export default function YearSelector({
  YearData,
  graphYear,
  setGraphYear,
}: YearSelectorProps) {
  const { graphMode } = useGraphMode();

  useEffect(() => {
    if (YearData && YearData.length > 0) {
      setGraphYear(YearData[0].year);
    } else {
      setGraphYear(undefined);
    }
  }, [YearData, setGraphYear]);

  const getLabel = (year: number) => {
    const yearKey = year.toString();
    if (graphMode === "covid" && covidYears[yearKey]) {
      return `${year} ${covidYears[yearKey]}`;
    } else if (graphMode === "congestion" && congestionYears[yearKey]) {
      return `${congestionYears[yearKey]} ${year}`;
    }
    return String(year);
  };

  return (
    <div className="flex w-full justify-center">
      <div className="hidden md:block">
        <Tabs
          value={graphYear?.toString()}
          onValueChange={(value) => setGraphYear(Number(value))}
        >
          <TabsList className="mb-2">
            {YearData?.map(({ year }) => (
              <TabsTrigger key={year} value={year.toString()}>
                {getLabel(year)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      <div
        className="block md:hidden w-full">
        <Select
          value={graphYear?.toString()}
          onValueChange={(value) => setGraphYear(Number(value))}
        >
          <SelectTrigger className="focus:border-blue-300 focus:ring-0">
            <SelectValue placeholder="Pick a year" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Years</SelectLabel>
              {YearData?.map(({ year }) => (
                <SelectItem key={year} value={year.toString()}>
                  {getLabel(year)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
