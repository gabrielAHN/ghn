import JSZip from 'jszip';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import FileUploadOutlined from "@mui/icons-material/FileUploadOutlined";
import { GtfsParser } from './gtfs-parser';

import { useState } from 'react';

import { Grid, Box } from '@material-ui/core';
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
  const [loading, setLoading] = useState(false);

  var set_file_status = props[0].set_file_status
  var file_status = props[0].file_status
  var set_filter_station_data = props[0].set_filter_stationdata
  var set_stops_data = props[0].set_stops_data
  var set_station_data = props[0].set_station_data

  const handleFileChange = async (event) => {
    const zip = new JSZip();

    setLoading(true);

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
        {
          zipFile:zipData,
          set_file_error:setFileError,
          file_status:file_status,
          set_file_status:set_file_status,
          set_stops_data:set_stops_data,
          set_station_data:set_station_data,
          set_filter_station_data:set_filter_station_data
        }
      );
      // setLoading(false);
    }
  };


  if (file_status == 'not_started') {
    return (
      <Box sx={{ '& > button': { m: 2 } }}>
        <LoadingButton
          size="Large"
          variant="outlined"
          component="label"
          loading={loading}
          endIcon={<FileUploadOutlined />}
          loadingIndicator="Loading…"
        >
          <span>
            Upload GTFS Zip File
          </span>
          <input
            type="file"
            hidden
            onChange={handleFileChange}
          />
        </LoadingButton>
      </Box>
    )
  }
  if (file_status == 'no_zipfile') {
    return (
      <Grid container spacing={4} justifyContent="center" >
        <Grid item sx={12} sm={12}>
          <LoadingButton
          // size="small"
          // color="secondary"
          // onClick={handleClick}
          // loading={loading}
          // loadingPosition="start"
          // startIcon={<SaveIcon />}
          // variant="contained"
            size="Large"
            variant="outlined"
            component="label"
            loading={loading}
            loadingPosition="start"
            endIcon={<FileUploadOutlined />}
            // loadingIndicator="Loading…"
          >
            <span>
              Try a new GTFS Zip File Here
            </span>
            <input
              type="file"
              hidden
              onChange={handleFileChange}
            />
          </LoadingButton>
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
          <LoadingButton
            size="Large"
            variant="outlined"
            component="label"
            loading={loading}
            endIcon={<FileUploadOutlined />}
            loadingIndicator="Loading…"
          >
            <span>
              Try a new GTFS Zip File Here
            </span>
            <input
              type="file"
              hidden
              onChange={handleFileChange}
            />
          </LoadingButton>
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
