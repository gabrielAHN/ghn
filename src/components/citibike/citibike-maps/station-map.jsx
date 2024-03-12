import React, { useState, useEffect } from 'react';
import Box from "@material-ui/core/Box";
import Map from 'react-map-gl';
import DeckGL from '@deck.gl/react';

import { Grid } from '@material-ui/core';
import Button from '@mui/material/Button';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import Slider from '@mui/material/Slider';
import { ScatterplotLayer } from '@deck.gl/layers';
import StationGraphs from './components/StationGraphs';

const MAPBOX_TOKEN = import.meta.env.VITE_LINKEDIN_URL;

const INITIAL_VIEW_STATE = {
  latitude: 40.7257548,
  longitude: -73.9957581,
  zoom: 12,
  maxZoom: 16,
  pitch: 0,
  bearing: 0
};

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';


function GetMonthName(monthNumber) {
  var monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];
  return monthNames[monthNumber];
}

function getYear(data) {
  let marks = [];

  var year_array = Array.from(
    new Set(data.map(obj => obj[Object.keys(obj)[0]]))
  )

  for (let i = 0; i < year_array.length; i++) {
    marks.push({
      value: i,
      label: year_array[i]
    })
  }
  return marks;
}

function getMonth(data, years) {
  let months = {};

  for (let i = 0; i < years.length; i++) {

    const filteredArray =
      data.filter(
        (x) =>
          x.year === years[i].label
      ).map(
        (key) => {
          return key.day
        }
      ).map(
        (key, index) => {
          return {
            value: index,
            label: GetMonthName(parseInt(key) - 1)
          }
        }
      )

    months[years[i].label] = filteredArray;
  }
  return months;
}



function rgbtohtml(rgb) {
  return '#' + rgb.map(function (x) {
    return ('0' + parseInt(x).toString(16)).slice(-2);
  }).join('');
}


function BorderColor(clickInfo, NewFilterDate) {

  var row_date = clickInfo.object.date_data[NewFilterDate]

  var total = row_date['start'] + row_date['end']

  if (row_date['start'] / total >= 0.51) {
    var color = [245, 19, 19]
  } else if (
    row_date['end'] / total >= 0.51
  ) {
    var color = [19, 102, 245]
  } else {
    var color = [246, 208, 19]
  }

  return color
}


