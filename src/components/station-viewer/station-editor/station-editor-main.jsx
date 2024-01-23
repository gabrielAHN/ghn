import { filter } from 'jszip';
import { Grid } from '@material-ui/core';
import StationMap from './station-map';
import FlowMap from './flow-map/flow-map';



export default function StationEditorMain(props) {
    var filter_station_data = props.filter_station_data
    var station_data = props.station_data

    var select_station = filter_station_data[station_data]

    select_station.pathways.nodes.map(
        (nodes) => {
            if (nodes.location_type === "0")
                return nodes
        }
    )

    var platforms = select_station.pathways.nodes.filter(
        nodes => 
        {
            if (nodes.location_type === "0")
                return nodes
        }
    )

    var exits = select_station.pathways.nodes.filter(
        nodes => 
        {
            if (nodes.location_type === "2")
                return nodes
        }
    )

    var nodes = select_station.pathways.nodes.filter(
        nodes => 
        {
            if (nodes.location_type === "0")
                return nodes
        }
    )

    return (
        <Grid container spacing={1} style={{borderRadius: '4px', padding: '1.25vh'}} >
            <Grid item xs={13} sm={13}>
                <h1>{select_station.stop_name}</h1>
                <h2>Stop/platform: {platforms.length}</h2>
                <h2>Exit: {exits.length}</h2>
            </Grid>
                <StationMap station_data={select_station} />
            test
                {
                    select_station.pathways.links.length > 0 ? 
                    (
                        
                        <FlowMap
                            station_data={select_station}
                        />
                    )
                : null} 

        </Grid>
    )
};