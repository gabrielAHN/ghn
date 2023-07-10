import React, { useState, useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';

import HeatMapWidget from './citibike-graphs/citibike_heat_graph/citibike_heat_map';
import LineGraph from './citibike-graphs/citibike_line_graph/citibike_by_user';
import CitibikeMap from './citibike-maps/station-map';
import CitiTripMap from './citibike-trips/trips-map';


function Citibike() {
  const [HeatMapData, setHeatMapData] = useState([]);
  const [LineGraphData, setLineGraphData] = useState([]);
  const [DockMapData, setDockMapData] = useState([]);
  const [CitibikeDates, setCitibikeDates] = useState([]);

  useEffect(
    () => {
      const fetchHeatData = async () => {
        try {
          const response = await fetch("https://ghn-public-data.s3.amazonaws.com/citibike-data/heat_graph.json");
          const jsonData = await response.json();
          setHeatMapData(jsonData);
        } catch (error) {
          console.error(error);
        }
      };

      const fetchLineData = async () => {
        try {
          const response = await fetch("https://ghn-public-data.s3.amazonaws.com/citibike-data/line_graph.json");
          const jsonData = await response.json();
          setLineGraphData(jsonData);
        } catch (error) {
          console.error(error);
        }
      };

      const fetchDockMapData = async () => {
        try {
          const response = await fetch("https://ghn-public-data.s3.amazonaws.com/citibike-data/dock_map.json");
          const jsonData = await response.json();
          setDockMapData(jsonData);
        } catch (error) {
          console.error(error);
        }
      };
      const fetchCitibikeDates = async () => {
        try {
          const response = await fetch("https://ghn-public-data.s3.amazonaws.com/citibike-data/date_data.json");
          const jsonData = await response.json();
          setCitibikeDates(jsonData);
        } catch (error) {
          console.error(error);
        }
      };

      fetchCitibikeDates();
      fetchDockMapData();
      fetchLineData();
      fetchHeatData();
    }, []);
    
  return (
    <div style={{ margin: 20, minWidth: '50%' }}>
      <h1>Citibike 🚲 Deepdive</h1>
      <a className="link-style" href={'/'}
        style={{
          'color': 'black',
          'textDecoration': 'none',
        }}>gabrielhn.com</a>
      <p>Citibike data can be an overloading experience 🤯 to explore so I made 
        some interesting anaylsis for the data across the years to find out how New Yorkers are using the biking.
      </p>
      <IconButton href='https://github.com/gabrielAHN/Citibike-Deepdive' target='_blank'>
          <GitHubIcon />
      </IconButton>
      
      <h2>Citibike Users Rides Over the Years 🚴‍♂️</h2>
      <p>There are different plans for riding citibikes from 1 day rentals, 3 day rentals to an annual pass 🎫.</p>
      <p>This line graph 📈 shows the number of rides per month and year for the short term plans, and the annual plans.</p>
      <LineGraph data={LineGraphData} />
      
      <h2>Citibike Trips Activity per Hour for each Year</h2>
      <p>The time of day 🌇 is also interesting for when people are using the system.</p>
      <p>Below we have a heat graph 🔥 where we display the amount of trips for each month for hour.</p>
      <HeatMapWidget data={HeatMapData} />
      
      <h2>Citibike Dock Trip Analysis 🕰️</h2>
      <p>Not every citibike dock station in NYC is created equally, and looking through we can see some docks are used more for dropping off bikes versus others where you can quickly find them.</p>
      <p>This map helps you better see 👀 which type of docks is there plus more interesting information like the number of dock trips over time for that dock.</p>
      {
        DockMapData.length >= 1 ? (
          <CitibikeMap data={DockMapData} CitibikeDate={CitibikeDates} />
        ) :
          <>Loading ⏳</>
      }
      <h2>Citibike Top 10 Trips by Year 🏆</h2>
      <p>Everyone has their favorite type of bike trips these are the top 🔟 citibike trips per year.</p>
      <p>When you get a chance check them the out they are definitely a fun way to spend the weekend 😎. </p>
      <CitiTripMap />
    </div>
  );
}

export default Citibike;
