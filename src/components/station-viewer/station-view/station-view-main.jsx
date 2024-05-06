import { useMemo, useState, useCallback } from 'react';
import { Grid } from "@mui/material";
import StationDashboardConnections from "./station-view-connections/station-dashboard";
import StationArcMap from "./station-view-connections/station-arc-map";
import PathwaysTable from "./station-view-connections/pathways-table";
import TableComponent from "../components/table-component";
import Main from './station-view-info/main';


export const STOP_TYPE_COLORS = {
  "0": { color: [245, 19, 19], name: "Platform" },
  "1": { color: [19, 102, 245], name: "Station" },
  "2": { color: [246, 208, 19], name: "Exit/Entrance" },
  "3": { color: [0, 0, 255], name: "Pathway Node" },
  "": { color: [0, 0, 0], name: "Unknown" },
};

export const gradientColors = [
  [0, 147, 146],
  [57, 177, 133],
  [156, 203, 134],
  [233, 226, 156],
  [238, 180, 121],
  [232, 132, 113],
  [207, 89, 126]
];

export default function StationViewMain({ FilterStationData, SelectStation, StationHeader }) {
  const selectedStation = FilterStationData[SelectStation];
  const { nodes, PathwaysLinks, maxTime, minTime, arcData } = selectedStation.pathways;
  const [SliderValues, setSliderValues] = useState([minTime, maxTime]);
  const [FilteredPathwayLinks, setFilteredPathwayLinks] = useState(PathwaysLinks);
  const [FilteredNodes, setFilteredNodes] = useState(nodes);
  const [StartNode, setStartNode] = useState([]);
  const [EndNode, setEndNode] = useState([]);
  const [NodeTypes, setNodeTypes] = useState({});
  const [ConnectionStatus, setConnectionStatus] = useState(false);
  const [StartStation, setStartStation] = useState("");
  const [EndStation, setEndStation] = useState("");

  const minDistance = 5;


  const LocationTypes = useMemo(() => (
    setNodeTypes(
      nodes.reduce((acc, { location_type }) => ({
        ...acc,
        [location_type]: { checked: true, visible: true }
      }), {})
    )
  ), [nodes]);

  const HandleSliderChange = useCallback((event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    setSliderValues(prevValues => {
      if (activeThumb === 0) {
        const maxFirstThumbValue = prevValues[1] - minDistance;
        return newValue[0] > maxFirstThumbValue
          ? [maxFirstThumbValue, prevValues[1]]
          : [newValue[0], prevValues[1]];
      } else {
        const minSecondThumbValue = prevValues[0] + minDistance;

        return newValue[1] < minSecondThumbValue
          ? [prevValues[0], minSecondThumbValue]
          : [prevValues[0], newValue[1]];
      }
    });
  }, [setSliderValues]);

  const handleCheckboxChange = useCallback((newValue, event) => {
    const { checked } = event.target;
    setNodeTypes(prev => ({
      ...prev,
      [newValue]: {
        ...prev[newValue],
        checked
      }
    }));
  }, []);

  const handleCheckbox2Change = useCallback((event, newValue) => {
    setConnectionStatus(newValue);
  });

  return (
    <Grid
      container
      style={{ borderRadius: "4px", padding: "1.25vh" }}
    >
      <h1 style={{ margin: '0 auto' }}>{selectedStation.stop_name}</h1>
      {
        StationHeader === "station_info" ? (
          <Grid item xs={12} sm={12}>
            <TableComponent
              sx={{ marginBottom: "2vh" }}
              Data={selectedStation}
              ColumnsData={[
                "stop_id", "stop_lon", "stop_lat", "exit_count",
                "pathways_status", "wheelchair_status"
              ]}
              ColumnName={[
                "Stop ID", "Lon", "Lat", "Exit Count",
                "Pathways Status", "Wheelchair Status"
              ]}
            />
            <Main
              sx={{ marginBottom: "2vh" }}
              nodes={nodes}
              NodeTypes={NodeTypes}
              setFilteredNodes={setFilteredNodes}
              handleCheckboxChange={handleCheckboxChange}
              FilteredNodes={FilteredNodes}
              selectedStation={selectedStation}
            />
          </Grid>
        ) : StationHeader === "station_connection" ? (
          <Grid item xs={12} sm={12}>
            <StationDashboardConnections
              setNodeTypes={setNodeTypes}
              setSliderValues={setSliderValues}
              HandleSliderChange={HandleSliderChange}
              handleCheckbox2Change={handleCheckbox2Change}
              handleCheckboxChange={handleCheckboxChange}
              nodes={nodes}
              PathwaysLinks={PathwaysLinks}
              maxTime={maxTime}
              minTime={minTime}
              setFilteredPathwayLinks={setFilteredPathwayLinks}
              setStartNode={setStartNode}
              setEndNode={setEndNode}
              SliderValues={SliderValues}
              NodeTypes={NodeTypes}
              ConnectionStatus={ConnectionStatus}
              StartNode={StartNode}
              EndNode={EndNode}
              StartStation={StartStation}
              setStartStation={setStartStation}
              EndStation={EndStation}
              setEndStation={setEndStation}
            />
            <StationArcMap
              arcData={arcData}
              FilteredNodes={FilteredNodes}
              NodeTypes={NodeTypes}
              StartNode={StartNode}
              EndNode={EndNode}
              maxTime={maxTime}
              SliderValues={SliderValues}
              setStartStation={setStartStation}
              setEndStation={setEndStation}
            />
            <PathwaysTable
              FilteredPathwayLinks={FilteredPathwayLinks}
              StartNode={StartNode}
              EndNode={EndNode}
            />
          </Grid>
        ) : null
      }
    </Grid>
  );
}
