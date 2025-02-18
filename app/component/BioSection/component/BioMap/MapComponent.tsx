import DeckGL from '@deck.gl/react';
import maplibregl from 'maplibre-gl';
import { Map } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

function MapComponent({ state }) {
    return (
        <DeckGL
            controller={{
                "dragPan": false,
                "dragRotate": false,
                "scrollZoom": false
            }}
            initialViewState={state.viewState}
            style={{ width: '100%', height: '100%' }}
        >
            <Map
                mapLib={maplibregl}
                reuseMaps
                className="rounded-sm"
                mapStyle="https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json"
            />
        </DeckGL>
    );
}

export default MapComponent;
