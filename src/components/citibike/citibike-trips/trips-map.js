import React, { useState, useEffect } from 'react';
import Box from "@material-ui/core/Box";
import Map from 'react-map-gl';
import DeckGL from '@deck.gl/react';


import { Grid } from '@material-ui/core';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import Slider from '@mui/material/Slider';
import { TripsLayer } from '@deck.gl/geo-layers';
// import CitibikeTrips from './trip_map.json';
import FormatedTable from './trip_table.js';



const MAPBOX_TOKEN = 'pk.eyJ1IjoiZWN1YXN1c2hpIiwiYSI6ImNsYnltdTc0NDAwaHozdm4xeHVsNDNuY3gifQ.E2AShv__LnmKLMATat664w';

const INITIAL_VIEW_STATE = {
  latitude: 40.7257548,
  longitude: -73.9957581,
  zoom: 11,
  maxZoom: 20,
  pitch: 0,
  bearing: 0
};


const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';

function get_years(CitibikeTrips) {
  if (CitibikeTrips) {
    return Object.keys(CitibikeTrips)
  } else {
    return ["2017"]
  }
}

export default function CitiTripMap({ mapStyle = MAP_STYLE }) {
  const years = get_years(CitibikeTrips)
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);
  const [isRunning, setIsRunning] = useState(true);
  const [DataYear, setDataYear] = useState(years[years.length - 1]);
  const [FilterData, setFilterData] = useState([]);
  const [GraphTime, setGraphTime] = useState(CitibikeTrips[DataYear].start_time);
  const [CheckboxObject, setChecked] = useState([
    'checkbox0', 'checkbox1', 'checkbox2', 'checkbox3',
    'checkbox4', 'checkbox5', 'checkbox6', 'checkbox7',
    'checkbox8', 'checkbox9'
  ]);

  const handleViewStateChange = ({ viewState }) => {
    setViewState(viewState);
  };

  const handlecheckbox = (value, props) => () => {
    const filter_trip = props.data.start_station_name + ' to ' + props.data.end_station_name;
    const currentIndex = CheckboxObject.indexOf(value);
    const newChecked = [...CheckboxObject];

    if (currentIndex === -1) {
      newChecked.push(value);
      setFilterData(
        FilterData.filter((item) => item !== filter_trip)
      );
    } else {
      newChecked.splice(currentIndex, 1);
      FilterData.push(filter_trip)
      setFilterData(FilterData);
    }
    setChecked(newChecked);
  };

  const handleChange = (event) => {
    setDataYear(event.target.value);
    setGraphTime(CitibikeTrips[event.target.value].start_time);
  };

  function TimeChange(event, newValue) {
    setGraphTime(newValue);
  }

  function filter_trips(trip_times, FilterData) {
    if (FilterData.length == 0) {
      return trip_times
    } else {
      const filteredData = trip_times.filter(
        (trip) =>
          !FilterData.includes(trip.top_trip_id)
      );
      return filteredData

    }
  }

  useEffect(
    () => {
      let interval;

      if (isRunning) {
        interval = setInterval(
          () => {
            if (GraphTime >= CitibikeTrips[DataYear].end_time){
              setGraphTime(CitibikeTrips[DataYear].start_time)
            } else {
              setGraphTime(GraphTime + 500)
            }
          }, 10);
      }
      return () => clearInterval(interval);
    }, [GraphTime, isRunning, CitibikeTrips[DataYear]]);

  function toggleRunning() {
    setIsRunning(!isRunning);
  }


  var layers = [
    new TripsLayer({
      id: 'CitibikeTrips',
      data: filter_trips(CitibikeTrips[DataYear].trip_times, FilterData),
      getPath: d => d.waypoints.map(p => p.coordinates),
      getTimestamps: d => d.waypoints.map(p => p.timestamp),
      currentTime: GraphTime,
      opacity: 1.0,
      widthMinPixels: 3,
      rounded: true,
      shadowEnabled: false,
      trailLength: 5000,
      getColor: f => f.trip_type == 'electric_bike' ? [246, 208, 19] : [19, 102, 245],
      fadeTrail: true,
      updateTriggers: {
        currentTime: GraphTime
      }
    })
  ];

  return (
    <Box sx={{ marginBottom: 10 }}>
      <Grid container spacing={1}>
        <Grid item sx={2} md={1}>
          <FormControl size="small" >
            <InputLabel id="demo-simple-select-label">Year</InputLabel>
            <Select
              defaultValue={DataYear}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={DataYear}
              label="Trip Data Year"
              onChange={handleChange}
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>{year}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item sx={12} md={2}>
          <Button
            size="large"
            variant="contained"
            color={isRunning ? 'error' : 'success'}
            onClick={toggleRunning}
            startIcon={
              isRunning ? <StopCircleIcon />
                : <PlayCircleIcon />}
          >
            {isRunning ? 'Stop' : 'Play'}
          </Button>
        </Grid>
        <Grid item sx={12} md={9} style={{ width: '100%' }}>
          <Slider
            value={GraphTime}
            onChange={TimeChange}
            min={CitibikeTrips[DataYear].start_time}
            step={10}
            max={CitibikeTrips[DataYear].end_time}
          />
        </Grid>
      </Grid>
      <Grid container spacing={4} >
        <Grid item sm={12} md={4}>
          <FormatedTable
            style={{ position: 'relative', width: '100%' }}
            data={CitibikeTrips[DataYear].top_trips}
            checkbox_object={CheckboxObject}
            checkbox_function={handlecheckbox}
            column_names={['', 'Start Station', 'End Station', ' Trip Amount']}
            row_fields={['start_station_name', 'end_station_name', 'amount']}
            message={'Getting Trips Data...'}
          />
        </Grid>
        <Grid item sm={12} md={8} style={{ position: 'relative', width: '100%' }}>
          <DeckGL
            style={{ position: 'relative', width: '100%', height: '85vh' }}
            viewState={viewState}
            onViewStateChange={handleViewStateChange}
            controller={true}
            layers={layers}
          >
            <Map
              styleDiffing={true}
              mapStyle={mapStyle}
              mapboxAccessToken={MAPBOX_TOKEN}
            />
          </DeckGL>
          <div
            style={{ position: 'absolute', top: '5%', left: '5%' }}
          >
            <div style={{display: 'flex', alignItems: 'center'}} >
              <span style={{ marginRight: '10px' }}>Standard Trip</span>
              <div style={{ flex: 1, borderBottom: '5px solid rgb(19, 102, 245)', width: '50px' }} />
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', 
              }}>
              <span style={{ marginRight: '10px' }}>Electric Trip</span>
              <div style={{ flex: 1, borderBottom: '5px solid rgb(246, 208, 19)', width: '50px' }} />
            </div>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
