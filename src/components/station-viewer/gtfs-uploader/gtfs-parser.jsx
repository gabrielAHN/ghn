import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux'
import Papa from 'papaparse';


function GetPathwaysData(props) {
    var row = props.pathway_row
    var stops = props.stops
    var pathways = props.pathways

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

    return { 'nodes': nodes, 'links': link_data }
}


export async function GtfsParser(props) {
    var zipData = props.zipFile
    var set_file_error = props.set_file_error
    var progress_data = props.progress_data
    var set_progress_data = props.set_progress_data
    var set_file_status = props.set_file_status
    var set_stops_data = props.set_stops_data
    var set_station_data = props.set_station_data
    var set_filter_station_data = props.set_filter_station_data


    // const dispatch = useDispatch()

    
    // console.log(zipData.pathways)
    // var zipData = await zipData

    // const PathwaysFile = zipData.file('pathways.txt');
    // const StopFile = zipData.file('stops.txt');
    // console.log(PathwaysFile, StopFile)
    // var FileError = [];

    // if (!PathwaysFile) {
    //     FileError.push('No Pathway file');
    //     set_file_error(FileError)
    // }
    // if (!StopFile) {
    //     FileError.push('No Stop file');
    //     set_file_error(FileError)
    // }
    // if (FileError.length > 0) {
    //     set_file_status('error_zipfile')
    // }
    // else {

        try {

            var pathways_data = Papa.parse(zipData.pathways, { header: true });
            var stops_data = Papa.parse(zipData.stops, { header: true });

            // console.log(pathways_data, stops_data)
            var new_progress = 0;

            var station_data = {};

            var total_stations = stops_data.data.filter(
                (row, index) => (
                    row.location_type == 1
                )
            );
            

            var percentage =  ((1/total_stations.length) * 100)

            for (let i = 1; i <= total_stations.length; i++) {
                // console.log(i, percentage)
                // console.log(progress_data, ((1/total_stations.length) * 100))
                // var new_progress = progress_data + ((1/total_stations.length) * 100)
                // set_progress_data(new_progress)
                // new_progress += percentage
                // set_progress_data((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
                // console.log(i)
                

                var row = total_stations[i-1]

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
                    pathways: GetPathwaysData(
                        {
                        pathway_row:row,
                        stops:stops_data.data,
                        pathways:pathways_data.data
                        }
                    )
                }
                set_progress_data((prevProgress) => (prevProgress + 1));
                // set_progress_data((prevProgress) => (prevProgress + 1));
                // console.log(progress_data);  
                // Add your code here
            }
            set_station_data(station_data);
            set_filter_station_data(station_data);
            set_stops_data(stops_data.data);
            // console.log(station_data)
        //     total_stations.forEach(
        //         // stations,
        //         (row, index) => {
        //             // new_progress += ((1/total_stations.length) * 100)
        //             set_progress_data((prevProgress) => (prevProgress + ((1/total_stations.length) * 100)));
        //             // set_progress_data((prevProgress) => (prevProgress + ((1/total_stations.length) * 100)));
        //             // set_progress_data(prevProgressData => prevProgressData+=((1/total_stations.length) * 100));
        //             // set_progress_data(new_progress)



        //                                 // set_progress_data(prev => new_progress + ((1/total_stations.length) * 100))
        //             // useEffect(
        //             //     () => {             
        //             //     set_progress_data(new_progress)
        //             //   }, []);
        //             // set_progress_data(prev => prev + ((1/total_stations.length) * 100))
        //             // dispatch(set_progress_data(new_progress))

        //             station_data[row.stop_id] = {
        //                 stop_id: row.stop_id,
        //                 stop_name: row.stop_name,
        //                 stop_lat: Number(row.stop_lat),
        //                 stop_lon: Number(row.stop_lon),
        //                 exit_count: stops_data.data.filter(
        //                     (exit_stop, index) => (
        //                         exit_stop.location_type == 2
        //                         && exit_stop.parent_station == row.stop_id
        //                     )
        //                 ).length,
        //                 pathways: GetPathwaysData(
        //                     {
        //                     pathway_row:row,
        //                     stops:stops_data.data,
        //                     pathways:pathways_data.data
        //                     }
        //                 )
        //             };
        //             // console.log(set_progress_data)

        //             // console.log(new_progress, progress_data);
        //             // console.log(new_progress, progress_data);
        //         }
        //     )
        //     // console.log(new_progress)
        //     set_station_data(station_data);
        //     set_filter_station_data(station_data);
        //     set_stops_data(stops_data.data);
        } catch (error) {
            console.error('Error reading the zip file:', error);

    }
}
