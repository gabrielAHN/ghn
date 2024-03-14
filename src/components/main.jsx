<<<<<<< HEAD
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './ghn-website/landing-page.jsx';
import Citylover from './citylover/citylover-main.jsx';
import Citibike from './citibike/citibike-main.jsx';
import StationViewer from './station-viewer/station-main.jsx';
=======
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './ghn-website/landing-page';
import Citibike from './citibike/citibike-main';
>>>>>>> main

export default function Main() {

  return (
    <div className='main'>
<<<<<<< HEAD
        <Routes>
          <Route exact path="/" element={<LandingPage/>} />
          <Route path="/Citylover" element={<Citylover/>} />
          <Route path="/StationViewer" element={<StationViewer/>} />
          <Route path="/Citibike" element={<Citibike/>} />
        </Routes>
=======
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/Citibike" element={<Citibike />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
>>>>>>> main
    </div>
  );
}