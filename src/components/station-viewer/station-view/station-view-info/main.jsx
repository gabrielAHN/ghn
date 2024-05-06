import React, { useState } from "react";
import { Grid, Paper, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import StationInfoMap from "./components/station-info-map";
import TableComponent from "../../components/table-component";
import StationTableInfo from "./components/station-table-info";


export default function Main({
  nodes, NodeTypes, setFilteredNodes, handleCheckboxChange,
  FilteredNodes, selectedStation
}) {
  const [ClickInfo, setClickInfo] = useState(null);
  const [viewState, setViewState] = useState(null)

  const handleClose = () => {
    setClickInfo(null);
  };

  return (
    <Grid container sx={{ marginTop: '2vh' }}>
      <Grid item xs={12} md={12}>
        <StationInfoMap
          viewState={viewState}
          setViewState={setViewState}
          nodes={nodes}
          ClickInfo={ClickInfo}
          setClickInfo={setClickInfo}
          NodeTypes={NodeTypes}
          setFilteredNodes={setFilteredNodes}
          FilteredNodes={FilteredNodes}
          selectedStation={selectedStation}
          handleCheckboxChange={handleCheckboxChange}
        />
      </Grid>
      {
        ClickInfo && (() => {
          const coordinates = ClickInfo.object.coordinates;

          return (
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
                <h4>{ClickInfo.object.code}</h4>
                <TableComponent
                  Title={ClickInfo.object.code}
                  Data={{
                    ...ClickInfo.object,
                    lat: coordinates[1],
                    lon: coordinates[0],
                  }}
                  ColumnsData={["code", "lat", "lon", "stop_type"]}
                  ColumnName={["Stop ID", "Lat", "Lon", "Stop Type"]}
                />
              </Paper>
            </Grid>
          )
        })()
      }
      <Grid item xs={12} md={12} sx={{ marginTop: '2vh' }}>
        <StationTableInfo
          setClickInfo={setClickInfo}
          NodeTypes={NodeTypes}
          nodes={nodes}
          setViewState={setViewState}
        />
      </Grid>
    </Grid>
  )
}
