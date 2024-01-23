import JSZip from 'jszip';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import FileUploadOutlined from "@mui/icons-material/FileUploadOutlined";
// import { GtfsParse } from './gtfs-parser.jsx';
import Papa from 'papaparse';

import { useState, useEffect, useCallback } from 'react';

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

function GetPathwaysData(props) {
  var row = props.pathway_row
  var stops = props.stops
  var pathways = props.pathways

  var nodes = stops.filter(
      (node) => (
          (node.location_type == 3 ||
              node.location_type == 2 ||
              node.location_type == 0) &
          node.parent_station == row.stop_id
      )
  )

  var nodes_ids = nodes.map(
      (node) => (
          node.stop_id
      )
  )

  var link_data = pathways.filter(
      item => {
          return nodes_ids.includes(item.from_stop_id) || nodes_ids.includes(item.to_stop_id);
      });

  return { 'nodes': nodes, 'links': link_data }
}


export default function GTFSFileUploader(props) {
  const [FileError, setFileError] = useState([]);
  const [loading, setLoading] = useState(false);
  const [GtfsData, setGtfsData] = useState(
    {
      'pathways': undefined,
      'stops': undefined
    });


  var set_file_status = props.set_file_status
  var file_status = props.file_status
  var progress_data = props.progress_data
  var set_progress_data = props.set_progress_data
  var set_filter_station_data = props.set_filter_stationdata
  var set_stops_data = props.set_stops_data
  var set_station_data = props.set_station_data

  const processPathways = useCallback((props) => {
    // console.log(props)
    // const total_stations = props.total_stations;
    const percentageIncrease = props.percentageIncrease;
    const GtfsData = props.GtfsData;
    const set_progress_data = props.set_progress_data;

    var pathways_data = Papa.parse(GtfsData.pathways, { header: true });
    // var stops_data = Papa.parse(GtfsData.stops, { header: true });
    // const percentageIncrease = 100 / GtfsData.pathways.length;
    // console.log(pathways_data)

    pathways_data.data.forEach((pathway, index) => {
      // Your processing code here
  
      // Increase the progress
      set_progress_data((prevProgress) => progress_data + percentageIncrease);
      console.log(progress_data, index)
    });
  }, [GtfsData, set_progress_data, progress_data]);

  const handleFileChange = async (event) => {
  // function handleFileChange(event) {
    const zip = new JSZip();
    var FileError = [];

    if (event !== undefined) {
      // setLoading(true);
      const zipContent = event.target.files[0];

      if (zipContent === undefined) {
        set_file_status('no_zipfile')
      }
      else if (zipContent.type !== 'application/zip') {
        set_file_status('no_zipfile')
      }
      else {
        const zipData = await zip.loadAsync(zipContent)
        
        // zipData.then(
        //   (data) => {
        const PathwaysFile = zipData.file('pathways.txt');
        const StopFile =  zipData.file('stops.txt');
        
        setGtfsData({
          'pathways': await PathwaysFile.async('text'),
          'stops': await StopFile.async('text')
        });
            // console.log(PathwaysFile.async('text'));
            // setGtfsData(StopFile.async('text'));
            // return setGtfsData({
            //   'pathways': PathwaysFile.async('text'),
            //   'stops': StopFile.async('text')
            // });
            // return ({
            //   'pathways': data.file('pathways.txt'),
            //   'stops': data.file('stops.txt')
            // });
        // })
        // .then(
        //   (data) => {
        //     // console.log(data)
        //     setGtfsData(data)
        //   });
        // console.log(file_data)
        // setGtfsData(file_data)
        // console.log(GtfsData)
        // var zipData =  zipData
        // const PathwaysFile = zipData.file('pathways.txt');
        // const StopFile = zipData.file('stops.txt');
        
      // if (!PathwaysFile) {
      //     FileError.push('No Pathway file');
      //     set_file_error(FileError)
      // }
      // console.log(GtfsData)
      // if (!GtfsData.stops) {
      //     FileError.push('No Stop file');
      //     setFileError(FileError)
      // }
      // if (FileError.length > 0) {
      //     set_file_status('error_zipfile')
      // } 
      
      // else {
      //   try {

      //     var stops_data =  GtfsData.stops.async('text');
      //     var pathways_data =  GtfsData.pathways.async('text');

      //     setGtfsData({
      //       ...GtfsData,
      //       pathways: pathways_data,
      //       stops: stops_data,
      //     });
      //   } catch (error) {
      //     console.error('Error reading the zip file:', error);
      //   }
      // }
        // GtfsParser(
        //   {
        //     zipFile: zipData,
        //     set_file_error: setFileError,
        //     progress_data: progress_data,
        //     set_progress_data: set_progress_data,
        //     file_status: file_status,
        //     set_file_status: set_file_status,
        //     set_stops_data: set_stops_data,
        //     set_station_data: set_station_data,
        //     set_filter_station_data: set_filter_station_data
        //   }
        // )
        // setLoading(false);
      }

    }
  };

  useEffect(() => {
    handleFileChange();
    // console.log(GtfsData);
    if (GtfsData.pathways && GtfsData.stops) {
      var stops_data = Papa.parse(GtfsData.stops, { header: true });
      
      const percentageIncrease = ((stops_data.data.length/1)*100);

      // console.log(stops_data)

      var total_stations = stops_data.data.filter(
        (row, index) => (
            row.location_type == 1
        )
      );
      processPathways(
        {
        total_stations: total_stations,
        percentageIncrease: percentageIncrease, 
        GtfsData: GtfsData,
        set_progress_data: set_progress_data,
      });

      // In your loop
      // total_stations.forEach(
      //   (stops, index) => {
      //   // Your processing code here

      //   // Increase the progress
      //   set_progress_data((prevProgress) => prevProgress + percentageIncrease);
      //   console.log(progress_data, index);
      // });

      // set_progress_data((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10))
    //   try {

    //     var pathways_data = Papa.parse(GtfsData.pathways, { header: true });
    //     var stops_data = Papa.parse(GtfsData.stops, { header: true });

    //     var station_data = {};

        // var total_stations = stops_data.data.filter(
        //     (row, index) => (
        //         row.location_type == 1
        //     )
        // );
        

    //     var percentage =  ((1/total_stations.length) * 100)

        // for (let i = 1; i <= total_stations.length; i++) {

        //     var row = total_stations[i-1]

        //     total_stations[row.stop_id] = {
        //         stop_id: row.stop_id,
        //         stop_name: row.stop_name,
        //         stop_lat: Number(row.stop_lat),
        //         stop_lon: Number(row.stop_lon),
        //         exit_count: stops_data.data.filter(
        //             (exit_stop, index) => (
        //                 exit_stop.location_type == 2
        //                 && exit_stop.parent_station == row.stop_id
        //             )
        //         ).length,
        //         // pathways: GetPathwaysData(
        //         //     {
        //         //     pathway_row:row,
        //         //     stops:stops_data.data,
        //         //     pathways:pathways_data.data
        //         //     }
        //         // )
        //     }
        //     // set_progress_data((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + percentage));
        //     // set_progress_data((prevProgress) => (prevProgress + percentage));
        //     set_progress_data((prevProgress) => (prevProgress + percentageIncrease));
        //     console.log(progress_data, i);  
        //     // Add your code here
        // }
    //     set_station_data(station_data);
    //     set_filter_station_data(station_data);
    //     set_stops_data(stops_data.data);
    // } catch (error) {
    //     console.error('Error reading the zip file:', error);

    // }
      
    //   GtfsParser(
    //     GtfsData,
    //     setFileError,
    //     progress_data,
    //     set_progress_data,
    //     file_status,
    //     set_file_status,
    //     set_stops_data,
    //     set_station_data,
    //     set_filter_station_data
    //   )
    
    }
    // console.log(progress_data)
  }, [
    handleFileChange, GtfsData, setGtfsData
  ])

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
        <h1>{progress_data}</h1>
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
