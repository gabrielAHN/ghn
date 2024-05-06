import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Grid, Paper, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import MapComponent from "../../components/map-component";
import { ScatterplotLayer, ArcLayer } from "@deck.gl/layers";
import { getBoundingBox, findCenter } from "../../components/map-functions";
import { STOP_TYPE_COLORS, gradientColors } from "../station-view-main";
import TableComponent from "../../components/table-component";


export function getSourceColor(totalTime, maxTime) {
  const ratio = totalTime / maxTime;
  const index = Math.floor(ratio * gradientColors.length);
  return gradientColors[index - 1];
}

export default function StationArcMap({
  arcData, FilteredNodes, NodeTypes,
  StartNode, EndNode, maxTime,
  SliderValues, setStartStation, setEndStation
}) {

  const [MapLayers, setMapLayers] = useState([]);
  const [ClickInfo, setClickInfo] = useState(null);

  const handleClose = () => {
    setClickInfo(null);
  };

  const ArcOnclick = (arcClickInfo) => {
    const { object } = arcClickInfo;
    setStartStation(object.from.name);
    setEndStation(object.to.name);
  };

  const stationNodesDict = useMemo(() => (
    FilteredNodes.reduce((dict, node) => (
      node.stop_lat && node.stop_lon ? { ...dict, [node.stop_id]: node } : dict
    ), {})
  ), [FilteredNodes]);

  const FilteredStopIds = useMemo(() => {
    const uniqueStopIds = [...StartNode, ...EndNode].reduce((acc, item) => {
      acc.add(item.stop_id);
      return acc;
    }, new Set());
    return Array.from(uniqueStopIds);
  }, [StartNode, EndNode]);

  const bounds = useMemo(() => ({
    ...getBoundingBox(stationNodesDict), maxZoom: 19, minZoom: 14
  }), [stationNodesDict]);

  const [viewState, setViewState] = useState(() => {
    const center = findCenter(stationNodesDict);
    return { latitude: center.lat, longitude: center.lon, zoom: 14, pitch: 50, bearing: 50 };
  });

  const onViewStateChange = useCallback(({ viewState }) => setViewState(viewState), []);


  useEffect(() => {

    const filteredArcData = arcData.filter(
      row => SliderValues[0] <= row.total_time && SliderValues[1] >= row.total_time
    ).filter(
      row => FilteredStopIds.includes(row.from.name) && FilteredStopIds.includes(row.to.name)
    );

    const uniqueArcStopIds = [
      ...new Set(filteredArcData.map(item => item.from.name)),
      ...new Set(filteredArcData.map(item => item.to.name))
    ];

    const stationParts = FilteredNodes
      .filter(
        (row) => FilteredStopIds.includes(row.stop_id))
      .filter(
        (row) =>
          uniqueArcStopIds.includes(row.stop_id) &&
          uniqueArcStopIds.includes(row.stop_id)
      )
      .map((row) => ({
        name: row.stop_name,
        code: row.stop_id,
        stop_type: row.location_type,
        coordinates: [Number(row.stop_lon), Number(row.stop_lat)],
      }));

    const pointlayer = new ScatterplotLayer({
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
      getPosition: (d) => d.coordinates,
      getFillColor: (d) => STOP_TYPE_COLORS[d.stop_type]?.color || [0, 0, 0],
    })

    const arcLayer = new ArcLayer({
      id: 'ArcLayer',
      data: filteredArcData,
      getSourcePosition: d => d.from.coordinates,
      getTargetPosition: d => d.to.coordinates,
      getSourceColor: d => getSourceColor(d.total_time, maxTime),
      getTargetColor: d => getSourceColor(d.total_time, maxTime),
      getWidth: 3,
      pickable: true,
      onClick: ArcOnclick
      });

    const layers = [arcLayer, pointlayer];

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
  }, [ClickInfo, NodeTypes, StartNode, EndNode, arcData, SliderValues, FilteredStopIds]);

  return (
    <Grid container sx={{ marginTop: '2vh' }}>
    <Grid item xs={12} md={12} sx={{height: "65vh", position: "relative"}}>
      <MapComponent
        ClickInfo={ClickInfo}
        setClickInfo={setClickInfo}
        setViewState={setViewState}
        viewState={viewState}
        MapLayers={MapLayers}
        onViewStateChange={onViewStateChange}
        bounds={bounds}
      />
    </Grid>
      {
      ClickInfo && (
        <Grid item xs={12} sx={{
          zIndex: 10,
          position: { xs: "relative", sm: "absolute" },
          margin: '1vh',
        }}>
          <Paper sx={{ position: 'relative', padding: 1 }}>
            <IconButton
              size="small"
              sx={{
                zIndex: 100,
                position: 'absolute',
                right: 8,
                top: 8,
              }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
            <h4>{ClickInfo.code}</h4>
            {
              ClickInfo.layer.id === "ArcLayer" ? (
                <TableComponent
                Data={{
                  "Total Time": ClickInfo.object.total_time,
                  "From": ClickInfo.object.from.name,
                  "To": ClickInfo.object.to.name
                }}
                ColumnsData={["Total Time", "From", "To"]}
                ColumnName={["Total Time", "From", "To"]}
                />
              ): ClickInfo.layer.id === 'all-stations-layer' ? (
                <TableComponent
                Title={ClickInfo.object.code}
                Data={ClickInfo.object}
                ColumnsData={["code", "coordinates", "stop_type"]}
                ColumnName={["Stop ID", "Coordinates", "Location Type"]}
                />
              ) : null
            }
          </Paper>
        </Grid>
      )}
    </Grid>
  );
}
