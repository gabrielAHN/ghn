import { useState, useCallback, useEffect } from "react";
import { ScatterplotLayer } from "@deck.gl/layers";
import {
  Box,
  Paper,
  IconButton,
  MenuItem,
  Select,
  Button,
  Grid,
  Collapse,
  styled,
} from "@mui/material";
import TableComponent from "../components/table-component";
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MapComponent from "../components/map-component";
import { getBoundingBox, findCenter } from "../components/map-functions";

const DATA_STATUS = {
  "✅": {
    name: "yes",
    color: [128, 255, 128],
  },
  "❌": {
    name: "no",
    color: [255, 128, 128],
  },
  "🟡": {
    name: "some",
    color: [255, 255, 0],
  },
  "❓": {
    name: "unknown",
    color: [255, 255, 128],
  },
};

export const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function StationMapViewer(props) {
  const {
    FilterStationData,
    setSelectStation,
    setHeaderPage,
    setFilterStationData,
    StationData,
  } = props;
  const [ClickInfo, setClickInfo] = useState(null);
  const [MapLayers, setMapLayers] = useState([]);
  const [DataColor, setDataColor] = useState("pathways_status");
  const [expanded, setExpanded] = useState(true);

  const handleClose = () => {
    setClickInfo(null);
  };

  const bounds = {
    ...getBoundingBox(FilterStationData),
    maxZoom: 17,
    minZoom: 6,
  };

  const initialViewState = findCenter(FilterStationData);

  const [viewState, setViewState] = useState({
    longitude: initialViewState.lon,
    latitude: initialViewState.lat,
    zoom: 7,
  });


  const onViewStateChange = useCallback(({ viewState }) => {
    setViewState(viewState)
  }, [viewState, setViewState]);

  const handleChange = (event) => {
    setDataColor(event.target.value);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const PointClick = useCallback((info) => {
    const { stop_lon, stop_lat } = info.object;
    setViewState({
      longitude: stop_lon,
      latitude: stop_lat,
      zoom: 16,
    });
    setClickInfo(info);
  }, []);

  const GetColor = useCallback((data) => {
    return DATA_STATUS[data[DataColor]].color;
  }, [DataColor]);

  const StatusList = Array.from(
    new Set(
      Object.entries(FilterStationData).map(([key, value]) => value[DataColor]),
    ),
  );

  useEffect(() => {
    const mapPoints = Object.entries(FilterStationData).map(([key, value]) => ({
      coordinates: [Number(value.stop_lon), Number(value.stop_lat)],
      ...value,
    }));

    const baseLayer = new ScatterplotLayer({
      id: "table-view",
      data: mapPoints,
      pickable: true,
      filled: true,
      stroked: true,
      radiusScale: 1,
      getFillColor: GetColor,
      radiusMinPixels: 5,
      radiusMaxPixels: 5,
      onClick: PointClick,
      getPosition: (d) => d.coordinates,
    });

    const layers = [baseLayer];

    if (ClickInfo) {
      const highlightedPoint = new ScatterplotLayer({
        id: "highlighted-point",
        data: [ClickInfo.object],
        filled: true,
        radiusScale: 1.5,
        getFillColor: [0, 0, 0],
        radiusMinPixels: 10,
        radiusMaxPixels: 10,
        getPosition: (d) => d.coordinates,
      });
      layers.unshift(highlightedPoint);
    }

    setMapLayers(layers);
  }, [
    FilterStationData,
    ClickInfo,
    DataColor,
    GetColor,
    PointClick,
  ]);


  return (
    <Grid container spacing={1}>
      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        style={{ height: "65vh", position: "relative" }}
      >
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
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
          <Select value={DataColor} onChange={handleChange}>
            <MenuItem value={"pathways_status"}>Pathway</MenuItem>
            <MenuItem value={"wheelchair_status"}>Wheelchair</MenuItem>
          </Select>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            {StatusList.map((status, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    backgroundColor: `rgb(${DATA_STATUS[status].color.join(",")})`,
                    marginRight: "5px",
                    borderRadius: "50%",
                  }}
                />
                <p>{DATA_STATUS[status].name}</p>
              </div>
            ))}
          </Collapse>
        </div>
      </Grid>
      {ClickInfo && (
        <Grid item xs={12} sx={{
          zIndex: 10,
          position: { xs: "relative", md: "absolute" },
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
            <h4>{ClickInfo.object.stop_name}</h4>
            <TableComponent
              Data={ClickInfo.object}
              ColumnsData={["stop_id", "stop_lon", "stop_lat", "exit_count", "pathways_status", "wheelchair_status"]}
              ColumnName={["Stop Id", "Stop Lon", "Stop Lat", "Exit Count", "Pathways Status", "Wheelchair Status"]}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 2 }}>
              <Button
                variant="outlined"
                onClick={() => {
                  setSelectStation(ClickInfo.object.stop_id);
                  setHeaderPage(ClickInfo.object.stop_name);
                  setFilterStationData(StationData);
                }}
              >
                More Station Info
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  setViewState({
                    longitude: ClickInfo.object.stop_lon,
                    latitude: ClickInfo.object.stop_lat,
                    zoom: 16,
                  });
                }}
              >
                Reset View
              </Button>
            </Box>
          </Paper>
        </Grid>
      )}
    </Grid>
  );
}
