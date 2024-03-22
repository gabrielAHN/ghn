import React, { useState, useCallback, useMemo, useEffect } from 'react';
import StationTableViewer from './station-table-view.jsx';
import StationMapViewer from './all-station-map-view.jsx';
import SearchComponent from '../components/search-component.jsx';
import TabContext from '@mui/lab/TabContext';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TableChartIcon from '@mui/icons-material/TableChart';
import MapIcon from '@mui/icons-material/Map';
import FileUploadOutlined from '@mui/icons-material/FileUploadOutlined';
import { Grid } from '@material-ui/core';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";



export default function AllStationViewer(props) {
    const [value, setValue] = useState("0");
    const [SearchText, setSearchText] = useState('');
    const [CheckBox, setCheckBox] = useState("");
    const [CheckBox2, setCheckBox2] = useState("");
    const [DropDown, setDropDown] = useState("");
    const [DropDown2, setDropDown2] = useState("");
    const [PathwaysStatus, setPathwaysStatus] = useState([])
    const [WheelChairStatus, setWheelChairStatus] = useState([])
    const [StopIdData, setStopIdData] = useState([]);
    const [StopNameData, setStopNameData] = useState([]);
    const { FilterStationData, StationData, setFileStatus, setFilterStationData, setSelectStation, setStationData } = props;

    const handleChange = useCallback((event, newValue) => {
        setValue(newValue);
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


    const handleFileUpload = useCallback(() => {
        setStationData([]);
        setFileStatus('not_started');
    }, [setStationData, setFileStatus]);

    function filterWheelChairStatus(filter_data) {
        return Array.from(
            new Set(
                [].concat.apply(
                    [],
                    Object.keys(filter_data).map((key) => filter_data[key].wheelchair_status)
                )
            )
        ).sort();
    }

    function filterPathwaysStatus(filter_data) {
        return Array.from(
            new Set(
                [].concat.apply(
                    [],
                    Object.keys(filter_data).map((key) => filter_data[key].pathways_status)
                )
            )
        ).sort();
    }

    function filter_by_stop_id(filter_data) {
        return Array.from(
            new Set(
                [].concat.apply(
                    [],
                    Object.keys(filter_data).map((key) => key)
                )
            )
        );
    }

    function filterByStopName(filter_data) {
        return Array.from(
            new Set(
                [].concat.apply(
                    [],
                    Object.keys(filter_data).map((key) => filter_data[key].stop_name)
                )
            )
        );
    }

    const tabPanelItems = useMemo(() => [
        {
            label: "Table View",
            value: 0,
            icon: <TableChartIcon />,
            content: (
                <StationTableViewer
                    {...{
                        FilterStationData,
                        setSelectStation,
                        setValue,
                        setFilterStationData,
                        StationData
                    }}
                />
            ),
        },
        {
            label: "Map View",
            value: 1,
            icon: <MapIcon />,
            content: (
                <StationMapViewer
                    {...{
                        FilterStationData,
                        setSelectStation,
                        setValue,
                        setFilterStationData,
                        StationData,
                        DropDown
                    }}
                />
            ),
        },
    ], [FilterStationData, setSelectStation, setValue, setFilterStationData, StationData]);

    useEffect(() => {
        let FilterData = StationData;

        if (SearchText) {
            FilterData = Object.keys(FilterData).map((key, index) => {
                if (StationData[key].stop_name.toLowerCase().includes(SearchText.toLowerCase())) {
                    return StationData[key];
                } else if (StationData[key].stop_id.toLowerCase().includes(SearchText.toLowerCase())) {
                    return StationData[key];
                }
                return undefined;
            }).filter(item => item !== undefined);
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
    }, [StationData, setFilterStationData, SearchText, CheckBox, CheckBox2, DropDown, DropDown2]);


    return (
        <>
            <h1>Station 🚉 Viz</h1>
            <Grid container spacing={1} style={{}}>
                <TabContext value={value}>
                    <Grid item xs={12} md={12} >
                        <TabList onChange={handleChange} centered>
                            {tabPanelItems.map((item, index) =>
                                <Tab
                                    key={item.value}
                                    value={String(index)}
                                    icon={item.icon}
                                    iconPosition="top"
                                    label={item.label}
                                />
                            )}
                            <Tab
                                icon={<FileUploadOutlined />}
                                iconPosition="top"
                                label="Upload New File"
                                component="label"
                                onClick={handleFileUpload}
                            />
                        </TabList>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <SearchComponent
                            {...{ SearchText, setSearchText }}
                        />
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Autocomplete
                            disablePortal
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
                    <Grid item xs={6} md={6}>
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
                    <Grid item xs={12}>
                        {tabPanelItems.map((item, index) => (
                            <TabPanel key={index} value={String(index)}>
                                {item.content}
                            </TabPanel>
                        ))}
                    </Grid>
                </TabContext>
            </Grid>
        </>
    );
}
