import React, { useState } from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Table, TableBody, TableRow, TableCell } from '@mui/material';

import MapComponent from '../../components/map-component';
import { ScatterplotLayer } from '@deck.gl/layers';
import { getBoundingBox, findCenter } from '../../components/map-functions';
import { useCallback, useEffect } from 'react';


const STOP_TYPE_COLORS = {
    "0": {
        'color':[245, 19, 19],
        'name': 'Platform'
    },
    "1": {
        "color": [19, 102, 245],
        'name': 'Station'
    },
    "2": {
        "color":[246, 208, 19],
        "name": "Exit"
    },
    "3": {
        "color": [0, 0, 255],
        "name": "Entrance"
    }
}

export default function StationMap(props) {
    const { StationData, SelectStation, FilterStationData} = props;
    const [ClickInfo, setClickInfo] = useState(null);
    const [MapLayers, setMapLayers] = useState([]);
    const StationNodes = StationData[SelectStation].pathways.nodes;
    const StationNodesDict = {};
    StationNodes.forEach((node) => {
        if (node.stop_lat && node.stop_lon) {
            StationNodesDict[node.stop_id] = node;
        }
    });

    const BOUNDS = {
        ...getBoundingBox(StationNodesDict),
        maxZoom: 19,
        minZoom: 14
    };

    const [viewState, setViewState] = useState({
        latitude: findCenter(StationNodesDict).lat,
        longitude: findCenter(StationNodesDict).lon,
        zoom: 14,
    });

    
    const onViewStateChange = useCallback(({ viewState }) => {
        setViewState({
            ...viewState,
            ...viewState
        });
    }, []);

    useEffect(() => {

        const StationParts = StationNodes.map(
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
        const MapLayers = [
            new ScatterplotLayer({
                id: 'test',
                data: StationParts,
                pickable: true,
                opacity: 0.8,
                // stroked: true,
                filled: true,
                pickable: true,
                radiusScale: 1,
                radiusMinPixels: 5,
                radiusMaxPixels: 5,
                onClick: info => setClickInfo(info),
                getPosition: d => d.coordinates,
                getRadius: d => 5,
                getFillColor: d => STOP_TYPE_COLORS[d.stop_type].color
              })
        ];
        setMapLayers([MapLayers]);
        
    }, [setMapLayers]);
    return (
        <Grid container spacing={1}  >
            <Grid item xs={12} md={ClickInfo === null ? 12 : 6} lg={ClickInfo === null ? 12 : 7}
                style={{ height: '65vh', position: 'relative' }}>
                <MapComponent
                    {...{ ClickInfo, setClickInfo, viewState, MapLayers, onViewStateChange, BOUNDS }}
                />
                <div style={{
                        height: '12em',
                        position: 'relative', 
                        left: '1vh', 
                        backgroundColor: 'white', 
                        maxWidth: '12vh',
                        borderRadius: '5px',
                        padding: '1%',
                        fontSize: '0.75em',
                        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',}}>
                    {
                        Object.entries(STOP_TYPE_COLORS).map(
                            ([key, value]) => (
                                <div key={key} style={{
                                    display: 'flex', alignItems: 'center',
                                    }}>
                                    <div style={{width: '10px', height: '10px', backgroundColor: `rgb(${value.color})`, marginRight: '5px', borderRadius: '50%'}} />
                                    <p>{value.name}</p>
                                </div>
                            )
                        )
                    }
                    <p></p>
                </div>
            </Grid>
            {
                ClickInfo !== null && (
                    <Grid item xs={12} md={5} lg={4} style={{
                        position: 'relative',
                        // minWidth: '30vh',
                        backgroundColor: "rgba(255, 255, 255)",
                        borderRadius: '5px',
                        padding: '2%',
                        margin: '2%',
                        zIndex: 1000,
                        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
                    }}
                    >
                        <p><b>{ClickInfo.object.name}</b></p>
                        <Table sx={{  }}>
                            <TableBody>
                                <TableRow >
                                    <TableCell component="th" scope="row">Stop Id</TableCell>
                                    <TableCell align="right">{ClickInfo.object.code}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">coordinates</TableCell>
                                    <TableCell align="right">{`${ClickInfo.object.coordinates[0]}, ${ClickInfo.object.coordinates[1]}`}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Part Type</TableCell>
                                    <TableCell align="right">{STOP_TYPE_COLORS[ClickInfo.object.stop_type].name}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Grid>
                )
            }
        </Grid>
    );
}
