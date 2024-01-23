import Map from 'react-map-gl';
import DeckGL from '@deck.gl/react';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZWN1YXN1c2hpIiwiYSI6ImNsYnltdTc0NDAwaHozdm4xeHVsNDNuY3gifQ.E2AShv__LnmKLMATat664w';
const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';


export default function MapComponent(props) {
    var layers = props.layers
    var initialViewState = props.initialViewState

    return (
        <DeckGL
            initialViewState={initialViewState}
            controller={true}
            layers={layers}
        >
            <Map
                styleDiffing={true}
                mapStyle={MAP_STYLE}
                mapboxAccessToken={MAPBOX_TOKEN}
            />
        </DeckGL>
    )
}