import React, { useState, useEffect } from 'react';
// import CsvFileUploader from './file-importer';
import Papa from 'papaparse';
import JSZip from 'jszip';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';

export default function StationUI() {
    const [file, setFile] = useState(null);
    const [value, setValue] = useState(0);
    const [Stations, setStations] = useState([]);
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
            const content = await csvFile.async('text');
            var data = Papa.parse(content, {header: true});
            setStations(data.data)
            // console.log(data)
            // parseCSVData(content);
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
      console.log(Stations)
    return (
    <>
        {/* <CsvFileUploader /> */}
        <div>
            <input type="file" accept=".zip" onChange={handleFileChange} />
            {/* <button onClick={handleFileUpload}>Upload</button> */}
            {errorMessage && <p>{errorMessage}</p>}
        </div>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} centered>
              {
              Stations.filter(
                (row, index) => (
                    row.location_type == "1"
                )).map((row, index) => (
                <Tab wrapped 
                key={row.stop_id}
                label={row.stop_name}
                // value={tab.url}
                onClick={() => setValue(`${row.stop_id}`)} 
                />
              ))
              }
            </TabList>
          </Box>
          {
          Stations.filter(
            (row, index) => (
                row.location_type == "1"
            )).map(
            (row, index) => (
                <TabPanel key={row.stop_id} value={row.stop_id} >
                {row.stop_name}
                </TabPanel>
          ))
          }
        </TabContext>
    </>
    );
};