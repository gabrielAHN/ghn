import React, { useState, useEffect } from 'react';
// import CsvFileUploader from './file-importer';

import StationEditor from './station-editor';
import StationTable from './station-table';
import Papa from 'papaparse';
import Input from '@mui/material/Input';
import FileUploadOutlined from "@mui/icons-material/FileUploadOutlined";

import JSZip from 'jszip';
import Autocomplete from '@mui/material/Autocomplete';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
import { Container, InputAdornment, TextField, Button, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { Grid } from '@material-ui/core';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';

export default function StationUI() {
  const [FileStatus, setFileStatus] = useState('not_started');
  const [SelectStation, setSelectStation] = useState(null);
  const [value, setValue] = useState(0);
  const [StopsData, setStopsData] = useState([]);
  const [StationData, setStationData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFileChange = async (event) => {
    const zipContent = event.target.files[0];
    const zip = new JSZip();

    try {

      const zipData = await zip.loadAsync(zipContent);
      const fileNames = Object.keys(zipData.files);
      //   console.log(fileNames)
      //   const csvFile = zipData.file('pathways.txt');
      const csvFile = zipData.file('stops.txt');

      if (csvFile) {
        setFileStatus('started');

        const content = await csvFile.async('text');
        var data = Papa.parse(content, { header: true });
        var station_data = {};


        data.data.filter(
          (row, index) => (
            row.location_type == "1"
          )
        ).map(
          (row, index) => (
              station_data[row.stop_id] = {
                stop_id: row.stop_id,
                stop_name: row.stop_name,
                stop_lat: Number(row.stop_lat),
                stop_lon: Number(row.stop_lon)
              }
          )
        );
        setStationData(station_data);
        setStopsData(data.data);
      } else {
        console.log('CSV file not found in the zip.');
      }
    } catch (error) {
      console.error('Error reading the zip file:', error);
    }
  };
  // const handleFileUpload = () => {
  //     if (file) {
  //         const fileReader = new FileReader();
  //         fileReader.onload = handleFileRead;
  //         fileReader.readAsArrayBuffer(file);
  //     }
  // };
  console.log(SelectStation)

  if (StationData.length == 0) {
    return (
      <Grid container spacing={1} >
        <Grid item xs={12} sm={12}>
        <h1 style={{fontSize: '15vh'}}>Station 🚉 Viz</h1>
        {
          FileStatus == 'started' ? <h1>Loading...</h1> : 
          <Button component="label" style={{height: '20%'}}>
            <FileUploadOutlined />
            <p>Upload GTFS Zip File</p>
            <input
              styles={{display:"none"}}
              type="file"
              hidden
              onChange={handleFileChange}
            />
        </Button>
        }
        {errorMessage && <p>{errorMessage}</p>}
      </Grid>
      <Grid item xs sm>
      Created by <a
        className="link-style" href={'/'}
        style={{
          'color': 'black',
          'textDecoration': 'none',
        }}>gabrielhn.com</a>
      </Grid>
    </Grid>
    )
  }  
  // if (SelectStation === null) {
  //   return (
  //     <>
  //     <h1>Station 🚉 Viz</h1>
  //     <StationTable data={StationData} 
  //       column_names={['stop_name', 'stop_id']} 
  //       row_fields={['','stop_name', 'stop_id']} 
  //       message={'test'}
  //     />
  //     {/* {
  //       Object.keys(StationData).map(
  //         (key, index) => (
  //           <h1>{StationData[key].stop_id}</h1>
  //       ))
  //     } */}
  //     </>
  //   )
  // }
  else {
    return (
      <>
        <h1>Station 🚉 Viz</h1>
        <Grid container spacing={2} >
        <Grid item xs sm={1}>
          <Button component="label"
          onClick={() => {
            setStationData([]);
            setFileStatus('not_started');
            }} >
          Upload New File
          </Button>  
        </Grid>
        <Grid item xs sm={1}>
          <Button component="label">
          All Stations
          </Button>  
        </Grid>
        <Grid item xs sm={8}>
          <TextField
              id="outlined-basic"
              fullWidth
              label="Search Postings"
              variant="outlined"
              placeholder="Search for the post you want 🕵️"
              type="text"

              // value={searched}
              // onChange={(event) => setSearched(event.target.value)}
              InputProps={{
                endAdornment: (
                  <Button variant="text">Text</Button>
                  // <InputAdornment position="end">
                  //   <SearchIcon />
                  // </InputAdornment>
                ),
              }}
          />
        </Grid>
        </Grid>
        <Grid container spacing={2} >
          <Grid item
            xs
            sm={12}
          >
            <TabContext value={value} xs={{width: '100%'}}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
                <TabList 
                onChange={handleChange} variant="scrollable"
                scrollButtons="auto" >
                  {
                    Object.keys(StationData).map(
                    (key, index) => (
                      <Tab 
                      wrapped
                      key={index}
                      label={StationData[key].stop_name}
                      onClick={() => setValue(index)} 
                      />
                  ))
                  }
                </TabList>
              </Box>
              <Grid item
                xs
                sm={12}
              >
              {
              Object.keys(StationData).map(
                (key, index) => (
                    <TabPanel key={index} value={index} >
                      <StationEditor data={StopsData} station_data={StationData[key]}/>
                    </TabPanel>
              ))
              }
              </Grid>
            </TabContext>
          </Grid>
        </Grid>
      </>
    );
  }
};