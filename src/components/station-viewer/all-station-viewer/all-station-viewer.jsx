import React, { useState } from 'react';
import StationTableViewer from './station-table-view.jsx';
import StationMapViewer from './station-map-view.jsx';
import SearchComponent from '../components/search-component.jsx';
import Box from '@mui/material/Box';

import { Grid } from '@material-ui/core';
import TabContext from '@mui/lab/TabContext';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TableChartIcon from '@mui/icons-material/TableChart';
import MapIcon from '@mui/icons-material/Map';
import FileUploadOutlined from "@mui/icons-material/FileUploadOutlined";


export default function AllStationViewer(props) {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    var set_file_status = props.set_file_status
    var station_data = props.station_data
    var set_station_data = props.set_station_data
    var set_filter_station_data = props.set_filter_stationdata
    var set_select_station = props.set_select_station
    var set_value = props.set_value
    var table_data = props.table_data


    return (
        <>
        <h1>Station 🚉 Viz</h1>
        <Grid container spacing={1} style={{borderRadius: '4px', padding: '0.25vh', position: 'center'}} >
            <Grid item xs={12} sm={12}>
                <SearchComponent
                    filter_function={set_filter_station_data}
                    station_data={station_data}
                />
            </Grid>
            <Grid item xs={12} sm={12}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} centered>
                        <Tab icon={<TableChartIcon />} iconPosition="top" label="Table View" />
                        <Tab icon={<MapIcon />} iconPosition="top" label="Map View" />
                        <Tab icon={<FileUploadOutlined />} 
                            iconPosition="top" 
                            label="Upload New File" 
                            component="label"
                            onClick={() => {
                            set_station_data([]);
                            set_file_status('not_started');
                            }} />
                    </TabList>
                </Box>
                
                <TabPanel key={0} value={0} >
                    <StationTableViewer 
                        data={table_data}
                        set_select_station={set_select_station}
                        set_value={set_value}
                        set_filter_station_data={set_filter_station_data}
                        station_data={station_data}
                    /> 
                </TabPanel>
                <TabPanel key={1} value={1} >
                    <StationMapViewer
                        data={table_data}
                        set_select_station={set_select_station}
                        set_value={set_value}
                        set_filter_station_data={set_filter_station_data}
                        station_data={station_data}
                    />
                </TabPanel>
            </TabContext>
            </Grid>
        </Grid>
      </>
       
    );
}