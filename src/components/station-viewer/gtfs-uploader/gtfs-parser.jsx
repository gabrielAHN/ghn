import Papa from 'papaparse';
import GetPathwaysData from './pathways-processing/nodes-links-creation';


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function WheelChairStatus(wheelchair_boarding) {
    if (String(wheelchair_boarding) === "1") {
        return "✅";
    }
    else if (String(wheelchair_boarding) === "2") {
        return "❌";
    }
    else if (String(wheelchair_boarding) === "0") {
        return "🟡";
    }
    else {
        return "❓";
    }
}

export default async function GtfsParser(props) {
    const { 
        stopsData,
        pathwaysData,
        setFileError,
        setProgressData,
        Signal,
        setFileStatus,
        setStationData,
        setFilterStationData } = props;

        try {
        const pathways = pathwaysData ? Papa.parse(pathwaysData, { header: true }) : { data: [] };
        const stops = Papa.parse(stopsData, { header: true });

        let stationData = {};
        const totalStations = stops.data.filter(row => row.location_type === '1');

        for (const [index, row] of totalStations.entries()) {

            if (Signal && Signal.aborted) {
                return;
            }

            const exitCount = stops.data.filter(exitStop =>
                exitStop.location_type === '2' && exitStop.parent_station === row.stop_id
            ).length;
            stationData[row.stop_id] = {
                ...row,
                stop_lat: Number(row.stop_lat),
                stop_lon: Number(row.stop_lon),
                exit_count: exitCount,
                wheelchair_status: WheelChairStatus(row.wheelchair_boarding),
                ...GetPathwaysData({
                    row: row,
                    stops: stops,
                    pathways: pathways
                })
            };
            const progressPercentage = ((index + 1) / totalStations.length) * 100;
            setProgressData(progressPercentage);
            await delay(2);
        }
        setStationData(stationData);
        setFilterStationData(stationData);
    } catch (error) {
        console.log(error)
        setFileError('Error processing GTFS data');
        setFileStatus('error');
    }
}