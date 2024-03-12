import React from 'react';
import { Routes, Route, Redirect } from 'react-router-dom';
import LandingPage from './ghn-website/landing-page';
import Citibike from './citibike/citibike-main';

function Main() {
  return (
    <div className='main'>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/Citibike" element={<Citibike />} />
        <Route path="/Citylover" element={<Redirect to="https://www.citieslover.com/intro" />} />
      </Routes>
    </div>
  );
}
