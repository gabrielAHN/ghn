import { useState, useCallback, useEffect } from "react";
import { ScatterplotLayer } from "@deck.gl/layers";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  MenuItem,
  Select,
  Button,
  Grid,
  Collapse,
  styled,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MapComponent from "../components/map-component.jsx";
import { getBoundingBox, findCenter } from "../components/map-functions.jsx";

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
    setValue,
    setFilterStationData,
    StationData,
  } = props;
  const [ClickInfo, setClickInfo] = useState(null);
  const [MapLayers, setMapLayers] = useState([]);
  const [DataColor, setDataColor] = useState("pathways_status");
  const [expanded, setExpanded] = useState(true);

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

  // const onViewStateChange = useCallback{
  //   ({ viewState }) => setViewState(viewState),
  //   [],
  // };
  const onViewStateChange = useCallback(({viewState}) => {
    // Manipulate view state
    // viewState.target[0] = Math.min(viewState.target[0], 10);
    // Save the view state and trigger rerender
    // setViewState(viewState);
    setViewState(viewState)
  }, [viewState, setViewState]);
  // console.log(viewState)

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

  const gridItemStyle = {
    position: {
      xs: "relative",
      md: "absolute",
    },
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
      {ClickInfo && (
        <Grid item sx={gridItemStyle} xs={12}>
          <p>
            <b>{ClickInfo.object.stop_name}</b>
          </p>
          <Button
            variant="outlined"
            onClick={() => {
              setSelectStation(ClickInfo.object.stop_id);
              setValue(ClickInfo.object.stop_name);
              setFilterStationData(StationData);
            }}
          >
            More Detail
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
          <Table>
            <TableBody>
              {[
                "Stop Id",
                "Stop Lon",
                "Stop Lat",
                "Exit Count",
                "Pathways Status",
                "Wheelchair Status",
              ].map((field, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row" width="auto">
                    {field}
                  </TableCell>
                  <TableCell
                    align="right"
                    width="auto"
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {ClickInfo.object[field.toLowerCase().replace(/ /g, "_")]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      )}
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
    </Grid>
  );
}
