"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";

import { useDuckDB } from "../../provider/DuckDBProvider";
import { useGraphMode } from "../../provider/GraphModeContext";
import { fetchQueryData } from "@/hooks/DuckdbQuery/getDataQuery";

import { Skeleton } from "@/components/ui/skeleton";
import YearSelector from "@/components/selectors/YearSelectors";

const HeatmapGraph = dynamic(() => import("./HeatmapGraph"), {
    ssr: false,
});

function Heatmap() {
  const { db } = useDuckDB();
  const { graphMode } = useGraphMode();
  const [graphYear, setGraphYear] = useState<string>();

  let dataQuery = "SELECT DISTINCT year FROM CitibikeData.StatusDataTable";

  if (graphMode === "covid") {
    dataQuery += " WHERE year BETWEEN '2020' AND '2022'";
  } else if (graphMode === "congestion") {
    dataQuery += " WHERE year BETWEEN '2024' AND '2025'";
  }

  const { data, isLoading } = useQuery({
    queryKey: ["YearData", graphMode],
    queryFn: () =>
      fetchQueryData({ db, query: `${dataQuery} ORDER BY year ASC;` }),
    enabled: !!db,
  });

  const { data: chartData, isLoading: HeatMapLoading, isError } = useQuery({
    queryKey: ["HeatmapGraphData", graphYear],
    queryFn: () =>
      fetchQueryData({
        db,
        query: `SELECT * FROM CitibikeData.HeatMapTable WHERE year = '${graphYear}';`,
      }),
    enabled: !!db && !!graphYear,
  });

  if (isError || data?.length === 0) {
    return (
      <div className="w-full flex flex-col">
        <div>Heatmap Data is not available 😔</div>
      </div>
    );
  }


  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-col items-center w-full">
        {!isLoading && data ? (
          <YearSelector
            YearData={data}
            graphYear={graphYear}
            setGraphYear={setGraphYear}
          />
        ) : (
          <Skeleton className="h-[3em] w-[10em] rounded-md mb-2" />
        )}
        {!HeatMapLoading && chartData ? (
          <HeatmapGraph chartData={chartData} />
        ) : (
          <Skeleton className="h-[10em] w-full mt-3 rounded-md" />
        )}
      </div>
    </div>
  );
}

export default Heatmap;
