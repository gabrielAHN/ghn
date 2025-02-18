"use client";

import { useState, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDuckDB } from "../../provider/DuckDBProvider";
import { useGraphMode } from "../../provider/GraphModeContext";
import dynamic from "next/dynamic";

import { Skeleton } from "@/components/ui/skeleton";
import Header from "./Components/Header";
import { fetchQueryData, fetchJsonTableData } from "@/hooks/DuckdbQuery/getDataQuery";

const MapComponent = dynamic(() => import("./Components/MapComponent"), { ssr: true });

export default function DockMap() {
  const { db } = useDuckDB();
  const { graphMode } = useGraphMode();
  const [SliderYear, setSliderYear] = useState < number | undefined > ();
  const [SliderMonth, setSliderMonth] = useState < number | undefined > ();

  let dataQuery = "SELECT * FROM CitibikeData.StatusDataTable";
  if (graphMode === "covid") {
    dataQuery += " WHERE year BETWEEN '2020' AND '2022'";
  } else if (graphMode === "congestion") {
    dataQuery += " WHERE year BETWEEN '2024' AND '2025'";
  }

  const {
    data,
    isError
  } = useQuery({
    queryKey: ["DockMapData"],
    queryFn: () =>
      fetchJsonTableData({
        db,
        query_table: "SELECT * FROM CitibikeData.DockTable",
        json_col: "station_data"
      }),
    enabled: !!db
  });

  const {
    data: YearData
  } = useQuery({
    queryKey: ["HeaderDockData", graphMode],
    queryFn: () => fetchQueryData({ db, query: dataQuery }),
    enabled: !!db
  });

  if (isError || YearData?.length === 0) {
    return (
      <div className="w-full flex flex-col">
        <div>Dock Map Data is not available 😞</div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <div className="w-full">
        {
          YearData == undefined ? (
            <div className="flex items-center space-x-4">
              <Skeleton className="h-[4em] w-[4em] rounded" />
              <div className="flex flex-col space-y-2 w-full">
                <Skeleton className="h-[2em] w-full rounded-md" />
                <Skeleton className="h-[2em] w-full rounded-md" />
              </div>
            </div>
          ) : (
            <Header
              YearData={YearData}
              SliderYear={SliderYear}
              setSliderYear={setSliderYear}
              SliderMonth={SliderMonth}
              setSliderMonth={setSliderMonth}
            />
          )}
      </div>
      <div className="w-full mt-2">
        {
          !data ? (
            <Skeleton className="h-[30vh] w-full rounded-md" />
          ) : (
            <MapComponent
              MapData={data}
              SliderYear={SliderYear}
              SliderMonth={SliderMonth}
            />
          )}
      </div>
    </div>
  );
}
