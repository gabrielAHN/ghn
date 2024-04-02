import Papa from 'papaparse';

function GetPathwaysData(props) {
    const { row, stops, pathways } = props; 

    const nodes = stops.filter(node =>
        [3, 2, 0].includes(Number(node.location_type)) 
        && node.parent_station === row.stop_id
    );
    const nodeIds = new Set(nodes.map(node => node.stop_id));

    const linkData = pathways.filter(item =>
        nodeIds.has(item.from_stop_id) || nodeIds.has(item.to_stop_id)
    );
    return { nodes, links: linkData };
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function GetPathwaysStatus(props){
    const { row, stops, pathways } = props;

    const pathways_object = GetPathwaysData({
        row: row, 
        stops: stops,
        pathways: pathways
    })

    if (pathways_object.links.length > 0) {
        return "✅"
    } else {
        return "❌"
    }
}

function WheelChairStatus(wheelchair_boarding){
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
    const { stopsData,
        pathwaysData,
        setFileError,
        setProgressData,
        setFileStatus,
        setStopsData,
        setStationData,
        setFilterStationData } = props;

    try {
        const pathways = pathwaysData ? Papa.parse(pathwaysData, { header: true }) : { data: [] };
        const stops = Papa.parse(stopsData, { header: true });

        let stationData = {};
        const totalStations = stops.data.filter(row => row.location_type === '1');
        
        for (const [index, row] of totalStations.entries()) {
            const exitCount = stops.data.filter(exitStop =>
                exitStop.location_type === '2' && exitStop.parent_station === row.stop_id
            ).length;

            stationData[row.stop_id] = {
                ...row,
                stop_lat: Number(row.stop_lat),
                stop_lon: Number(row.stop_lon),
                exit_count: exitCount,
                wheelchair_status: WheelChairStatus(row.wheelchair_boarding),
                pathways_status: pathways.data.length > 0 ? GetPathwaysStatus({
                    row: row,
                    stops: stops.data,
                    pathways: pathways.data
                }) : "❌",
                pathways: GetPathwaysData({                    
                    row:row,
                    stops: stops.data,
                    pathways:pathways.data
                })
            };

            const progressPercentage = ((index + 1) / totalStations.length) * 100;
            setProgressData(progressPercentage);
            await delay(2);
        }
        setStationData(stationData);
        setFilterStationData(stationData);
        setStopsData(stops.data);
    } catch (error) {
        console.error('Error processing GTFS data:', error);
        setFileError('Error processing GTFS data');
        setFileStatus('error');
    }
}