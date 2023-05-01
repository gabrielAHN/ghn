
import citylover from '../ghn-website/assets/citylover.png';
import React, { useState, useEffect } from 'react';
import CityloverIntro from './citylover_components/citylover-intro';
import CityloverWork from './citylover_components/citylover-work';
import CityloverPosts from './citylover_components/citylover-post/citylover-posts';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


function Citylover() {
  const [value, setValue] = useState('city_work');
  const [PostData, setPostData] = useState([]);
  const [BrandData, setBrandData] = useState([]);
  const [JobsData, setJobsData] = useState([]);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(
    () => {

      const fetchBrandData = async () => {
        try {
          const response = await fetch("https://ghn-public-data.s3.amazonaws.com/citylover-data/brand_dict.json");
          const jsonData = await response.json();
          setBrandData(jsonData);
        } catch (error) {
          console.error(error);
        }
      };
      const fetchJobsData = async () => {
        try {
          const response = await fetch("https://ghn-public-data.s3.amazonaws.com/citylover-data/jobs_data.json");
          const jsonData = await response.json();
          setJobsData(jsonData);
        } catch (error) {
          console.error(error);
        }
      };
      const fetchPostData = async () => {
        try {
          const response = await fetch("https://ghn-public-data.s3.amazonaws.com/citylover-data/post_data.json");
          const jsonData = await response.json();
          setPostData(jsonData);
        } catch (error) {
          console.error(error);
        }
      };

      fetchJobsData();
      fetchBrandData();
      fetchPostData();
    }, []);



  var tab_list = [
      {
        url: 'city_work',
        label: 'Work for Cities 💼',
        component: <CityloverWork BrandData={BrandData} 
          JobsData={JobsData} JobsDataFunction={setJobsData}/>
      },
      {
        url: 'city_news',
        label: 'News about Cities 📰',
        component: <CityloverPosts PostsData={PostData} BrandData={BrandData} />
      }
      // {
      //   url: 'city_intro',
      //   label: ' 👋',
      //   component: <CityloverIntro />
      // }
    ]


  return (
    <div className="header">
      <div style={{ margin: '3%' }}>
        <img src={citylover} style={{ width: '30%' }} />
        <h1>Welcome</h1>
        <p>Citylover is the place to find work 💼, or find the latest news 📰 about cities.</p>
        <p>I built this for myself to make this easier to track it all, but now opening this up for all.</p>
        <p>If you want to see more cool things like this checkout <a
        className="link-style" href={'/'}
        style={{
          'color': 'black',
          'textDecoration': 'none',
        }}>gabrielhn.com</a></p>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} centered>
              {
              tab_list.map((tab, index) => (
                <Tab wrapped 
                key={index}
                label={tab.label}
                value={tab.url}
                onClick={() => setValue(`${tab.url}`)} />
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
