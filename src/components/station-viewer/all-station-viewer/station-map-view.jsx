import { useState } from 'react';
import { ScatterplotLayer } from '@deck.gl/layers';

import MapComponent from '../components/map-component.jsx';



export default function StationMapViewer(props) {
    const [clickInfo, setClickInfo] = useState();

    var set_select_station = props.set_select_station
    var set_filter_station_data = props.set_filter_station_data
    var station_data = props.station_data


    function findCenter(coordinates) {
        if (coordinates.length === 0) {
          return { lat: 0, lon: 0 }; // Default to (0, 0) if the array is empty
        }
      
        const avgLat = coordinates.reduce((sum, coord) => sum + coord.lat, 0) / coordinates.length;
      
        const avgLon = coordinates.reduce((sum, coord) => sum + coord.lon, 0) / coordinates.length;
      
        return { lat: avgLat, lon: avgLon };
    }

    var lat_lon = findCenter(Object.entries(props.data).map(
            ([key, value], index) => { 
                return {lat: value.stop_lat, lon: value.stop_lon}
            }
        ))

    var map_points = Object.entries(props.data).map(
        ([key, value], index) => {
            value['id'] = index
            if (value.pathways.links.length > 0) {
                value['pathways_data'] = 'true'
            } else {
                value['pathways_data'] = 'false'
            }
            value['coordinates'] = [
                Number(value.stop_lon),
                Number(value.stop_lat)   
            ]
            return value
        }
    )

    var initialViewState = {
        longitude: lat_lon.lon,
        latitude: lat_lon.lat,
        zoom: 8,
        maxZoom: 15,
        pitch: 0,
        bearing: 0
    };

    var layers = [
        new ScatterplotLayer({
            id: 'table-view',
            data: map_points,
            pickable: true,
            opacity: 0.8,
            // stroked: true,
            filled: true,
            pickable: true,
            radiusScale: 1,
            getFillColor: d => d.pathways_data === 'true' ? [0, 255, 0] : [255, 0, 0],
            radiusMinPixels: 5,
            radiusMaxPixels: 5,
            // lineWidthMinPixels: 1,
            // onClick: info => setClickInfo(info),
            onClick: info => setClickInfo(info),
            getPosition: d => d.coordinates,
            getRadius: 10,
            // getFillColor: d => STOP_TYPE_COLORS[d.stop_type]
          })
    ];
    return (
        <div style={{ position: 'relative', width: '105%', height: '50vh' }}>
            <MapComponent 
                initialViewState={initialViewState}
                layers={layers}
            />
            { 
                clickInfo && (
                <div style={{position: 'absolute', zIndex: 1, pointerEvents: 'none', left: clickInfo.x, top: clickInfo.y}}>
                {/* <div style={{position: 'relative'}}> */}
                    { clickInfo.object.stop_name }
                </div>
                )
            }
        </div>
    )
}