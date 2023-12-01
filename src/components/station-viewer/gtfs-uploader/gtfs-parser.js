import Papa from 'papaparse';


function GetPathwaysData(...props) {
    var row = props[0]
    var stops = props[1]
    var pathways = props[2]

    var nodes = stops.filter(
                (node) => (
                    (node.location_type == 3 || 
                    node.location_type == 2 ||
                    node.location_type == 0) &
                    node.parent_station == row.stop_id 
                )
            )
    
    var nodes_ids = nodes.map(
        (node) => (
            node.stop_id
        )   
    )

    var link_data = pathways.filter(
        item => {
        return nodes_ids.includes(item.from_stop_id) || nodes_ids.includes(item.to_stop_id);
    });

    return {'nodes': nodes, 'links': link_data}
}


export async function GtfsParser(props) {
    var zipData = props.zipFile
    var set_file_error = props.set_file_error
    var set_file_status = props.set_file_status
    var set_stops_data = props.set_stops_data
    var set_station_data = props.set_station_data
    var set_filter_station_data = props.set_filter_station_data

    const PathwaysFile = zipData.file('pathways.txt');
    const StopFile = zipData.file('stops.txt');
    var FileError = [];

    if (!PathwaysFile) {
        FileError.push('No Pathway file');
        set_file_error(FileError)
    }
    if (!StopFile) {
        FileError.push('No Stop file');
        set_file_error(FileError)
    }
    if (FileError.length > 0) {
        set_file_status('error_zipfile')
    }
    else {

        try {

            var stops_data = await StopFile.async('text');
            var pathways_data = await PathwaysFile.async('text');

            var pathways_data = Papa.parse(pathways_data, { header: true });
            var stops_data = Papa.parse(stops_data, { header: true });
            var station_data = {};

            stops_data.data.filter(
                (row, index) => (
                    row.location_type == 1
                )
            ).map(
                (row, index) => (
                    station_data[row.stop_id] = {
                        stop_id: row.stop_id,
                        stop_name: row.stop_name,
                        stop_lat: Number(row.stop_lat),
                        stop_lon: Number(row.stop_lon),
                        exit_count: stops_data.data.filter(
                            (exit_stop, index) => (
                                exit_stop.location_type == 2
                                && exit_stop.parent_station == row.stop_id
                            )
                        ).length,
                        pathways: GetPathwaysData(row, stops_data.data, pathways_data.data)
                        }
                    )
                    
                );
            set_station_data(station_data);
            set_filter_station_data(station_data);
            set_stops_data(stops_data.data);
        } catch (error) {
            console.error('Error reading the zip file:', error);
        }
    }
}
