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
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import Slider from '@mui/material/Slider';
import { TripsLayer } from '@deck.gl/geo-layers';
// import CitibikeTrips from './trip_map_data.json';
// import FormatedTable from './trip_table.js';



const MAPBOX_TOKEN = 'pk.eyJ1IjoiZWN1YXN1c2hpIiwiYSI6ImNsYnltdTc0NDAwaHozdm4xeHVsNDNuY3gifQ.E2AShv__LnmKLMATat664w';

const INITIAL_VIEW_STATE = {
    latitude: 40.7257548,
    longitude: -73.9957581,
    zoom: 12,
    maxZoom: 20,
    pitch: 0,
    bearing: 0
};


const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';


export default function StationMap({ station_data = MAP_STYLE }) {


    var layers = [
        // new TripsLayer({
        //     id: 'CitibikeTrips',
        //     data: filter_trips(CitibikeTrips[DataYear].trip_times, FilterData),
        //     getPath: d => d.waypoints.map(p => p.coordinates),
        //     getTimestamps: d => d.waypoints.map(p => p.timestamp),
        //     currentTime: GraphTime,
        //     opacity: 1.0,
        //     widthMinPixels: 3,
        //     capRounded: true,
        //     shadowEnabled: false,
        //     trailLength: 5000,
        //     getColor: f => f.trip_type == 'electric_bike' ? [246, 208, 19] : [19, 102, 245],
        //     fadeTrail: true,
        //     updateTriggers: {
        //         currentTime: GraphTime
        //     }
        // })
    ];

    return (
        <Box sx={{ marginBottom: 10 }}>
            <DeckGL
                style={{ position: 'relative', width: '50%', height: '20vh' }}
                viewState={INITIAL_VIEW_STATE}
                controller={true}
                layers={layers}
            >
                <Map
                    styleDiffing={true}
                    mapStyle={MAP_STYLE}
                    mapboxAccessToken={MAPBOX_TOKEN}
                />
            </DeckGL>
        </Box>
    );
}
