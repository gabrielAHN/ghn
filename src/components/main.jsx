import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './ghn-website/landing-page';
import Citylover from './citylover/citylover-main';
import Citibike from './citibike/citibike-main';
import StationViewer from './station-viewer/station-main';


function Main() {
  return (
    <div className='main'>
        <Routes>
          <Route exact path="/" element={<LandingPage/>} />
          <Route path="/Citylover" element={<Citylover/>} />
          <Route path="/StationViewer" element={<StationViewer/>} />
          <Route path="/Citibike" element={<Citibike/>} />
        </Routes>
    </div>
  );
}

export default Main;
