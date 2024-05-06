import ME from './assets/me.png';
import wulfz from './assets/wulfz.gif';
import { Grid } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';
import BioMain from './landing-page_components/bio/bio-main';
import WorkButtons from './landing-page_components/work-buttons';
import citieslover from './assets/citieslover.png';
import citiesloverhover from './assets/workbutton-images/citieslover-hover.gif'
import citibikemap from './assets/workbutton-images/citibike.png'
import citibikehover from './assets/workbutton-images/citibike-hover.gif'
import jenreyes from './assets/workbutton-images/jenreyes.png'
import jenreyeshover from './assets/workbutton-images/jenreyes-hover.gif'
import stationviz from './assets/workbutton-images/station-viz.png'
import stationvizhover from './assets/workbutton-images/station-viz.gif'
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import IconButton from '@mui/material/IconButton';

import ghn_theme from './theme';
import React, { useState, useEffect } from 'react';
import ClickTracking from '../data-tracking/click-tracking';


const buttons_data = [
  {
    text: 'Work',
    onclick_action: '/#work'
  },
  {
    text: 'Bio',
    onclick_action: '/#bio'
  },
  {
    text: 'Contact',
    onclick_action: '/#contact'
  }
]

const photo_buttons = [
  {
    "name": "Station Viz",
    "image": stationviz,
    "hover_image": stationvizhover,
    "color": "black",
    "url": 'StationViewer'
},
  {
    "name": "Cities Lover",
    "image": citieslover,
    "hover_image": citiesloverhover,
    "color": "white",
    "url": 'https://citieslover.com '

  },
  {
    "name": "Citibike Deep Dive",
    "image": citibikemap,
    "hover_image": citibikehover,
    "color": "black",
    "url": 'citibike'
  }
]

function LandingPage() {
  const [count, setCount] = useState(0);
  const [photo, setPhoto] = useState(ME);
  const location = useLocation();


  useEffect(() => {
    if (count == 3) {
      setPhoto(wulfz);
    }
    else if (count > 3) {
      setPhoto(ME);
      setCount(0);
    }
  }, [count]);
  

  return (
    <ThemeProvider theme={ghn_theme}>
      <div style={{ margin: '2.5%' }}>
        <img src={photo}
          onClick={() => setCount(count + 1)}
          style={{ width: '45vh', borderRadius: '50%',margin: 'auto'}}
        />
        <h1 className="h1-ghn">Gabriel Hidalgo ~ Naranjo</h1>
        <h4 className="h2-ghn">Art 🧑‍🎨, Cities 🌇, and Tech🦾</h4>
        <Grid alignItems="center" container spacing={6} justifyContent="center">
          {
            buttons_data.map((button, index) => (
              <Grid item key={index}>
                <a className="link-style" style={{fontSize: '2em'}} 
                href={button.onclick_action} 
                onClick={()=>ClickTracking(button.text, location)}
                >
                  {button.text}
                </a>
              </Grid>
            ))}
        </Grid>

        <div id="work" className="h2-ghn">
          <h1>Work</h1>
          <WorkButtons photo_buttons={photo_buttons} />
        </div>
        <div id="bio" className="h2-ghn">
          <BioMain />
        </div>
        <div id="contact" className="h2-ghn" >
          <h1>Contact</h1>
          <IconButton href='https://github.com/gabrielAHN' target='_blank'
            onClick={()=>ClickTracking('GitHub', location)}
          >
            <GitHubIcon />
          </IconButton>
          <IconButton href="mailto:gabrielhn@hey.com">
            <EmailIcon />
          </IconButton>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default LandingPage;
