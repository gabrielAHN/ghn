import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Grid, Checkbox } from "@mui/material";
import MapComponent from "../../components/map-component";
import StationTable from "./station-table-map";
import { ScatterplotLayer } from "@deck.gl/layers";
import { getBoundingBox, findCenter } from "../../components/map-functions";

const STOP_TYPE_COLORS = {
  0: { color: [245, 19, 19], name: "Platform" },
  1: { color: [19, 102, 245], name: "Station" },
  2: { color: [246, 208, 19], name: "Exit" },
  3: { color: [0, 0, 255], name: "Entrance" },
  "": { color: [0, 0, 0], name: "Unknown" },
};

const gridItemStyle = {
  position: { xs: "relative", md: "absolute" },
  whiteSpace: "nowrap",
  overflowWrap: "break-word",
  overflow: "auto",
  minWidth: "42vh",
  textOverflow: "break-word",
  backgroundColor: "rgba(255, 255, 255)",
  borderRadius: "5px",
  padding: "2%",
  margin: "2%",
  zIndex: 1000,
  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
};

export default function StationMap({ SelectedData }) {
  const [ClickInfo, setClickInfo] = useState(null);
  const [MapLayers, setMapLayers] = useState([]);
  const [nodeTypes, setNodeTypes] = useState({
    Platform: true,
    Station: true,
    Exit: true,
    Entrance: true,
    Unknown: true,
  });

  const stationNodesDict = useMemo(() => {
    return SelectedData.pathways.nodes.reduce((dict, node) => {
      return node.stop_lat && node.stop_lon ? { ...dict, [node.stop_id]: node } : dict;
    }, {});
  }, [SelectedData]);

  const uniqueLocationTypes = useMemo(() => {
    return [...new Set(SelectedData.pathways.nodes.map((node) => node.location_type))];
  }, [SelectedData]);

  const bounds = useMemo(() => {
    return { ...getBoundingBox(stationNodesDict), maxZoom: 19, minZoom: 14 };
  }, [stationNodesDict]);

  const [viewState, setViewState] = useState(() => {
    const center = findCenter(stationNodesDict);
    return { latitude: center.lat, longitude: center.lon, zoom: 14 };
  });

  const onViewStateChange = useCallback(({ viewState }) => setViewState(viewState), []);

  const handleChange = useCallback((type) => {
    setNodeTypes((prev) => ({ ...prev, [type]: !prev[type] }));
  }, []);

  useEffect(() => {
    const stationParts = SelectedData.pathways.nodes
      .filter((row) => nodeTypes[STOP_TYPE_COLORS[row.location_type]?.name])
      .map((row) => ({
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
      radiusScale: 1,
      radiusMinPixels: 5,
      radiusMaxPixels: 5,
      onClick: setClickInfo,
      getPosition: (d) => d.coordinates,
      getFillColor: (d) => STOP_TYPE_COLORS[d.stop_type]?.color || [0, 0, 0],
    });

    const layers = [baseLayer];

    if (ClickInfo) {
      layers.unshift(
        new ScatterplotLayer({
          id: "highlighted-station-point",
          data: [ClickInfo.object],
          filled: true,
          radiusScale: 1.5,
          getFillColor: [0, 0, 0],
          radiusMinPixels: 10,
          radiusMaxPixels: 10,
          getPosition: (d) => d.coordinates,
        })
      );
    }

    setMapLayers(layers);
  }, [ClickInfo, SelectedData.pathways.nodes, nodeTypes]);

  return (
    <Grid container spacing={1}>
      {ClickInfo && (
        <Grid item sx={gridItemStyle} xs={12}>
          <StationTable ClickInfo={ClickInfo} STOP_TYPE_COLORS={STOP_TYPE_COLORS} />
        </Grid>
      )}
      <Grid item xs={12} md={12} style={{ height: "65vh", position: "relative" }}>
        <MapComponent
          ClickInfo={ClickInfo}
          setClickInfo={setClickInfo}
          setViewState={setViewState}
          viewState={viewState}
          MapLayers={MapLayers}
          onViewStateChange={onViewStateChange}
          bounds={bounds}
        />
        <div
          style={{
            alignItems: "center",
            position: "absolute",
            top: "1vh",
            right: "1vh",
            backgroundColor: "white",
            borderRadius: "5px",
            padding: "1%",
            fontSize: "0.75em",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
          }}
        >
          <h4>Stop Type</h4>
          {uniqueLocationTypes.map((locationType, key) => {
            const { name, color } = STOP_TYPE_COLORS[locationType] || {};
            return (
              <div key={key} style={{ display: "flex", alignItems: "center" }}>
                <Checkbox checked={nodeTypes[name]} onChange={() => handleChange(name)} />
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    backgroundColor: `rgb(${color})`,
                    marginRight: "5px",
                    borderRadius: "50%",
                  }}
                />
                <p>{name}</p>
              </div>
            );
          })}
        </div>
      </Grid>
    </Grid>
  );
}
