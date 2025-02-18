import { useState } from 'react';
import dynamic from 'next/dynamic';
import { BIO_INFO } from '../BioData';
import MapInfo from './MapInfo'

const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
});

function BioMap() {
  const [state, setState] = useState({
    viewState: BIO_INFO.now.view,
    buttonState: 0,
  });

  return (
    <div className="flex items-center justify-center mt-3">
      <div className="relative h-[15em] w-[90%] rounded-md">
        <MapInfo state={state} setState={setState} />
        <MapComponent state={state}/>
      </div>
    </div>
  );
}

export default BioMap;
