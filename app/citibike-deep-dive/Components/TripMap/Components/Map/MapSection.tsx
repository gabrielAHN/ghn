"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";

import { RideType } from "@/components/style"
import { TripsLayer } from "@deck.gl/geo-layers";

const DeckglMap = dynamic(() => import("@/components/mapComponent/DeckglMap"), {
  ssr: false,
});

function MapSection({ MapData, ActiveTrips, CurrentTime, viewState, setViewState }) {
  const safeTableData = MapData || [];
  const [MapLayers, setMapLayers] = useState([]);
  const BoundBox = [
    [-74.08584594726562, 40.64653778076172],
    [-73.90774536132812, 40.814395904541016],
  ];

  const tripsTransformed = useMemo(() => {
    return safeTableData
      .map((row, index) => {
        if (ActiveTrips && ActiveTrips.includes(index)) return null;
        if (!row.json_col || !Array.isArray(row.json_col)) return null;

        const validPoints = row.json_col.filter(
          (point) =>
            point &&
            typeof point.timestamp === "number" &&
            Array.isArray(point.coordinates) &&
            point.coordinates.length === 2 &&
            typeof point.coordinates[0] === "number" &&
            typeof point.coordinates[1] === "number"
        );

        if (validPoints.length < 2) return null;

        return {
          ...row,
          timestamps: validPoints.map((point) => point.timestamp),
          path: validPoints.map((point) => point.coordinates),
        };
      })
      .filter((trip) => trip !== null);
  }, [safeTableData, ActiveTrips]);

  const baseLayer = useMemo(() => {
    if (tripsTransformed.length > 0) {
      return new TripsLayer({
        id: "TripsLayer",
        data: tripsTransformed,
        getPath: (d) => d.path,
        getTimestamps: (d) => d.timestamps,
        getColor: (d) => {
          return d?.rideable_type === "electric_bike"
            ? RideType.electric_bike
            : RideType.normal;
        },
        currentTime: CurrentTime,
        trailLength: 50000,
        capRounded: true,
        jointRounded: true,
        widthMinPixels: 5,
        widthMaxPixels: 8,
      });
    }
    return null;
  }, [tripsTransformed, CurrentTime]);

  useEffect(() => {
    const layers = baseLayer ? [baseLayer] : [];
    setMapLayers(layers);
  }, [baseLayer]);

  return (
    <div className="relative h-[34em] w-full">
      <DeckglMap
        MapLayers={MapLayers}
        viewState={viewState}
        BoundBox={BoundBox}
        setViewState={setViewState}
        Controller={{
          minZoom: 10,
          maxZoom: 20,
          dragRotate: false,
        }}
      />
    </div>
  );
}

export default MapSection;
