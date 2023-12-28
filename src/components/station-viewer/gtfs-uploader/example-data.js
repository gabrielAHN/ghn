import React, { useState } from 'react';
import JSZip from 'jszip';
import { GtfsParser } from './gtfs-parser';
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


export default function ExampleData(...props) {
    const [FileError, setFileError] = useState([]);
    const [ExampleDataset, setExampleDataset] = useState('');

    const zip = new JSZip();

    var file_status = props[0].file_status
    var set_file_status = props[0].set_file_status
    var set_station_data = props[0].set_station_data
    var set_filter_station_data = props[0].set_filter_stationdata
    var set_stops_data = props[0].set_stops_data

    const downloadFile = async (event) => {
        setExampleDataset(event.target.value)

        var url = event.target.value.url;

        const response = await fetch(url);

        const arrayBuffer = await response.arrayBuffer();

        const zipFile = await zip.loadAsync(arrayBuffer);

        GtfsParser(
            {
                zipFile: zipFile,
                set_file_error: setFileError,
                file_status: file_status,
                set_file_status: set_file_status,
                set_stops_data: set_stops_data,
                set_station_data: set_station_data,
                set_filter_station_data: set_filter_station_data
            }
        )
    };


    return (
        <>
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
        </>
    );
}