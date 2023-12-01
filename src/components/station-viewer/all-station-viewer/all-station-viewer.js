import StationTableViewer from './station-table-view';
import SearchComponent from '../components/search-component';

import { Button } from "@mui/material";
import { Grid } from '@material-ui/core';


export default function AllStationViewer(props) {
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
        <Grid container spacing={1} style={{borderRadius: '4px', padding: '1.25vh'}} >
            <Grid item xs={4} sm={10}>
                <SearchComponent
                    filter_function={set_filter_station_data}
                    station_data={station_data}
                />
            </Grid>
            <Grid item xs={2} sm={2}>
                <Button 
                    component="label"
                    size='large'
                    variant="outlined"
                    onClick={() => {
                    set_station_data([]);
                    set_file_status('not_started');
                    }} >
                    Upload New File
                </Button>  
            </Grid>
            <Grid item xs sm>
                <StationTableViewer 
                    data={table_data}
                    set_select_station={set_select_station}
                    set_value={set_value}
                    set_filter_station_data={set_filter_station_data}
                    station_data={station_data}
                /> 
            </Grid>
        </Grid>
      </>
       
    );
}