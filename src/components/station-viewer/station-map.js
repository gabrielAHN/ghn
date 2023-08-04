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
import { ScatterplotLayer } from '@deck.gl/layers';




const MAPBOX_TOKEN = 'pk.eyJ1IjoiZWN1YXN1c2hpIiwiYSI6ImNsYnltdTc0NDAwaHozdm4xeHVsNDNuY3gifQ.E2AShv__LnmKLMATat664w';

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';

const STOP_TYPE_COLORS = {
    "0": [245, 19, 19],
    "1": [19, 102, 245],
    "2": [246, 208, 19],
    "3": [0, 0, 255]
} 

export default function StationMap({ station_data, station_parts }) {
    const [clickInfo, setClickInfo] = useState();

    var initialViewState = {
        id: station_data.stop_id,
        longitude: station_data.stop_lon,
        latitude: station_data.stop_lat,
        zoom: 16,
        maxZoom: 20,
        pitch: 0,
        bearing: 0
    };

    var layers = [
        new ScatterplotLayer({
            id: station_data.stop_id,
            data: station_parts,
            pickable: true,
            opacity: 0.8,
            // stroked: true,
            filled: true,
            pickable: true,
            radiusScale: 1,
            // radiusMinPixels: 1,
            // radiusMaxPixels: 1,
            // lineWidthMinPixels: 1,
            onClick: info => setClickInfo(info),
            getPosition: d => d.coordinates,
            getRadius: d => 5,
            getFillColor: d => STOP_TYPE_COLORS[d.stop_type]
          })
    ];
    // console.log(clickInfo.object.name);

    return (
        <>
            <DeckGL
                style={{ position: 'relative', width: '100%', height: '50vh' }}
                initialViewState={initialViewState}
                controller={true}
                layers={layers}
            >
                <Map
                    styleDiffing={true}
                    mapStyle={MAP_STYLE}
                    mapboxAccessToken={MAPBOX_TOKEN}
                />
            </DeckGL>
            { 
                clickInfo && (
                <div style={{position: 'relative'}}>
                    { clickInfo.object.name }
                </div>
                )
            }
        </>
    );
}
