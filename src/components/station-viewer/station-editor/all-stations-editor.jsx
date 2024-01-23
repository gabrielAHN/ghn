import { Grid } from '@material-ui/core';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';

import StationEditor from './station-editor';



export default function AllStationsEditor(...props) {
    var filter_station_data = props[0].filter_station_data
    var stops_data = props[0].stops_data
    var set_editor_view = props[0].set_editor_view
    var editor_view = props[0].editor_view

    const handleChange = (event, newValue) => {
      set_editor_view(newValue);
    };

    var filter_station_data = props[0].filter_station_data
    var stops_data = props[0].stops_data

    return (
        <TabContext value={editor_view} xs={{width: '100%'}}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
                <TabList
                onChange={handleChange} variant="scrollable"
                scrollButtons="auto" >
                  {
                    Object.keys(filter_station_data).map(
                    (key, index) => (
                      <Tab 
                      wrapped
                      key={index}
                      label={filter_station_data[key].stop_name}
                      onClick={() => set_editor_view(index)} 
                      />
                  ))
                  }
                </TabList>
              </Box>
              <Grid item
                xs={13}
                sm={13}
              >
              {
                Object.keys(filter_station_data).map(
                  (key, index) => (
                      <TabPanel key={index} value={index} >
                        <StationEditor data={stops_data} station_data={filter_station_data[key]}/>
                      </TabPanel>
                ))
              }
              </Grid>
            </TabContext>
    );
}