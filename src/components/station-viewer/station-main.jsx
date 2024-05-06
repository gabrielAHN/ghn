import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Grid, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';

import TableChartIcon from '@mui/icons-material/TableChart';
import FileUploadOutlined from '@mui/icons-material/FileUploadOutlined';
import HubTwoToneIcon from '@mui/icons-material/HubTwoTone';
import SubwayIcon from '@mui/icons-material/Subway';
import StationViewerHeader from './components/header/main';
import AllStationViewer from './all-station-view/main';
import StationViewMain from './station-view/station-view-main';
import GTFSFileUploader from './gtfs-uploader/file-importer';
import ExampleData from './gtfs-uploader/example-data';
import LinearProgressWithLabel from './components/upload-progress-component';
import ClickTracking from '../data-tracking/click-tracking';



export default function StationViewer() {
  const [FileStatus, setFileStatus] = useState('not_started');
  const [FileError, setFileError] = useState([]);
  const [ProgressData, setProgressData] = useState(0);
  const [StationHeader, setStationHeader] = useState("station_info");
  const [SelectStation, setSelectStation] = useState(null);
  const [StationData, setStationData] = useState([]);
  const [FilterStationData, setFilterStationData] = useState([]);
  const location = useLocation();

  const abortControllerRef = useRef(new AbortController());

  const handleChange = useCallback((event, newValue) => {
    setStationHeader(newValue);
  }, [setStationHeader]);

  const tabPanelItems = useMemo(() => [
    {
        label: "Station Info",
        value: "station_info",
        icon: <SubwayIcon />,
        onClick: () => {
          setStationHeader("station_info");
          ClickTracking('station_info', location);
        }
    },
    {
        label: "Station Connections",
        value: "station_connection",
        icon: <HubTwoToneIcon />,
        onClick: () => {
          setStationHeader("station_connection");
          ClickTracking('station_connection', location);
        }
    },
    {
        label: "All Stations",
        value: "all_stations",
        icon: <TableChartIcon />,
        onClick: () => {
            setSelectStation(null);
            setStationHeader("station_info");
            ClickTracking('all_stations', location);
        }
    },
    {
        label: "Upload New File",
        value: "upload_file",
        icon: <FileUploadOutlined />,
        onClick: () => {
            setStationHeader("station_info");
            setSelectStation(null);
            setStationData([]);
            setFileStatus("not_started");
            ClickTracking('upload_file', location);
        }
    }
  ], [setStationHeader, setSelectStation, setFileStatus]);

  useEffect(() => {

    if (FileStatus !== 'loading') {
      abortControllerRef.current = new AbortController();
    }
  }, [FileStatus]);

  if (StationData.length == 0) {
    return (
      <Grid container spacing={4}>
        <Grid item xs={12} md={12}>
          <h1 style={{ fontSize: '13vw' }}>Station 🚉 Viz</h1>
        </Grid>
        <Grid item xs={12} md={12}>
          <a className="link-style" href={'/'}
            onClick={() => ClickTracking('ghn', location)}
          >
            Created by gabrielhn.com
          </a>
        </Grid>
        {
          [
            "not_started",
            "no_zipfile", "error_gtfs_file", "processing_error",
          ].includes(FileStatus) ?
            (
              <>
                <Grid item xs={12} md={12}>
                  <GTFSFileUploader
                    {...{
                      FileStatus, setFileStatus, ProgressData, setProgressData,
                      setStationData, setFilterStationData,
                      setFileError, FileError, abortControllerRef
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <ExampleData
                    {...{
                      FileStatus, setFileStatus, ProgressData, setProgressData,
                      setStationData, setFilterStationData, setFileError,
                      abortControllerRef
                    }}
                  />
                </Grid>
              </>
            ) : FileStatus === 'loading' ? (
              <Grid item xs >
                <LinearProgressWithLabel sx={{ marginTop: '1vh' }} value={ProgressData} />
                <Button
                  color="error"
                  variant="outlined"
                  sx={{
                    marginBottom: '2vh',
                    margin: '0 auto'
                  }}
                  onClick={
                    () => {
                      ClickTracking('stop_upload', location)
                      setProgressData(0);
                      setFileStatus('not_started');
                      abortControllerRef.current?.abort();
                    }
                  }
                >Cancel</Button>
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
          {...{
            FileStatus, setFileStatus, setFilterStationData, StationData,
            FilterStationData, setStationData, setSelectStation
          }}
        />
        <a className="link-style" href={'/'}
          onClick={() => ClickTracking('ghn', location)}
          style={{
            'padding': '3vh',
            'color': 'black',
            'textDecoration': 'none',
          }}>Created by gabrielhn.com</a>
      </>
    )
  }
  else {
     let filtertabPanelItems = tabPanelItems.filter(item => {
      if (StationData[SelectStation].pathways_status === '❌') {
        return item.value !== 'station_connection';
      }
      return true;
    });
    
    return (
      <>
        <StationViewerHeader
          handleChange={handleChange}
          tabPanelItems={filtertabPanelItems}
          HeaderPage={StationHeader}
        />
        <StationViewMain
          FilterStationData={FilterStationData}
          SelectStation={SelectStation}
          StationHeader={StationHeader} 
        />
        <a className="link-style" href={'/'}
          style={{
            'padding': '3vh',
            'color': 'black',
            'textDecoration': 'none',
          }}>Created by gabrielhn.com</a>
      </>
    );
  }
}