import React, { useState, useCallback, useMemo, useEffect } from "react";
import MapComponent from "../../../components/map-component";
import { ScatterplotLayer } from "@deck.gl/layers";
import { getBoundingBox, findCenter } from "../../../components/map-functions";
import { STOP_TYPE_COLORS } from "../../station-view-main";
import StationInfoLegendMap from "./station-info-legend";

export default function StationInfoMap({
  FilteredNodes, setClickInfo, ClickInfo,
  NodeTypes, nodes,
  setFilteredNodes, handleCheckboxChange,
  viewState, setViewState
}) {

  const stationNodesDict = useMemo(() => {
    return FilteredNodes.reduce((dict, node) => {
      if (node.stop_lat && node.stop_lon) {
        dict[node.stop_id] = node;
      }
      return dict;
    }, {});
  }, [FilteredNodes]);

  const bounds = useMemo(() => ({ ...getBoundingBox(stationNodesDict), maxZoom: 19, minZoom: 14 }), [stationNodesDict]);
  const center = useMemo(() => findCenter(stationNodesDict), [stationNodesDict]);

  useEffect(() => {
    if (!viewState || (viewState.latitude === 0 && viewState.longitude === 0)) {
      setViewState({ latitude: center.lat, longitude: center.lon, zoom: 14 });
    }
  }, [center, setViewState, viewState]);

  const onViewStateChange = useCallback(({ viewState }) => setViewState(viewState), [setViewState]);

  const [MapLayers, setMapLayers] = useState([]);
  useEffect(() => {
    const stationParts = FilteredNodes.map(row => ({
      name: row.stop_name,
      code: row.stop_id,
      stop_type: row.location_type,
      coordinates: [Number(row.stop_lon), Number(row.stop_lat)],
    }));

    const baseLayer = new ScatterplotLayer({
      id: "all-stations-layer",
      data: stationParts,
      pickable: true,
      opacity: 0.8,
      filled: true,
      stroked: true,
      lineWidthMaxPixels: 1,
      radiusScale: 1,
      radiusMinPixels: 5,
      radiusMaxPixels: 5,
      onClick: setClickInfo,
      getPosition: d => d.coordinates,
      getFillColor: d => STOP_TYPE_COLORS[d.stop_type]?.color || [0, 0, 0],
    });

    const layers = [baseLayer];
    if (ClickInfo) {
      layers.unshift(new ScatterplotLayer({
        id: "highlighted-station-point",
        data: [ClickInfo.object],
        filled: true,
        getFillColor: [128, 128, 128],
        radiusMinPixels: 10,
        radiusMaxPixels: 10,
        getPosition: d => d.coordinates,
      }));
    }

    setMapLayers(layers);
  }, [ClickInfo, FilteredNodes, setClickInfo]);

  return (
    <div style={{ position: "relative", height: '60vh' }}>
      <StationInfoLegendMap
        nodes={nodes}
        NodeTypes={NodeTypes}
        setFilteredNodes={setFilteredNodes}
        handleCheckboxChange={handleCheckboxChange}
      />
      {
        viewState && (
          <MapComponent
            ClickInfo={ClickInfo}
            setClickInfo={setClickInfo}
            setViewState={setViewState}
            viewState={viewState}
            MapLayers={MapLayers}
            onViewStateChange={onViewStateChange}
            bounds={bounds}
          />
        )
      }
    </div>
  );
}
