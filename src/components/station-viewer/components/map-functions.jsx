export function findCenter(data) {
    let coordinates = Object.values(data).map(({ stop_lat, stop_lon }) => ({ lat: parseFloat(stop_lat), lon: parseFloat(stop_lon) }))
    if (coordinates.length === 0) {
        return { lat: 0, lon: 0 };
    } else if (coordinates.length === 1) {
        return coordinates[0];
    }

    const avgLat = coordinates.reduce((sum, coord) => sum + coord.lat, 0) / coordinates.length;
    const avgLon = coordinates.reduce((sum, coord) => sum + coord.lon, 0) / coordinates.length;

    return { lat: avgLat, lon: avgLon };
};

export function getBoundingBox(data) {
    let minLat = Infinity, maxLat = -Infinity, minLng = Infinity, maxLng = -Infinity;

    Object.values(data).forEach(row => {
        minLat = Math.min(minLat, parseFloat(row.stop_lat));
        maxLat = Math.max(maxLat, parseFloat(row.stop_lat));
        minLng = Math.min(minLng, parseFloat(row.stop_lon));
        maxLng = Math.max(maxLng, parseFloat(row.stop_lon));
    });
    return {
        minLat,
        minLng,
        maxLat,
        maxLng
    };
};