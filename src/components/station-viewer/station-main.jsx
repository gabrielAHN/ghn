import React, { useState } from 'react';

import StationViewerHeader from './station-editor/station-header.jsx';
import AllStationViewer from './all-station-viewer/all-station-viewer.jsx';
import StationEditorMain from './station-editor/station-editor-main.jsx';
import GTFSFileUploader from './gtfs-uploader/file-importer.jsx';
import ExampleData from './gtfs-uploader/example-data.jsx';
import CircularProgressWithLabel from './components/upload-progress-component';

import { Button } from "@mui/material";
import { Grid } from '@material-ui/core';


export default function StationViewer() {
  const [FileStatus, setFileStatus] = useState('not_started');
  const [ProgressData, setProgressData] = useState(0);
  const [SelectStation, setSelectStation] = useState(null);
  const [StopsData, setStopsData] = useState([]);
  const [StationData, setStationData] = useState([]);
  const [FilterStationData, setFilterStationData] = useState([]);


  if (StationData.length == 0) {
    return (
      <Grid container spacing={4} style={{ postion: 'center' }}>
        <Grid item sx={12} sm={12}>
          <h1 style={{ fontSize: '15vh' }}>Station 🚉 Viz</h1>
        </Grid>
        <Grid item xs={12} sm={12}>
          <a
            className="link-style" href={'/'}
            style={{
              'color': 'black',
              'textDecoration': 'none',
            }}>Created by gabrielhn.com</a>
        </Grid>
        {
          FileStatus === 'not_started' ? (
            <>
              <Grid item xs={12} sm={12}>
                <GTFSFileUploader
                  {...{ FileStatus, setFileStatus, ProgressData, setProgressData, setStopsData, setStationData, setFilterStationData }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <ExampleData
                  {...{ FileStatus, setFileStatus, ProgressData, setProgressData, setStopsData, setStationData, setFilterStationData }}
                />
              </Grid>
            </>
          ) : FileStatus === 'loading' ? (
            <Grid item xs={12} sm={12}>
              <CircularProgressWithLabel value={ProgressData} />
            </Grid>
          ) : null
        }

      </Grid>
    )
  }
  if (SelectStation === null) {
    return (
      <>
        <AllStationViewer
          {...{ FileStatus, setFileStatus, setFilterStationData, StationData, 
            FilterStationData, setStationData, setSelectStation}}
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
        <StationViewerHeader {...{ FilterStationData,
                        setSelectStation,
                        setFilterStationData,
                        StationData,
                        setStationData,
                        setFileStatus,
                        setProgressData
                        }} />
        <StationEditorMain {...{
          FileStatus, setFileStatus, setFilterStationData, StationData, FilterStationData,
          SelectStation, setStationData, setSelectStation
        }}/>
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