export default function CitibikeMap({ strokeWidth = 1, mapStyle = MAP_STYLE, data, CitibikeDate }) {
  const YearDate = getYear(CitibikeDate);
  const MonthDate = getMonth(CitibikeDate, YearDate);
  const [YearSlider, setYearSlider] = useState(YearDate[0]);
  const [MonthSlider, setMonthSlider] = useState(0);
  const [NewFilterDate, setNewFilterDate] = useState('1/2017');

  const [isRunning, setIsRunning] = useState(false);
  const [clickInfo, setClickInfo] = useState(null);
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);

  function get_filter_label(MonthSlider, YearSlider, MonthDate, YearDate, setMonthSlider) {

    const month = MonthDate[YearSlider.label]

    if (month[MonthSlider] === undefined) {
      setMonthSlider(month[0].value);
      return month[0].value + 1 + '/' + YearSlider.label;
    } else {
      return month[MonthSlider].value + 1 + '/' + YearSlider.label;
    }
  }



  function NewChangeDate(event, newValue) {

    var YearMonths = MonthDate[YearSlider.label]
      .map((month) => month.value)

    var LastMonth = YearMonths[YearMonths.length - 1]

    var NewYear = YearDate[YearSlider.value + 1]
    var NewMonth = MonthSlider + 1

    if (NewYear === undefined && NewMonth > LastMonth) {
      setYearSlider(YearDate[0]);
      setMonthSlider(0);
      setNewFilterDate(
        get_filter_label(0, YearDate[0], MonthDate, YearDate, setMonthSlider)
      );
    } else if (NewMonth >= 12) {
      setYearSlider(NewYear);
      setMonthSlider(0);
      setNewFilterDate(
        get_filter_label(0, NewYear, MonthDate, YearDate, setMonthSlider)
      );
    } else if (YearMonths.includes(NewMonth) === true) {
      setMonthSlider(NewMonth);
      setNewFilterDate(
        get_filter_label(NewMonth, YearSlider, MonthDate, YearDate, setMonthSlider)
      );
    };

  }

  function YearChange(event, newValue) {

    var month = MonthDate[YearSlider.label][MonthSlider]

    if (month === undefined) {
      var month = MonthDate[YearSlider.label][0];
      setMonthSlider(0);
    }
    setYearSlider(YearDate[newValue]);
    setNewFilterDate(
      get_filter_label(MonthSlider, YearDate[newValue], MonthDate, YearDate, setMonthSlider)
    );
  }

  function MonthChange(event, newValue) {
    setMonthSlider(newValue);
    setNewFilterDate(
      get_filter_label(newValue, YearSlider, MonthDate, YearDate, setMonthSlider)
    );
  }

  const handleViewStateChange = ({ viewState }) => {
    setViewState(viewState);
  };

  useEffect(
    () => {
      let interval;

      if (isRunning) {
        interval = setInterval(
          () => {
            NewChangeDate(YearSlider, MonthSlider, YearDate);
          }, 1500);
      }
      return () => clearInterval(interval);
    }, [isRunning, YearSlider, MonthSlider, YearDate]);

  function toggleRunning() {
    setIsRunning(!isRunning);
  }

  function GetRadius(row, now_date) {
    var row_date = row[now_date]
    if (row_date === undefined) {
      return 0
    }
    else if (row_date['end'] <= row_date['start']) {
      return row_date['start'] * 0.0001
    } else {
      return row_date['end'] * 0.0001
    }
  }

  function GetLineWidth(row, clickInfo) {
    if (
      clickInfo != null &&
      clickInfo.object.station_id === row.station_id
    ) {
      return 25
    } else {
      return 10
    }
  }

  function GetSum(station_info, NewFilterDate) {
    var row_date = station_info.object.date_data[NewFilterDate]
    var sum = row_date['start'] + row_date['end']
    return sum
  }


  function GetColor(row, now_date, color_type, clickInfo) {

    var row_date = row.date_data[now_date]


    if (row_date === undefined) {
      var color = [0, 0, 0, 0]
    } else {
      var total = row_date['start'] + row_date['end']
      if (row_date != undefined && row_date['start'] / total >= 0.51) {
        var color = [245, 19, 19]
      } else if (
        row_date != undefined &&
        row_date['end'] / total >= 0.51
      ) {
        var color = [19, 102, 245]
      } else {
        var color = [246, 208, 19]
      }
    }

    if (color_type === 'fill') {
      color[3] = 100
    }

    if (
      clickInfo != null &&
      clickInfo.object.station_name === row.station_name
    ) {
      var color = [0, 0, 0]
    }
    return color
  }

  var layers = [
    new ScatterplotLayer({
      id: 'CitibikeMap',
      data: data,
      getPosition: d => [d.longitude, d.latitude],
      radiusScale: 150,
      getRadius: d => GetRadius(d.date_data, NewFilterDate),
      stroked: true,
      getLineColor: d => GetColor(d, NewFilterDate, 'stroke', clickInfo),
      getFillColor: d => GetColor(d, NewFilterDate, 'fill'),
      getLineWidth: d => GetLineWidth(d, clickInfo),
      pickable: true,
      onClick: (info) => {
        setClickInfo(info);
        setViewState(
          {
            latitude: info.coordinate[1],
            longitude: info.coordinate[0],
            zoom: 14,
            transitionDuration: 375
          });
      },
      updateTriggers: {
        getLineWidth: d => GetLineWidth(d, clickInfo),
        getLineColor: d => GetColor(d, NewFilterDate, 'stroke', clickInfo),
        getRadius: NewFilterDate,
        getFillColor: d => GetColor(d, NewFilterDate, 'fill'),
      }
    })
  ];

  return (
    <Box sx={{ marginBottom: 10 }}>
      <Grid container spacing={2}>
        <Grid item xs sm={2} >
          <Button
            size="large"
            variant="contained"
            color={isRunning ? 'error' : 'success'}
            onClick={toggleRunning}
            startIcon={
              isRunning ? <StopCircleIcon />
                : <PlayCircleIcon />}
          >
            {isRunning ? 'Stop' : 'Play'}
          </Button>
        </Grid>
        <Grid item xs={12} sm={10} >
          <Slider
            value={YearSlider.value}
            onChange={YearChange}
            min={0}
            valueLabelDisplay="auto"
            marks={YearDate}
            max={YearDate.length - 1}
          />

          <Slider
            value={MonthSlider}
            onChange={MonthChange}
            min={0}
            valueLabelDisplay="auto"
            marks={MonthDate[YearSlider.label]}
            max={MonthDate[YearSlider.label].length - 1}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} >
        <Grid item
          xs
          sm={12}
          md={clickInfo === null ? 12 : 9}
        >
          <DeckGL
            style={{
              position: 'relative',
              height: '80vh',
              width: '100%'
            }}
            width='100%'
            viewState={viewState}
            onViewStateChange={handleViewStateChange}
            controller={true}
            layers={layers}
          >
            <Map
              mapStyle={mapStyle}
              preventStyleDiffing={true}
              mapboxAccessToken={MAPBOX_TOKEN}
            />
            <div
              style={{ position: 'absolute', top: '5%', left: '5%' }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }} >
                <span style={{ marginRight: '10px' }}>Most Trips Ended Dock</span>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'rgb(245, 19, 19)' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }} >
                <span style={{ marginRight: '10px' }}>Most Trips Started Dock</span>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'rgb(19, 102, 245)' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }} >
                <span style={{ marginRight: '10px' }}>Similiar Amount of Trip Types</span>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'rgb(246, 208, 19)' }} />
              </div>
            </div>
          </DeckGL>
        </Grid>
        <Grid
          item
          sm={12}
          md={clickInfo === null ? 1 : 3}
          style={{ position: 'relative', width: '100%' }}
        >
          {clickInfo ? (
            <div
              style={{
                position: 'relative',
                height: '80vh',
                border: '5px solid ' +
                  rgbtohtml(BorderColor(clickInfo, NewFilterDate)),
                borderRadius: '15px'
              }}
            >
              <h3>{clickInfo.object.station_name}</h3>
              <h6>{GetSum(clickInfo, NewFilterDate)} total trips on {GetMonthName(MonthSlider)} of {YearSlider.label}</h6>
              <StationGraphs
                station_info={clickInfo.object}
                slider_data={NewFilterDate}
                years_data={YearDate}
              />
            </div>
          ) : null}
        </Grid>
      </Grid>
    </Box>
  );
}
