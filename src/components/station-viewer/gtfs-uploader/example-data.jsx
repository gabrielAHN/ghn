import React, { useState } from 'react';
import JSZip from 'jszip';
import GtfsParser from './gtfs-parser';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


var ExampleDataDict = [
    {
        name: 'Boston MBTA GTFS',
        url: 'https://www.googleapis.com/download/storage/v1/b/mdb-latest/o/us-massachusetts-massachusetts-bay-transportation-authority-mbta-gtfs-437.zip?alt=media'
    },
    {
        name: 'San Diego Metro GTFS',
        url: 'https://storage.googleapis.com/storage/v1/b/mdb-latest/o/us-california-san-diego-international-airport-metropolitan-transit-system-mts-gtfs-13.zip?alt=media'
    },
    {
        name: 'Budapest Metro GTFS',
        url: 'https://storage.googleapis.com/storage/v1/b/mdb-latest/o/hu-budapest-budapesti-kozlekedesi-kozpont-bkk-gtfs-990.zip?alt=media'
    },
]


export default function ExampleData(props) {
    const [FileError, setFileError] = useState([]);
    const [loading, setLoading] = useState(false);
    const [ExampleDataset, setExampleDataset] = useState('');
    const { FileStatus, ProgressData, setFileStatus, setProgressData, setStationData, setStopsData, setFilterStationData } = props;
    const zip = new JSZip();


    const downloadFile = async (event) => {
        setExampleDataset(event.target.value)
        setLoading(true);
        setFileStatus("loading");
        setProgressData(0);

        var url = event.target.value.url;

        const response = await fetch(url);

        const arrayBuffer = await response.arrayBuffer();
        const zipData = await zip.loadAsync(arrayBuffer);
        const stopFile = zipData.file('stops.txt');
        const pathwaysFile = zipData.file('pathways.txt');

        if (!stopFile || !pathwaysFile) {
            const errors = [];
            if (!stopFile) errors.push('No Stop file');
            if (!pathwaysFile) errors.push('No Pathways file');
            setFileError(errors);
            setFileStatus('error_zipfile');
            return;
        }

        const [stopsData, pathwaysData] = await Promise.all([
            stopFile.async('text'),
            pathwaysFile.async('text'),
        ]);

        GtfsParser({
            stopsData,
            pathwaysData,
            setFileError,
            ProgressData,
            setProgressData,
            FileStatus,
            setFileStatus,
            setStopsData,
            setStationData,
            setFilterStationData,
        })
    };

    return (
        <FormControl sx={{ width: '25vh' }}>
            <InputLabel id="demo-simple-select-label">Example Dataset</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Example GTFS Dataset"
                value={ExampleDataset}
                onChange={downloadFile}
            >
                {
                    ExampleDataDict.map(
                        (item, index) => (
                            <MenuItem
                                key={index}
                                value={item}
                            >
                                {item.name}
                            </MenuItem>
                        ))
                }
            </Select>
        </FormControl>
    );
}