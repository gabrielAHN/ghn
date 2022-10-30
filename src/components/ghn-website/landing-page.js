import ME from './assets/me.png';
import resume from './assets/public_resume.png';
import wulfz from './assets/wulfz.gif';
import { Grid } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import BioCarousel from './landing-page_components/div-carousel';
import WorkButtons from './landing-page_components/work-buttons';
import Avatar from "@material-ui/core/Avatar";
import ghn_theme from './theme';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

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
    onclick_action: 'mailto: gabrielhn@hey.com'
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
          {buttons_data.map((button, index) => (
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
        {/* <Grid alignItems="center" container spacing={6} justifyContent="center">
          {buttons_data.map((button) => (
            <Grid item key={button.text}>
              <Button
                variant='contained'
                color="primary"
                size="large"
                onClick={() => window.location.replace(button.onclick_action)}>
                {button.text}
              </Button>
            </Grid>
          ))}
          <Button
            variant="contained"
            color="secondary"
            size="small"
            startIcon={<Avatar src={'http://www.wpsimplesponsorships.com/wp-content/uploads/2019/05/cropped-icon-256x256.png'} />}
          >
            Delete
          </Button>
          <Grid item key='citylover'>
            <Button
              variant='contained'
              color="primary"
            // onClick={() => window.location.replace(button.onclick_action)}
            >
              Resume
            </Button>
          </Grid>
        </Grid> */}
        <div>
          <WorkButtons />
          <BioCarousel />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default LandingPage;
