// import React from 'react'
import citylover from '../ghn-website/assets/citylover.png';
import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import sources from './job_objects copy.json';
import post_sources from './post_objects.json';
import CityloverIntro from './citylover_components/citylover-intro';
import CityloverTable from './citylover_components/citylover-table';
import CityloverPosts from './citylover_components/citylover-articles';
import { height } from '@mui/system';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';


const tab_list = [
  {
    url: 'city_intro',
    label: 'Intro 👋',
    component: <CityloverIntro />
  },
  {
    url: 'city_work',
    label: 'Work for Cities 💼',
    component: <CityloverTable data={{ sources }} />

  },
  {
    url: 'city_news',
    label: 'News about Cities 📰',
    component: <CityloverPosts data={{ post_sources }} />
  },
  {
    url: 'city_sources',
    label: 'All Sources',
    component: <h1>test</h1>
  }
]


function Citylover() {
  // const [ sources, setsources] = useState(null);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(false);
  const { tab } = useParams();
  const [value, setValue] = useState(`${tab}`);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // useEffect(()=>{
  //   setloading(true);
  //   const getData = async () => {
  //     await fetch('https://raw.githubusercontent.com/gh15hidalgo/gabrielhn/master/gabrielhn_website/structure/scripts/citylover/datasets/job_objects.json?token=GHSAT0AAAAAABX5YAUF73IQBGCLFSRTTWUMYZ2K3FQ')
  //     .then(resp => resp.json())
  //     .then(data => {
  //       setsources(data);
  //       setloading(false);
  //     }).catch( e => {
  //       setError(true);
  //       setloading(false);
  //     })
  //   }
  //   getData();
  // }, []);
  // console.log('******')
  // console.log(error);
  // console.log(loading);
  // console.log('____')
  // if (data is not NULL) return ();
  // console.log(articles);
  // if (sources === null) {return (<h1>Loading....</h1>);}
  // if (error) return (<h1>Error</h1>);
  // if (loading) return (<h1>Loading....</h1>);

  return (
    <div className="header">
      <div style={{ margin: '3%' }}>
        <img src={citylover} style={{ width: '30%' }} />
        <h1>Welcome</h1>
        <p>Citylover is the place to learn 📚, work 💼, or find the latest news about cities.
          I built this for myself to make this easier to track it all, but now opening this up for all.</p>
        <p>If you want to see more cool things like this checkout <a
        className="link-style" href={'/'}
        style={{
          'color': 'black',
          'textDecoration': 'none',
        }}>gabrielhn.com</a></p>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} centered>
              {tab_list.map((tab, index) => (
                <Tab wrapped key={index} label={tab.label} value={tab.url} onClick={() => setValue(`${tab.url}`)} />
              ))
              }
            </TabList>
          </Box>
          {tab_list.map((tab, index) => (
            <TabPanel key={index} value={tab.url} >
              {tab.component}
            </TabPanel>
          ))
          }
        </TabContext>
      </div>
    </div>
  );
}

export default Citylover;
