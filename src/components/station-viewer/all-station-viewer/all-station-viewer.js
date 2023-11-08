import StationTable from '../components/station-table';
import SearchComponent from '../components/search-component';

import { Button } from "@mui/material";
import { Grid } from '@material-ui/core';


export default function AllStationViewer(...props) {
    var set_file_status = props[0].set_file_status
    var station_data = props[0].station_data
    var set_station_data = props[0].set_station_data
    var set_filter_station_data = props[0].set_filter_stationdata
    var set_select_station = props[0].set_select_station
    var set_value = props[0].set_value
    var table_data = props[0].table_data

    return (
        <>
        <h1>Station 🚉 Viz</h1>
        <Grid container spacing={1} style={{borderRadius: '4px', padding: '1.25vh'}} >
            <Grid item xs={4} sm={8}>
                <SearchComponent
                    filter_function={set_filter_station_data}
                    station_data={station_data}
                />
            </Grid>
            <Grid item xs={2} sm={3}>
                <Button component="label"
                    variant="contained"
                    onClick={() => {
                    set_station_data([]);
                    set_file_status('not_started');
                    }} >
                    Upload New File
                </Button>  
            </Grid>
            <Grid item xs sm>
                <StationTable
                    style={{marginTop: '50%'}}
                    data={table_data}
                    set_select_station={set_select_station}
                    set_value={set_value}
                    column_names={['Stop Id', 'Stop Name', 'Latitude', 'Longtitude','Exit Count']} 
                    row_fields={['','stop_name', 'stop_id', 'exit_count','stop_lat', 'stop_lon']} 
                    message={'test'}
                />
            </Grid>
        </Grid>
      </>
       
    );
}