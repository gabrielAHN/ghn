import StationTable from '../components/station-table';
import SearchComponent from '../components/search-component';
import JSZip from 'jszip';
import { Button } from "@mui/material";
import { Grid } from '@material-ui/core';

var requestOptions = {
    method: 'GET',
    // mode: 'no-cors',
    // redirect: 'follow',
    headers: {
        "Accept-Ranges": "bytes",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/zip",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel" /
        "Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, "/
        "like Gecko) Chrome/119.0.0.0 Safari/537.36"
      }
  };

var url = 'https://storage.googleapis.com/storage/v1/b/mdb-latest/o/us-massachusetts-massachusetts-bay-transportation-authority-mbta-gtfs-437.zip'

// var url = "https://cdn.mbta.com/MBTA_GTFS.zip"

export default function ExampleData(...props) {
    const zip = new JSZip();

    const downloadFile = async () => {
        const response = await fetch(url);
        const buffer = await response.arrayBuffer();
        // const zip = await unzipper.Open.buffer(buffer);
        // const files = zip.files;
        console.log(buffer);
        console.log(FileReader.readAsArrayBuffer(Blob))
        // const blob = await response.blob();
        const zipData = await JSZip.loadAsync(buffer);
        // console.log(zipData);
        // const zipData = await JSZip.loadAsync(blob);
        console.log(buffer);
    };
    // var set_file_status = props[0].set_file_status
    // var station_data = props[0].station_data
    // var set_station_data = props[0].set_station_data
    // var set_filter_station_data = props[0].set_filter_stationdata
    // var set_select_station = props[0].set_select_station
    // var set_value = props[0].set_value
    // var table_data = props[0].table_data

    return (
        <>
            <Button component="label"
            onClick={() => {
                downloadFile();
            //   setStationData([]);
            //   setFileStatus('not_started');
              }} 
              >
                Example Dataset
            </Button>  

        </>

    );
}