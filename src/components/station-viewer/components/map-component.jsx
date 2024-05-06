import React, { useCallback } from 'react';
import Map from 'react-map-gl';
import DeckGL from '@deck.gl/react';


const MAPBOX_TOKEN = import.meta.env.VITE_MAPS_API;
const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';

export default function MapComponent(props) {
    const { setClickInfo, viewState, MapLayers, onViewStateChange, bounds, setViewState } = props;

    const handleViewStateChange = useCallback(({ viewState }) => {
        const longitude = Math.max(bounds.minLng, Math.min(bounds.maxLng, viewState.longitude));
        const latitude = Math.max(bounds.minLat, Math.min(bounds.maxLat, viewState.latitude));
        const zoom = Math.max(bounds.minZoom, Math.min(bounds.maxZoom, viewState.zoom));

        const newState = { ...viewState, longitude, latitude, zoom };

        if (longitude !== viewState.longitude || latitude !== viewState.latitude || zoom !== viewState.zoom) {
            setViewState(newState);
        } else {
            setViewState(viewState);
        }
    }, [onViewStateChange, bounds, setViewState, viewState]);

    return (
        <DeckGL
            initialViewState={viewState}
            onViewStateChange={handleViewStateChange}
            controller={true}
            layers={MapLayers}
            onClick={(event) => {
                if (event.object) {
                    setClickInfo(event);
                } else {
                    setClickInfo(null);
                }
            }}
        >
            <Map
                styleDiffing={true}
                mapStyle={MAP_STYLE}
                mapboxAccessToken={MAPBOX_TOKEN}
            />
        </DeckGL>
    );
}