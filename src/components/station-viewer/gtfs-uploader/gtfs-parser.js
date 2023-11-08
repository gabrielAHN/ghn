import Papa from 'papaparse';


export async function GtfsParser(...props) {
    var zipData = props[0]
    var set_file_error = props[1]
    var set_file_status = props[2]
    var set_stops_data = props[3]
    var set_station_data = props[4]
    var set_filter_stationdata = props[5]

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

        set_file_status('started');

        const content =  await StopFile.async('text');
        var data = Papa.parse(content, { header: true });
        var station_data = {};

        // var test = data.data.filter(
        //   (row, index) => (
        //     row.location_type == "2"
        //   ).map(

        // )
        console.log(
            data.data.filter(
                (row, index) => (
                row.location_type == 1
                )
            )
        )

        data.data.filter(
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
                exit_count: data.data.filter(
                (exit_stop, index) => (
                    exit_stop.location_type == 2
                    && exit_stop.parent_station == row.stop_id
                )
                ).length
            }
            )
        );
        set_station_data(station_data);
        set_filter_stationdata(station_data);
        set_stops_data(data.data);
    } catch (error) {
        console.error('Error reading the zip file:', error);
    }
    }
}
