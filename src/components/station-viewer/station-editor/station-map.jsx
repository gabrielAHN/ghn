import React, { useState } from 'react';

import MapComponent from '../components/map-component';
import { ScatterplotLayer } from '@deck.gl/layers';


const STOP_TYPE_COLORS = {
    "0": [245, 19, 19],
    "1": [19, 102, 245],
    "2": [246, 208, 19],
    "3": [0, 0, 255]
} 


export default function StationMap(props) {
    const [clickInfo, setClickInfo] = useState();
    
    var selected_station = props.station_data
    var station_nodes = props.station_data.pathways.nodes


    var station_parts = station_nodes.map(
        (row, index) => (
                {
                    name: row.stop_name, code: row.stop_id, 
                    stop_type: row.location_type, 
                    coordinates: [
                        Number(row.stop_lon),
                        Number(row.stop_lat)   
                    ]
                }
            )
    )

    var initialViewState = {
        id: selected_station.stop_id,
        longitude: selected_station.stop_lon,
        latitude: selected_station.stop_lat,
        zoom: 16,
        maxZoom: 20,
        pitch: 0,
        bearing: 0
    };

    var layers = [
        new ScatterplotLayer({
            id: selected_station.stop_id,
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

    return (
        <div style={{ position: 'relative', width: '90%', height: '50vh' }}>
            <MapComponent
                initialViewState={initialViewState}
                layers={layers}
            />
            { 
                clickInfo && (
                <div style={{position: 'relative'}}>
                    { clickInfo.object.name }
                </div>
                )
            }
        </div>
    );
}
