import StationMap from './station-map';

export default function StationEditor({data, station_data}) {

    var station_parts = []

    data.filter(
        (row, index) => ( 
            row.parent_station == station_data.stop_id
        )).map(
            (row, index) => (
                station_parts.push(
                    {
                        name: row.stop_name, code: row.stop_id, 
                        stop_type: row.location_type, coordinates: [
                            Number(row.stop_lon),
                            Number(row.stop_lat)   
                        ]
                    }
                    )
                )
            )
    
    return (
        <div>
            <h1>{station_data.stop_name}</h1>
            <StationMap station_data={station_data} station_parts={station_parts} />
        </div>
    )
};