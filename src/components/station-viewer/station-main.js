import React, { useState } from 'react';

import AllStationsEditor from './station-editor/all-stations-editor';
import AllStationViewer from './all-station-viewer/all-station-viewer';
import SearchComponent from './components/search-component';
import GTFSFileUploader from './gtfs-uploader/file-importer';
import ExampleData from './gtfs-uploader/example-data';

import { Button } from "@mui/material";
import { Grid } from '@material-ui/core';


export default function StationViewer() {
  const [FileStatus, setFileStatus] = useState('not_started');
  const [SelectStation, setSelectStation] = useState(null);
  const [StopsData, setStopsData] = useState([]);
  const [StationData, setStationData] = useState([]);
  const [FilterStationData, setFilterStationData] = useState([]);
  const [EditorView, setEditorView] = useState(0);


  if (StationData.length == 0) {
    return (
      <Grid container spacing={4} style={{postion: 'center'}}>
        <Grid item sx={12} sm={12}>
          <h1 style={{fontSize: '15vh'}}>Station 🚉 Viz</h1>
        </Grid>
        <Grid item xs={12} sm={12}>
          <a
            className="link-style" href={'/'}
            style={{
              'color': 'black',
              'textDecoration': 'none',
            }}>Created by gabrielhn.com</a>
        </Grid>
        <Grid item xs={12} sm={12}>
            <GTFSFileUploader 
              file_status={FileStatus}
              set_file_status={setFileStatus}
              set_stops_data={setStopsData}
              set_station_data={setStationData}
              set_filter_stationdata={setFilterStationData}
            />
        </Grid>
        <Grid item xs={12} sm={12}>
            <ExampleData />
        </Grid>
      </Grid>
    )
  } 
  if (SelectStation === null) {
    return (
      <>
        <AllStationViewer
                file_status={FileStatus}
                set_file_status={setFileStatus}
                set_filter_stationdata={setFilterStationData}
                station_data={StationData}
                table_data={FilterStationData}
                set_station_data={setStationData}
                set_select_station={setSelectStation}
                set_value={setEditorView}
                column_names={['Stop Id', 'Stop Name', 'Latitude', 'Longtitude','Exit Count']} 
                row_fields={['','stop_name', 'stop_id', 'exit_count','stop_lat', 'stop_lon']} 
                message={'test'}
        />
        <a className="link-style" href={'/'}
            style={{
                'padding': '3vh',
                'color': 'black',
                'textDecoration': 'none',
            }}>Created by gabrielhn.com</a>
      </>
    )
  }
  else {
    return (
      <>
        <h1>Station 🚉 Viz</h1>
        <Grid container spacing={2} >
          <Grid item sx sm={1}>
            <Button component="label"
            onClick={() => {
              setStationData([]);
              setFileStatus('not_started');
              }} >
            Upload New File
            </Button>  
          </Grid>
          <Grid item sx sm={1}>
            <Button component="label"
              onClick={() => {
                setEditorView(0);
                setSelectStation(null);
                setStationData(StationData);
                }}
              >
                All Stations
            </Button>  
          </Grid>
          <Grid item sx sm={9}>
            <SearchComponent
              filter_function={setFilterStationData}
              station_data={StationData}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} >
          <Grid item
            sx={12}
            sm={12}
          >
            <AllStationsEditor 
                filter_station_data={FilterStationData}
                stops_data={StopsData}
                editor_view={EditorView}
                set_editor_view={setEditorView}
            />
          </Grid>
        </Grid>
        <a className="link-style" href={'/'}
            style={{
                'padding': '3vh',
                'color': 'black',
                'textDecoration': 'none',
            }}>Created by gabrielhn.com</a>
      </>
    );
  }
};