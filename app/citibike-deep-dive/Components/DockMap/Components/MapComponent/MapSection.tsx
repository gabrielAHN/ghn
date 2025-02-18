"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { getMapsFunction, getProportionalSize } from "@/components/mapComponent/MapFunctions";
import { ScatterplotLayer } from "@deck.gl/layers";
import { DataFilterExtension } from "@deck.gl/extensions";
import { PointColor } from "@/components/mapComponent/ColorMap";
import { FlyToInterpolator } from "@deck.gl/core";

const DeckglMap = dynamic(() => import("@/components/mapComponent/DeckglMap"), { ssr: false });

function MapSection({ MapData, SliderMonth, SliderYear, MapLayers, setMapLayers, ClickInfo, setClickInfo }) {
  const [boundBox, setBoundBox] = useState(null);
  const [viewState, setViewState] = useState({
    longitude: -73.99159483715363,
    latitude: 40.73807913048654,
    zoom: 12.5,
    transitionDuration: 0,
    transitionInterpolator: new FlyToInterpolator()
  });
  
  useEffect(() => {
    if (!MapData || MapData.length === 0) {
      setMapLayers([]);
      return;
    }
    const mapPoints = MapData.filter(
      (row) => row.station_lon !== null && row.station_lat !== null
    );
    if (mapPoints.length === 0) {
      setMapLayers([]);
      return;
    }
    const { CenterData, BoundBox: mapBoundBox } = getMapsFunction({ data: mapPoints });
    setBoundBox(mapBoundBox);
  }, [MapData, setMapLayers]);

  useEffect(() => {
    if (!MapData || MapData.length === 0) {
      setMapLayers([]);
      return;
    }
    const mapPoints = MapData.filter(
      (row) => row.station_lon !== null && row.station_lat !== null
    );
    if (mapPoints.length === 0) {
      setMapLayers([]);
      return;
    }
    const dataFilterExtension = new DataFilterExtension({ filterSize: 1 });
    const getRadiusSize = getProportionalSize(MapData, SliderYear, SliderMonth);

    const layers = [
      new ScatterplotLayer({
        id: "station-view-base",
        data: mapPoints,
        getPosition: (d) => [Number(d.station_lon), Number(d.station_lat)],
        getFilterValue: (d) => {
          try {
            return d.json_col[SliderYear]?.months[SliderMonth] !== undefined ? 0 : 1;
          } catch {
            return 0;
          }
        },
        filterRange: [1, 1],
        filterSoftRange: [0.8, 1],
        filterTransformSize: true,
        filterTransformColor: true,
        extensions: [dataFilterExtension],
        pickable: true,
        getFillColor: (d) => {
          const [r, g, b] = PointColor(d, SliderYear, SliderMonth);
          return [r, g, b, 150];
        },
        stroked: true,
        getLineColor: (d) => {
          const [r, g, b] = PointColor(d, SliderYear, SliderMonth);
          return [r, g, b, 255];
        },
        lineWidthUnits: "pixels",
        getLineWidth: 4,
        radiusUnits: "pixels",
        getRadius: getRadiusSize,
        radiusMinPixels: 1,
        transitions: {
          getRadius: { duration: 450, type: "interpolation" },
          getFillColor: { duration: 450, easing: (x) => -(Math.cos(Math.PI * x) - 1) / 2 },
          getLineColor: { duration: 450, easing: (x) => -(Math.cos(Math.PI * x) - 1) / 2 },
        },
        updateTriggers: {
          getFilterValue: [SliderYear, SliderMonth],
          getFillColor: [SliderYear, SliderMonth],
          getLineColor: [SliderYear, SliderMonth],
          getRadius: [SliderYear, SliderMonth],
        },
      })
    ];

    if (ClickInfo) {
      layers.push(new ScatterplotLayer({
        id: "highlight-layer",
        data: [ClickInfo],
        getPosition: (d) => [Number(d.station_lon), Number(d.station_lat)],
        getFillColor: [0, 0, 0, 0],
        stroked: true,
        getLineColor: [250, 250, 250],
        lineWidthUnits: "pixels",
        getLineWidth: 7,
        radiusUnits: "pixels",
        getRadius: (d) => getRadiusSize(d),
        radiusMinPixels: 1,
        pickable: false,
      }));
    }

    setMapLayers(layers);
  }, [MapData, SliderYear, SliderMonth, ClickInfo, setMapLayers]);

  function handleMapClick(info) {
    setClickInfo(info || null);
    if (info) {
      setViewState({
        ...viewState,
        longitude: Number(info.station_lon),
        latitude: Number(info.station_lat),
        zoom: 15,
        transitionDuration: 700,
        transitionInterpolator: new FlyToInterpolator()
      });
    }
  }

  if (!viewState || !boundBox) {
    return null;
  }

  return (
    <div className="relative h-[34em] w-full">
      <DeckglMap
        MapLayers={MapLayers}
        BoundBox={boundBox}
        viewState={viewState}
        setViewState={setViewState}
        setClickInfo={handleMapClick}
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