import { useState, lazy, Suspense } from "react";
import { BIO_INFO } from "../BioData";
import MapInfo from "./MapInfo";

const DeckglMap = lazy(() => import("@/components/mapComponent/DeckglMap"));

function BioMap() {
  const [state, setState] = useState({
    viewState: BIO_INFO.now.view,
    buttonState: 0,
  });

  return (
    <div className="flex items-center justify-center mt-3">
      <div className="relative h-[15em] w-[90%] rounded-md">
        <MapInfo state={state} setState={setState} />
        <Suspense fallback={<div>Loading map...</div>}>
          <DeckglMap
            initialViewState={state.viewState}
            Controller={{
              dragPan: false,
              dragRotate: false,
              scrollZoom: false,
            }}
          />
        </Suspense>
      </div>
    </div>
  );
}

export default BioMap;
