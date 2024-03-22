import Map from 'react-map-gl';
import DeckGL from '@deck.gl/react';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPS_API;
const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';




export default function MapComponent(props) {
    const { setClickInfo, viewState, MapLayers, onViewStateChange, BOUNDS } = props;

    const handleViewStateChange = ({ viewState }) => {
        const longitude = Math.max(BOUNDS.minLng, Math.min(BOUNDS.maxLng, viewState.longitude));

        const latitude = Math.max(BOUNDS.minLat, Math.min(BOUNDS.maxLat, viewState.latitude));

        const zoom = Math.max(BOUNDS.minZoom, Math.min(BOUNDS.maxZoom, viewState.zoom));

        if (longitude !== viewState.longitude || latitude !== viewState.latitude || zoom !== viewState.zoom) {
            onViewStateChange({
                viewState: { ...viewState, longitude, latitude, zoom }
            });
        } else {
            onViewStateChange({ viewState });
        }
    };


    return (
        <DeckGL
            viewState={viewState}
            onViewStateChange={handleViewStateChange}
            controller={true}
            layers={MapLayers}
            onClick={(event) => {
                if (event.layer === null) {
                    setClickInfo(null)
                }
            }}
        >
            <Map
                styleDiffing={true}
                mapStyle={MAP_STYLE}
                mapboxAccessToken={MAPBOX_TOKEN}
            />
        </DeckGL>
    )
}