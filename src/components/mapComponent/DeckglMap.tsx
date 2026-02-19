import { useCallback } from "react";
import DeckGL from "@deck.gl/react";
import maplibregl from "maplibre-gl";
import { Map } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

function DeckglMap({
  viewState = null,
  initialViewState = null,
  setViewState = null,
  Controller = {},
  MapLayers = [],
  BoundBox,
  setClickInfo,
  mapStyle = "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
  ...rest
}) {
  const restrictViewState = useCallback((newViewState) => {
    if (!BoundBox) return newViewState;

    return {
      ...newViewState,
      longitude: Math.min(
        BoundBox[1][0],
        Math.max(BoundBox[0][0], newViewState.longitude)
      ),
      latitude: Math.min(
        BoundBox[1][1],
        Math.max(BoundBox[0][1], newViewState.latitude)
      )
    };
  }, [BoundBox]);

  const handleViewStateChange = useCallback(
    ({ viewState: newViewState }) => {
      if (setViewState) {
        if (newViewState.transitionDuration > 0) {
          setViewState(newViewState);
        } else {
          setViewState(restrictViewState(newViewState));
        }
      }
    },
    [setViewState, restrictViewState]
  );

  return (
    <DeckGL
      controller={Controller}
      {...(setViewState
        ? { viewState }
        : { initialViewState: initialViewState || viewState })}
      onViewStateChange={handleViewStateChange}
      layers={MapLayers}
      onClick={(event) => {
        if (setClickInfo) setClickInfo(event.object || null);
      }}
      style={{ width: "100%", height: "100%" }}
      {...rest}
    >
      <Map
        mapLib={maplibregl}
        reuseMaps
        mapStyle={mapStyle}
        crossOrigin="anonymous"
        attributionControl={false}
      />
    </DeckGL>
  );
}

export default DeckglMap;