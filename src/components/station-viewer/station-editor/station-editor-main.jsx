import { Grid } from '@material-ui/core';
import StationMap from './station-map/station-map';
import FlowMap from './flow-map/flow-map-main';
import StationTable from './station-table/station-table';




export default function StationEditorMain(props) {
    // const { select_station, filter_station_data, station_data } = props;
    // var filter_station_data = props.filter_station_data
    // var station_data = props.station_data

    // var select_station = filter_station_data[station_data]

    // select_station.pathways.nodes.map(
    //     (nodes) => {
    //         if (nodes.location_type === "0")
    //             return nodes
    //     }
    // )

    // var platforms = select_station.pathways.nodes.filter(
    //     nodes => 
    //     {
    //         if (nodes.location_type === "0")
    //             return nodes
    //     }
    // )

    // var exits = select_station.pathways.nodes.filter(
    //     nodes => 
    //     {
    //         if (nodes.location_type === "2")
    //             return nodes
    //     }
    // )

    // var nodes = select_station.pathways.nodes.filter(
    //     nodes => 
    //     {
    //         if (nodes.location_type === "0")
    //             return nodes
    //     }
    // )
    const { SelectStation,  StationData} = props;

    return (
        <Grid container spacing={2} style={{borderRadius: '4px', padding: '1.25vh'}} >
            <Grid item xs={12} sm={12}>
                <StationTable {...props} />
            </Grid>
            <Grid item xs={12} sm={12}>
                <StationMap {...props} />
            </Grid>
                {
                    StationData[SelectStation].pathways_status === '✅' ? 
                    (
                        <FlowMap {...props} />
                    ): null
                } 
        </Grid>
    )
};