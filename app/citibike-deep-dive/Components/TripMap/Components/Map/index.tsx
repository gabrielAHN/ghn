import { useState } from "react";
import dynamic from "next/dynamic";


const MapSection = dynamic(() => import("./MapSection"), {
    ssr: false,
});

function Map({ MapData, ActiveTrips, CurrentTime }) {
    const [viewState, setViewState] = useState({
        latitude: 40.739,
        longitude: -73.98905,
        zoom: 12,
    });
    return (
        <div className="relative h-[34em] w-full overflow-hidden">
            <MapSection
                MapData={MapData}
                ActiveTrips={ActiveTrips}
                CurrentTime={CurrentTime}
                viewState={viewState}
                setViewState={setViewState}
            />
        </div>
    );
}

export default Map;