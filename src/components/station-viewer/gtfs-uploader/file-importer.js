import JSZip from 'jszip';
import Button from '@mui/material/Button';
import FileUploadOutlined from "@mui/icons-material/FileUploadOutlined";
import CircularProgress from '@mui/material/CircularProgress';
import { GtfsParser } from './gtfs-parser';

import { useState } from 'react';
import { Grid } from '@material-ui/core';
import { styled } from '@mui/system';


const WarningMessage = styled('div')({
  container: 'flex',
  width: '100%',
  backgroundColor: '#ffa726',
  color: 'white',
  borderRadius: '4px',
  padding: '20px 16px',
  border: 'none',
  textDecoration: 'none',
  fontWeight: 'bold'
});


export default function GTFSFileUploader(...props) {
  const [FileError, setFileError] = useState([]);
  var set_file_status = props[0].set_file_status
  var file_status = props[0].file_status
  var set_filter_stationdata = props[0].set_filter_stationdata
  var set_stops_data = props[0].set_stops_data
  var set_station_data = props[0].set_station_data

  const handleFileChange = async (event) => {
    const zip = new JSZip();
    
    const zipContent = event.target.files[0];


    if (zipContent === undefined) {
      set_file_status('no_zipfile')
    }
    else if (zipContent.type !== 'application/zip') {
      set_file_status('no_zipfile')
    }
    else {
      const zipData = await zip.loadAsync(zipContent);

      GtfsParser(
        zipData,
        setFileError,
        set_file_status,
        set_stops_data,
        set_station_data,
        set_filter_stationdata
      );
    }
  };


  if (file_status == 'not_started') {
    return (
      <Button variant="contained" component="label" style={{ height: '100%' }}>
        <FileUploadOutlined />
        <p>Upload GTFS Zip File</p>
        <input
          type="file"
          hidden
          onChange={handleFileChange}
        />
      </Button>
    )
  }
  if (file_status == 'started') {
    return (
      <CircularProgress
        size={30}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          marginTop: '-12px',
          marginLeft: '-12px',
        }}
      />
    )
  }
  if (file_status == 'no_zipfile') {
    return (
      <Grid container spacing={4} justifyContent="center" >
        <Grid item sx={12} sm={12}>
          <Button variant="contained" component="label" style={{ height: '100%' }}>
            <FileUploadOutlined />
            <p>Try a new GTFS Zip File Here</p>
            <input
              styles={{ display: "none" }}
              type="file"
              hidden
              onChange={handleFileChange}
            />
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <WarningMessage>
            You have not uploaded a zip file 😔 please try to upload a valid gtfs zip file.
            <br />
            <br />
            <a
              className='link-style-station'
              style={{
                'color': 'white',
                'textDecoration': 'none',
                'fontWeight': 'bold'
              }}
              href="https://cdn.mbta.com/MBTA_GTFS.zip" target='_blank'>
              Here is an example valid gtfs zip file.
            </a>
          </WarningMessage>
        </Grid>
      </Grid>
    )
  }
  if (file_status == 'error_zipfile') {
    return (
      <Grid container spacing={4} justifyContent="center" >
        <Grid item sx={12} sm={12}>
          <Button variant="contained" component="label" style={{ height: '100%' }}>
            <FileUploadOutlined />
            <p>Try a new GTFS Zip File Here</p>
            <input
              styles={{ display: "none" }}
              type="file"
              hidden
              onChange={handleFileChange}
            />
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <WarningMessage>
            Your gtfs file does not have the file(s) below:
            <ul>
              {
                FileError.map(
                  (message, index) => (
                    <p key={index}>{message}</p>
                  )
                )
              }
            </ul>
          </WarningMessage>
        </Grid>
      </Grid>
    )
  }
};
