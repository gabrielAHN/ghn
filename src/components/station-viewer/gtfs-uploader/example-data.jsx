import React, { useState } from 'react';
import JSZip from 'jszip';
import GtfsParser from './gtfs-parser';
import FileTracking from '../../data-tracking/file-tracking';
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';


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
    {
        name: 'Paris Metro GTFS',
        url: 'https://storage.googleapis.com/storage/v1/b/mdb-latest/o/fr-paris-ile-de-france-mobilite-gtfs-1026.zip?alt=media'
    }
]


export default function ExampleData(props) {
    const [loading, setLoading] = useState(false);
    const [ExampleDataset, setExampleDataset] = useState('');
    const {
        FileStatus, setFileStatus, setProgressData, abortControllerRef,
        setStationData, setFilterStationData, setFileError 
    } = props;
    const zip = new JSZip();


    const downloadFile = async (event) => {
        FileTracking(
            {
              status: 'example_zipfiles',
              file_type: 'url_upload',
              file_name: event.target.value.name,
            }
          )
        setExampleDataset(event.target.value)
        setLoading(true);
        setFileStatus("loading");
        setProgressData(0);

        const Signal = abortControllerRef.current.signal;
        var url = event.target.value.url;

        const response = await fetch(url);

        const arrayBuffer = await response.arrayBuffer();
        const zipData = await zip.loadAsync(arrayBuffer);
        const stopFile = zipData.file('stops.txt');
        const pathwaysFile = zipData.file('pathways.txt');

        if (!stopFile) {
            const errors = [];
            if (!stopFile) errors.push('Required Stops.txt file');
            if (!pathwaysFile) errors.push('Optional Pathways.txt file');
            setFileStatus('error_gtfs_file');
            setFileError(errors);
            return;
        }

        const [stopsData, pathwaysData] = await Promise.all([
            stopFile.async('text'),
            pathwaysFile ? pathwaysFile.async('text') : null,
        ]);

        try {
            await GtfsParser({
                stopsData,
                Signal,
                pathwaysData,
                setFileError,
                setProgressData,
                FileStatus,
                setFileStatus,
                setStationData,
                setFilterStationData,
            });
        } catch (error) {
            if (error.name === 'AbortError') {
                setFileStatus('aborted');
                setProgressData(0);
            } else {
                setFileStatus('processing_error');
            }
        } finally {
            setFileError([]);
            setLoading(false);
        }
    };

    return (
        <FormControl sx={{ width: '25vh' }}>
            <InputLabel id="demo-simple-select-label">Example Dataset</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Example GTFS Datasets"
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