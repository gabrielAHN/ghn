"use client";

import { useQuery } from "@tanstack/react-query";
import { useDuckDB } from "../../provider/DuckDBProvider";
import dynamic from "next/dynamic";

import { useGraphMode } from "../../provider/GraphModeContext";
import { fetchQueryData } from "@/hooks/DuckdbQuery/getDataQuery";
import { Skeleton } from "@/components/ui/skeleton";

const GraphComponent = dynamic(() => import("./GraphComponent"), {
    ssr: false,
});

function LineGraph() {
  const { db, loading } = useDuckDB();
  const { graphMode } = useGraphMode();

  let dataQuery = "SELECT * FROM CitibikeData.LineGraphTable";

  if (graphMode === "covid") {
    dataQuery += " WHERE year BETWEEN '2019' AND '2022'";
  } else if (graphMode === "congestion") {
    dataQuery += " WHERE year BETWEEN '2024' AND '2025'";
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["LineGraphData", graphMode, dataQuery],
    queryFn: () => fetchQueryData({ db, query: dataQuery }),
    enabled: !!db
  });

  if (isError || data?.length === 0) {
    return (
      <div className="w-full items-center">
        <div>Trip Data is not Available 😔</div>
      </div>
    );
  }
  
  return (
    <div className="w-full h-full">
      {!isLoading && !loading ? (
        <GraphComponent chartData={data} />
      ) : (
        <Skeleton className="h-[30vh] w-full rounded-md" />        
      )}
    </div>
  );
}

export default LineGraph;
