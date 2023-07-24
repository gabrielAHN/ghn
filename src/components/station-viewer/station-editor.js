import StationMap from './station-map';

export default function StationEditor({data, station_name}) {
    console.log(data)

    var station_data = data.filter(
        (row, index) => (
            row.stop_name == station_name
        )
    )
    console.log(station_data)
    
    return (
        <div>
            <h1>{station_name}</h1>
            <StationMap station_data={station_data} station_name={station_name}/>
        </div>
    )
};