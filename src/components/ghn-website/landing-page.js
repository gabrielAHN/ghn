import ME from './assets/me.png';
import wulfz from './assets/wulfz.gif';
import { Grid } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import BioCarousel from './landing-page_components/Bio-carousel';
import WorkButtons from './landing-page_components/work-buttons';
import citylover from './assets/citylover.png';
import cityloverhover from './assets/workbutton-images/citylover-hover.gif'
import citibikemap from './assets/workbutton-images/citibike-map.jpeg'
import citibikehover from './assets/workbutton-images/citibike-hover.gif'
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import IconButton from '@mui/material/IconButton';

import ghn_theme from './theme';
import React, { useState, useEffect } from 'react';



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
      "name": "Citylover",
      "image": citylover,
      "hover_image": cityloverhover,
      "color": "white",
      "url": 'citylover'

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

  useEffect(() => {
    if (count == 3) {
          setPhoto(wulfz);
        }
    else if (count > 3) {
      setPhoto(ME);
      setCount(0);
    };
  }, [count]);

  return (
    <ThemeProvider theme={ghn_theme}>
      <div style={{ margin: '2.5%' }}>
        <img src={photo}
          onClick={()=> setCount(count+1)}
          style={{width: '40%', borderRadius: '50%'}}
          />
        <h1 className="h1-ghn">Gabriel Hidalgo ~ Naranjo</h1>
        <h4 className="h2-ghn">Art 🧑‍🎨, Cities 🌇, and Tech🦾</h4>
        <Grid alignItems="center" container spacing={6} justifyContent="center">
          {
          buttons_data.map((button, index) => (
            <Grid item key={index}>
              <a className="link-style" href={button.onclick_action}
                  style={{
                    'fontSize': 30,
                    'color': 'black',
                    'textDecoration': 'none',
                    'fontFamily': 'Quicksand, sans-serif'
                  }}
              >{button.text}</a>
             </Grid>
          ))}
        </Grid>
        <br/>
        <br/>
        <div>
          <WorkButtons photo_buttons={photo_buttons}/>
          <BioCarousel />
        </div>
        <div id="contact" >
            <IconButton href='https://github.com/gh15hidalgo' target='_blank'>
              <GitHubIcon />
            </IconButton>
            <IconButton href="mailto:example@example.com">
              <EmailIcon />
            </IconButton>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default LandingPage;
