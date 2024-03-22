import { useState } from 'react';
import Button from '@mui/material/Button';
import { Grid } from '@material-ui/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { useCallback, useEffect } from 'react';
import { TableBody, TableRow, TableCell } from '@mui/material';
import Table from '@mui/material/Table';
import MapComponent from '../components/map-component.jsx';
import { getBoundingBox, findCenter } from '../components/map-functions.jsx';


export default function StationMapViewer(props) {
    const { FilterStationData, setSelectStation, setValue, setFilterStationData, StationData, DropDown } = props;
    const [ClickInfo, setClickInfo] = useState(null);
    const [MapLayers, setMapLayers] = useState([]);
    const BOUNDS = {
        ...getBoundingBox(FilterStationData),
        maxZoom: 17,
        minZoom: 6
    };
    const [viewState, setViewState] = useState({
        longitude: findCenter(FilterStationData).lon,
        latitude: findCenter(FilterStationData).lat,
        zoom: 7,
    });

    const onViewStateChange = useCallback(({ viewState }) => {
        setViewState({
            ...viewState,
            ...viewState
        });
    }, []);

    function PointClick(info) {
        const { object } = info;

        setViewState(
            {
                longitude: info.object.stop_lon,
                latitude: info.object.stop_lat,
                zoom: 14,
                pitch: 0,
                bearing: 0
            }
        )

        setClickInfo({ ...ClickInfo, object });
    }


    useEffect(() => {
        if (DropDown) {
            setViewState(
                {
                    longitude: FilterStationData[DropDown].stop_lon,
                    latitude: FilterStationData[DropDown].stop_lat,
                    zoom: 14,
                }
            )
        }

        const map_points = Object.entries(FilterStationData).map(([key, value], index) => {
            return {
                ...value,
                id: index,
                coordinates: [Number(value.stop_lon), Number(value.stop_lat)],
            };
        });

        const baseLayer = new ScatterplotLayer({
            id: 'table-view',
            data: map_points,
            pickable: true,
            filled: true,
            radiusScale: 1,
            getFillColor: d => d.pathways_status === "✅" ? [0, 255, 0] : [255, 0, 0],
            radiusMinPixels: 5,
            radiusMaxPixels: 5,
            onClick: info => PointClick(info),
            getPosition: d => d.coordinates,
        });

        setMapLayers([baseLayer]);

        if (ClickInfo !== null) {

            const highlightedPoint = new ScatterplotLayer({
                id: 'highlighted-point',
                data: [ClickInfo.object],
                filled: true,
                radiusScale: 1.5,
                getFillColor: [0, 0, 0],
                radiusMinPixels: 10,
                radiusMaxPixels: 10,
                getPosition: d => d.coordinates,
            });
            const updatedLayers = [highlightedPoint, ...MapLayers];
            setMapLayers(updatedLayers);
        }


    }, [DropDown, FilterStationData, setMapLayers, ClickInfo])

    return (
        <Grid container spacing={1}  >
            {
                ClickInfo !== null && (
                    <Grid item xs={12} md={2} lg={2} style={{
                        position: 'relative',
                        minWidth: '45vh',
                        backgroundColor: "rgba(255, 255, 255)",
                        borderRadius: '5px',
                        padding: '2%',
                        margin: '2%',
                        zIndex: 1000,
                        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
                    }}
                    >
                        <p><b>{ClickInfo.object.stop_name}</b></p>
                        <Button variant="outlined" onClick={
                            () => {
                                setSelectStation(ClickInfo.object.stop_id)
                                setValue(ClickInfo.object.stop_name)
                                setFilterStationData(StationData)
                            }
                        }>
                            Select Station
                        </Button>
                        <Table sx={{ minWidth: '40vh' }}>
                            <TableBody>
                                <TableRow >
                                    <TableCell component="th" scope="row">Stop Id</TableCell>
                                    <TableCell align="right">{ClickInfo.object.stop_id}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Coordinates</TableCell>
                                    <TableCell align="right">{ClickInfo.object.stop_lat},{ClickInfo.object.stop_lon}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Exit Count</TableCell>
                                    <TableCell align="right">{ClickInfo.object.exit_count}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Pathways Status</TableCell>
                                    <TableCell align="right">{ClickInfo.object.pathways_status}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Wheel Chair Status</TableCell>
                                    <TableCell align="right">{ClickInfo.object.wheelchair_status}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Grid>
                )
            }
            <Grid item xs={12} md={ClickInfo === null ? 12 : 7} lg={ClickInfo === null ? 12 : 8}
                style={{ height: '65vh', position: 'relative' }}>
                <MapComponent
                    {...{ ClickInfo, setClickInfo, viewState, MapLayers, onViewStateChange, BOUNDS }}
                />
            </Grid>
        </Grid>
    )
}