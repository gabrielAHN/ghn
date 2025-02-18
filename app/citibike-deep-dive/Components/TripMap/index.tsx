"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDuckDB } from "../../provider/DuckDBProvider";
import { useGraphMode } from "../../provider/GraphModeContext";
import { Skeleton } from "@/components/ui/skeleton";

import Header from "./Components/Header";
import TableComponent from "./Components/TableComponent";
import MapComponent from "./Components/Map";
import { fetchJsonTableData, fetchQueryData } from "@/hooks/DuckdbQuery/getDataQuery";

export default function TripMap() {
  const { db } = useDuckDB();
  const { graphMode } = useGraphMode();

  const [CurrentTime, setCurrentTime] = useState < number | undefined > ();
  const [graphYear, setGraphYear] = useState < number | undefined > ();
  const [ActiveTrips, setActiveTrips] = useState < any[] > ([]);
  const [minTime, setMinTime] = useState(0);
  const [maxTime, setMaxTime] = useState(0);

  let dataQuery = "SELECT DISTINCT year FROM CitibikeData.StatusDataTable";
  if (graphMode === "covid") {
    dataQuery += " WHERE year BETWEEN '2020' AND '2022'";
  } else if (graphMode === "congestion") {
    dataQuery += " WHERE year BETWEEN '2024' AND '2025'";
  }

  const {
    data,
    isError
  } = useQuery({
    queryKey: ["TripMapData", graphYear],
    queryFn: () =>
      fetchJsonTableData({
        db,
        query_table: `SELECT * FROM CitibikeData.TripTable WHERE year = ${graphYear} ORDER BY trip_count DESC;`,
        json_col: "waypoints"
      }),
    enabled: !!db && graphYear !== undefined,
    retry: 3
  });

  const {
    data: YearData,
    isLoading: YearLoading
  } = useQuery({
    queryKey: ["HeaderTripData", dataQuery],
    queryFn: () => fetchQueryData({ db, query: `${dataQuery} ORDER BY year ASC;` }),
    enabled: !!db
  });

  useEffect(() => {
    if (data && data.length > 0) {
      const allTimestamps = data.flatMap((row: any) =>
        row.json_col.map((point: any) => point.timestamp)
      );
      const min = Math.min(...allTimestamps);
      const max = Math.max(...allTimestamps);
      setMinTime(min);
      setMaxTime(max);
      if (CurrentTime == null) {
        setCurrentTime(min);
      }
    }
  }, [data, CurrentTime]);

  if (isError || YearData?.length === 0) {
    return (
      <div className="w-full items-center">
        <div>Trip Map Data is not available 😞</div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <div className="w-full h-full">
        {
          YearData === undefined ? (
            <div className="space-y-4">
              <div className="flex justify-center items-center">
                <Skeleton className="h-[2em] w-[10em] rounded-md" />
              </div>
              <div className="flex items-center space-x-4">
                <Skeleton className="h-[4em] w-[4em] rounded" />
                <Skeleton className="h-[4em] w-full rounded-md" />
              </div>
            </div>
          ) : (
            <Header
              YearData={YearData}
              MapStatus={data !== undefined}
              CurrentTime={CurrentTime}
              setCurrentTime={setCurrentTime}
              minTime={minTime}
              maxTime={maxTime}
              graphYear={graphYear}
              setGraphYear={setGraphYear}
            />
          )}
      </div>
      <div className="w-full mt-4">
        {!data ? (
          <Skeleton className="h-[30vh] w-full rounded-md" />
        ) : (
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <MapComponent
                MapData={data}
                ActiveTrips={ActiveTrips}
                CurrentTime={CurrentTime}
                graphYear={graphYear}
                setGraphYear={setGraphYear}
              />
            </div>
            <div className="w-full md:w-1/2">
              <TableComponent
                TableData={data}
                activeTrips={ActiveTrips}
                setActiveTrips={setActiveTrips}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
