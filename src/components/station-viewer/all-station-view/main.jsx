import { useState, useCallback, useMemo, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import AllStationTableViewer from "./all-station-table-view.jsx";
import StationMapViewer from "./all-station-map-view.jsx";
import SearchComponent from "../components/search-component.jsx";
import { TextField, Autocomplete, Grid } from "@mui/material";
import TableChartIcon from "@mui/icons-material/TableChart";
import MapIcon from "@mui/icons-material/Map";
import StationViewerHeader from "../components/header/main";
import FileUploadOutlined from "@mui/icons-material/FileUploadOutlined";
import ClickTracking from '../../data-tracking/click-tracking.jsx';


export default function AllStationViewer(props) {
  const [HeaderPage, setHeaderPage] = useState("table_view");
  const [SearchText, setSearchText] = useState("");
  const [CheckBox, setCheckBox] = useState("");
  const [CheckBox2, setCheckBox2] = useState("");
  const [DropDown, setDropDown] = useState("");
  const [DropDown2, setDropDown2] = useState("");
  const [PathwaysStatus, setPathwaysStatus] = useState([]);
  const [WheelChairStatus, setWheelChairStatus] = useState([]);
  const [StopIdData, setStopIdData] = useState([]);
  const [StopNameData, setStopNameData] = useState([]);
  const location = useLocation();
  const {
    FilterStationData,
    StationData,
    setFileStatus,
    setFilterStationData,
    setSelectStation,
    setStationData,
  } = props;

  const handleChange = useCallback((event, newValue) => {
    setHeaderPage(newValue);
  }, []);

  const handleChangeCheckBox = useCallback((event, newValue) => {
    setCheckBox(event);
  }, []);
  const handleChangeCheckBox2 = useCallback((event, newValue) => {
    setCheckBox2(event);
  }, []);

  const handleChangeStopIdDropdown = useCallback((event, newValue) => {
    setDropDown(event);
  }, []);

  const handleChangeStopNameDropdown = useCallback((event, newValue) => {
    setDropDown2(event);
  }, []);

  function filterWheelChairStatus(filter_data) {
    return Array.from(
      new Set(
        [].concat.apply(
          [],
          Object.keys(filter_data).map(
            (key) => filter_data[key].wheelchair_status,
          ),
        ),
      ),
    ).sort();
  }

  function filterPathwaysStatus(filter_data) {
    return Array.from(
      new Set(
        [].concat.apply(
          [],
          Object.keys(filter_data).map(
            (key) => filter_data[key].pathways_status,
          ),
        ),
      ),
    ).sort();
  }

  function filter_by_stop_id(filter_data) {
    return Array.from(
      new Set(
        [].concat.apply(
          [],
          Object.keys(filter_data).map((key) => key),
        ),
      ),
    );
  }

  function filterByStopName(filter_data) {
    return Array.from(
      new Set(
        [].concat.apply(
          [],
          Object.keys(filter_data).map((key) => filter_data[key].stop_name),
        ),
      ),
    );
  }

  const tabPanelItems = useMemo(
    () => [
      {
        label: "Table View",
        value: "table_view",
        icon: <TableChartIcon />,
        onClick: () => {
          setHeaderPage("table_view");
          ClickTracking('table_view', location);
        }
      },
      {
        label: "Map View",
        value: 'map_view',
        icon: <MapIcon />,
        onClick: () => {
          setHeaderPage("map_view");
          ClickTracking('map_view', location);
        }
      },
      {
        label: "Upload",
        value: "upload_file",
        icon: <FileUploadOutlined />,
        onClick: () => {
          setStationData([]);
          setFileStatus("not_started");
          ClickTracking('upload_file', location);
        },
      }
    ],
    [
      FilterStationData,
      setSelectStation,
      setHeaderPage,
      setFilterStationData,
      StationData,
    ],
  );

  useEffect(() => {
    let FilterData = StationData;

    if (SearchText) {
      FilterData = Object.keys(FilterData)
        .map((key, index) => {
          if (
            StationData[key].stop_name
              .toLowerCase()
              .includes(SearchText.toLowerCase())
          ) {
            return StationData[key];
          } else if (
            StationData[key].stop_id
              .toLowerCase()
              .includes(SearchText.toLowerCase())
          ) {
            return StationData[key];
          }
          return undefined;
        })
        .filter((item) => item !== undefined);
    }

    if (CheckBox) {
      if (CheckBox.length === 0) {
        FilterData = { ...FilterData };
      } else {
        FilterData = Object.keys(FilterData).reduce((acc, key) => {
          const pathwaysData = FilterData[key].pathways_status;
          if (CheckBox.includes(pathwaysData)) {
            acc[key] = FilterData[key];
          }
          return acc;
        }, {});
      }
    }

    if (CheckBox2) {
      if (CheckBox2.length === 0) {
        FilterData = { ...FilterData };
      } else {
        FilterData = Object.keys(FilterData).reduce((acc, key) => {
          const wheelchairData = FilterData[key].wheelchair_status;
          if (CheckBox2.includes(wheelchairData)) {
            acc[key] = FilterData[key];
          }
          return acc;
        }, {});
      }
    }

    if (DropDown) {
      FilterData = Object.keys(FilterData).reduce((acc, key) => {
        if (DropDown === key) {
          acc[key] = FilterData[key];
        }
        return acc;
      }, {});
    }

    if (DropDown2) {
      FilterData = Object.keys(FilterData).reduce((acc, key) => {
        if (DropDown2 === FilterData[key].stop_name) {
          acc[key] = FilterData[key];
        }
        return acc;
      }, {});
    }

    setFilterStationData(FilterData);
    setStopIdData(filter_by_stop_id(FilterData));
    setWheelChairStatus(filterWheelChairStatus(FilterData));
    setPathwaysStatus(filterPathwaysStatus(FilterData));
    setStopNameData(filterByStopName(FilterData));
  }, [
    StationData,
    setFilterStationData,
    SearchText,
    CheckBox,
    CheckBox2,
    DropDown,
    DropDown2,
  ]);

  return (
    <Grid container spacing={1} >
      <Grid item xs={12} md={12}>
        <StationViewerHeader
          setHeaderPage={setHeaderPage}
          HeaderPage={HeaderPage}
          handleChange={handleChange}
          tabPanelItems={tabPanelItems}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <SearchComponent {...{ SearchText, setSearchText }} />
      </Grid>
      <Grid item xs={6} md={4}>
        <Autocomplete
          disablePortal
          value={StopIdData.length === 1 ? StopIdData[0] : null}
          isOptionEqualToValue={(option, value) => option === value}
          options={StopIdData}
          onChange={(event, value) => handleChangeStopIdDropdown(value)}
          renderInput={(params) => (
            <TextField {...params} label="Stops IDs" />
          )}
        />
      </Grid>
      <Grid item xs={6} md={4}>
        <Autocomplete
          disablePortal
          value={StopNameData.length === 1 ? StopNameData[0] : null}
          isOptionEqualToValue={(option, value) => option === value}
          options={StopNameData}
          onChange={(event, value) => handleChangeStopNameDropdown(value)}
          renderInput={(params) => (
            <TextField {...params} label="Stops Name" />
          )}
        />
      </Grid>
      <Grid item xs={6} md={6}>
        <Autocomplete
          disablePortal
          multiple
          value={PathwaysStatus}
          options={PathwaysStatus}
          isOptionEqualToValue={(option, value) => option === value}
          onChange={(event, value) => handleChangeCheckBox(value)}
          renderInput={(params) => (
            <TextField {...params} label="Pathway Status" />
          )}
        />
      </Grid>
      <Grid item xs={6} md={6} style={{marginBottom: '2vh'}}>
        <Autocomplete
          disablePortal
          multiple
          value={WheelChairStatus}
          options={WheelChairStatus}
          isOptionEqualToValue={(option, value) => option === value}
          onChange={(event, value) => handleChangeCheckBox2(value)}
          renderInput={(params) => (
            <TextField {...params} label="Wheelchair Status" />
          )}
        />
      </Grid>
      {
        HeaderPage === "table_view" ? (
          <AllStationTableViewer
            FilterStationData={FilterStationData}
            setSelectStation={setSelectStation}
            setHeaderPage={setHeaderPage}
            setFilterStationData={setFilterStationData}
            StationData={StationData}
          />
        ) : HeaderPage === "map_view" ? (
          <StationMapViewer
            FilterStationData={FilterStationData}
            setSelectStation={setSelectStation}
            setHeaderPage={setHeaderPage}
            setFilterStationData={setFilterStationData}
            StationData={StationData}
            DropDown={DropDown}
          />
        ) : null
      }
    </Grid>
  );
}
