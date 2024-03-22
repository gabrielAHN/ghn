
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './ghn-website/landing-page';
import Citibike from './citibike/citibike-main';
import StationViewer from './station-viewer/station-main.jsx';

export default function Main() {

  return (
    <div className='main'>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/Citibike" element={<Citibike />} />
        <Route path="/StationViewer" element={<StationViewer/>} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </div>
  );
}