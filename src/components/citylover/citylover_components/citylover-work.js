import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Grid } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import FormatedTable from './citylover-table';


const job_selections = [
    { job: 'Urban Scholars 🧑‍🎓', job_type: ['urban_scholars'] },
    { job: 'Transportation Enthusiast 🚲', job_type: ['transport_enthusiast'] },
    { job: 'City Builders 👷', job_type: ['city_builders'] },
    { job: 'Urban Techies 🧑‍💻', job_type: ['urban_techies'] },
    { job: 'Gov Lovers 📜', job_type: ['gov_lovers'] },
    { job: 'City Sellers 🤑', job_type: ['city_sellers'] },
    { job: 'Other Jobs 🤔', job_type: ['other'] },
]


export default function CityloverWork({ JobsData, BrandData, JobsDataFunction }) {
    const [JobsDataList, setJobsDataList] = useState(JobsData);
    const [JobsDataType, setJobsDataType] = useState(JobsData);
    const [JobsLocation, setJobsLocation] = useState(JobsData);
    const [JobsDataSource, setJobsDataSource] = useState(JobsData);
    const [searched, setSearched] = useState('');
    const [dropdown, setDropDown] = useState('');
    const [dropdown2, setDropDown2] = useState('');
    const [dropdown3, setDropDown3] = useState('');


    function filter_by_job_type(job_list) {
        return Array.from(
            new Set(
                [].concat.apply([],
                    job_list.map(
                        (d) =>
                            d.job_type)
                )
            )
        )
    }

    function filter_by_job_source(job_list) {
        return Array.from(
            new Set(
                job_list.map(
                    (d) =>
                        d.source_name)
            )
        )
    }
    function filter_by_job_country(job_list) {
        return Array.from(
            new Set(
                job_list.map(
                    (d) =>
                        d.country)
            )
        )
    }

    function widget_filter_by_job_type(job_list) {
        return job_selections.filter(
            (item) => {
                return item.job_type.some(
                    (x) => filter_by_job_type(job_list).some(
                        (y) => y === x
                    )
                );
            });
    }




    useEffect(
        () => {

            setJobsDataSource(filter_by_job_source(JobsDataList));
            setJobsDataType(widget_filter_by_job_type(JobsDataList));
            setJobsLocation(filter_by_job_country(JobsDataList));

            if (searched && !dropdown && !dropdown2 && !dropdown3) {
                const filteredData_list = JobsData.filter((item) => {
                    return Object.values(item).join('').toLowerCase().includes(searched.toLowerCase())
                })
                setJobsDataList(filteredData_list);
                setJobsDataType(widget_filter_by_job_type(filteredData_list));
                setJobsLocation(filter_by_job_country(filteredData_list));
                filter_by_job_source(filteredData_list);
            }
            else if (!searched && dropdown && !dropdown2 && !dropdown3) {
                const filteredData_list = JobsData.filter(
                    (item) => {
                        return item && dropdown.job_type.some(
                            (x) => item.job_type.includes(x)
                        );
                    });
                setJobsDataList(filteredData_list);
                setJobsDataSource(filter_by_job_source(filteredData_list));
                setJobsLocation(filter_by_job_country(filteredData_list))
                setJobsDataType(widget_filter_by_job_type(filteredData_list));
            }
            else if (!searched && !dropdown && dropdown2 && !dropdown3) {
                const filteredData_list = JobsData.filter((item) => {
                    return item && dropdown2 == item.source_name
                });
                setJobsDataList(filteredData_list);
                setJobsDataSource(filter_by_job_source(filteredData_list));
                setJobsLocation(filter_by_job_country(filteredData_list))
                setJobsDataType(widget_filter_by_job_type(filteredData_list));
            }
            else if (!searched && !dropdown && !dropdown2 && dropdown3) {
                const filteredData_list = JobsData.filter((item) => {
                    return item && dropdown3 == item.country
                });
                setJobsDataList(filteredData_list);
                setJobsDataSource(filter_by_job_source(filteredData_list));
                setJobsLocation(filter_by_job_country(filteredData_list))
                setJobsDataType(widget_filter_by_job_type(filteredData_list));
            }
            else if (searched && dropdown && !dropdown2 && !dropdown3) {
                const filteredData_list = JobsData.filter(
                    (item) => {
                        return Object.values(item).join('').toLowerCase().includes(searched.toLowerCase())
                    }).filter(
                        (item) => {
                            return item && dropdown.job_type.some(
                                (x) => item.job_type.includes(x)
                            )
                        });
                setJobsDataList(filteredData_list);
                setJobsDataSource(filter_by_job_source(filteredData_list));
                setJobsLocation(filter_by_job_country(filteredData_list));
                setJobsDataType(widget_filter_by_job_type(filteredData_list));
            }
            else if (searched && !dropdown && dropdown2 && !dropdown3) {
                const filteredData_list = JobsData.filter(
                    (item) => {
                        return item && dropdown2 == item.source_name
                    }).filter((item) => {
                        return Object.values(item).join('').toLowerCase().includes(searched.toLowerCase())
                    });
                setJobsDataList(filteredData_list);
                setJobsDataSource(filter_by_job_source(filteredData_list));
                setJobsLocation(filter_by_job_country(filteredData_list));
                setJobsDataType(widget_filter_by_job_type(filteredData_list));
            }
            else if (searched && !dropdown && !dropdown2 && dropdown3) {
                const filteredData_list = JobsData.filter(
                    (item) => {
                        return item && dropdown3 == item.location
                    }).filter((item) => {
                        return Object.values(item).join('').toLowerCase().includes(searched.toLowerCase())
                    });
                setJobsDataList(filteredData_list);
                setJobsDataSource(filter_by_job_source(filteredData_list));
                setJobsLocation(filter_by_job_country(filteredData_list));
                setJobsDataType(widget_filter_by_job_type(filteredData_list));
            }
            else if (!searched && dropdown && dropdown2 && !dropdown3) {
                const filteredData_list = JobsData.filter(
                    (item) => {
                        return item && dropdown2 == item.source_name
                    }).filter(
                        (item) => {
                            return item && dropdown.job_type.some(
                                (x) => item.job_type.includes(x)
                            )
                        });
                setJobsDataList(filteredData_list);
                setJobsDataSource(filter_by_job_source(filteredData_list));
                setJobsLocation(filter_by_job_country(filteredData_list));
                setJobsDataType(widget_filter_by_job_type(filteredData_list));
            }
            else if (!searched && dropdown && !dropdown2 && dropdown3) {
                const filteredData_list = JobsData.filter(
                    (item) => {
                        return item && dropdown3 == item.country
                    }).filter(
                        (item) => {
                            return item && dropdown.job_type.some(
                                (x) => item.job_type.includes(x)
                            )
                        });
                setJobsDataList(filteredData_list);
                setJobsDataSource(filter_by_job_source(filteredData_list));
                setJobsLocation(filter_by_job_country(filteredData_list));
                setJobsDataType(widget_filter_by_job_type(filteredData_list));
            }
            else if (!searched && !dropdown && dropdown2 && dropdown3) {
                const filteredData_list = JobsData.filter(
                    (item) => {
                        return item && dropdown2 == item.source_name
                    }).filter(
                        ((item) => {
                            return item && dropdown3 == item.country
                        }));
                setJobsDataList(filteredData_list);
                setJobsDataSource(filter_by_job_source(filteredData_list));
                setJobsLocation(filter_by_job_country(filteredData_list));
                setJobsDataType(widget_filter_by_job_type(filteredData_list));
            }
            else if (!searched && !dropdown && dropdown2 && dropdown3) {
                const filteredData_list = JobsData.filter(
                    (item) => {
                        return item && dropdown2 == item.source_name
                    }).filter(
                        ((item) => {
                            return item && dropdown3 == item.country
                        }));
                setJobsDataList(filteredData_list);
                setJobsDataSource(filter_by_job_source(filteredData_list));
                setJobsLocation(filter_by_job_country(filteredData_list));
                setJobsDataType(widget_filter_by_job_type(filteredData_list));
            }
            else if (!searched && dropdown && dropdown2 && dropdown3) {
                const filteredData_list = JobsData.filter(
                    (item) => {
                        return item && dropdown2 == item.source_name
                    }).filter((item) => {
                        return item && dropdown3 == item.country
                    }).filter(
                        (item) => {
                            return item && dropdown.job_type.some(
                                (x) => item.job_type.includes(x)
                            )
                        });
                setJobsDataList(filteredData_list);
                setJobsDataSource(filter_by_job_source(filteredData_list));
                setJobsLocation(filter_by_job_country(filteredData_list));
                setJobsDataType(widget_filter_by_job_type(filteredData_list));
            }
            else if (searched && !dropdown && dropdown2 && dropdown3) {
                const filteredData_list = JobsData.filter(
                    (item) => {
                        return item && dropdown2 == item.source_name
                    }).filter((item) => {
                        return item && dropdown3 == item.country
                    }).filter((item) => {
                        return Object.values(item).join('').toLowerCase().includes(searched.toLowerCase())
                    });
                setJobsDataList(filteredData_list);
                setJobsDataSource(filter_by_job_source(filteredData_list));
                setJobsLocation(filter_by_job_country(filteredData_list));
                setJobsDataType(widget_filter_by_job_type(filteredData_list));
            }
            else if (searched && dropdown && !dropdown2 && dropdown3) {
                const filteredData_list = JobsData.filter(
                    (item) => {
                        return item && dropdown.job_type.some(
                            (x) => item.job_type.includes(x)
                        )
                    }).filter((item) => {
                        return item && dropdown3 == item.country
                    }).filter((item) => {
                        return Object.values(item).join('').toLowerCase().includes(searched.toLowerCase())
                    });
                setJobsDataList(filteredData_list);
                setJobsDataSource(filter_by_job_source(filteredData_list));
                setJobsLocation(filter_by_job_country(filteredData_list));
                setJobsDataType(widget_filter_by_job_type(filteredData_list));
            }
            else if (searched && dropdown && dropdown2 && !dropdown3) {
                const filteredData_list = JobsData.filter(
                    (item) => {
                        return item && dropdown2 == item.source_name
                    }).filter((item) => {
                        return Object.values(item).join('').toLowerCase().includes(searched.toLowerCase())
                    }).filter(
                        (item) => {
                            return item && dropdown.job_type.some(
                                (x) => item.job_type.includes(x)
                            )
                        });
                setJobsDataList(filteredData_list);
                setJobsDataSource(filter_by_job_source(filteredData_list));
                setJobsLocation(filter_by_job_country(filteredData_list));
                setJobsDataType(widget_filter_by_job_type(filteredData_list));
            }
            else if (searched && dropdown && dropdown2 && dropdown3) {
                const filteredData_list = JobsData
                    .filter((item) => {
                        return Object.values(item).join('').toLowerCase().includes(searched.toLowerCase())
                    })
                    .filter((item) => {
                        return item && dropdown2 == item.source_name
                    }).filter((item) => {
                        return item && dropdown.job_type.some(
                            (x) => item.job_type.includes(x)
                        )
                    }).filter((item) => {
                        return item && dropdown3 == item.country
                    });
                setJobsDataList(filteredData_list);
                setJobsDataSource(filter_by_job_source(filteredData_list));
                setJobsLocation(filter_by_job_country(filteredData_list));
                setJobsDataType(widget_filter_by_job_type(filteredData_list));
            }
            else {
                setJobsDataList(JobsData);
                setJobsDataSource(filter_by_job_source(JobsData));
                setJobsLocation(filter_by_job_country(JobsData));
                setJobsDataType(widget_filter_by_job_type(JobsData));

            }
        }, [
        setJobsDataSource, filter_by_job_source, filter_by_job_type,
        searched, dropdown, dropdown2, dropdown3, JobsDataType, 
        setJobsDataType, setJobsLocation, filter_by_job_country
    ]);



    if (JobsData == undefined) return (<h1>Loading....</h1>)

    return (
        <TableContainer component={Paper} >
            <Box sx={{ flexGrow: 2, m: 1 }}>
                <Grid container spacing={2} sx={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    <Grid item xs sm={3}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={JobsDataType}
                            getOptionLabel={(option) => option.job}
                            onChange={(event, value) => setDropDown(value)}
                            renderInput={(params) =>
                                (<TextField {...params} label="Type of Jobs" />)
                            }
                        />
                    </Grid>
                    <Grid item xs sm={3}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={JobsDataSource}
                            getOptionLabel={(option) => option}
                            onChange={(event, value) => setDropDown2(value)}
                            renderInput={(params) =>
                                (<TextField {...params} label="Website of Job" />)
                            }
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={JobsLocation}
                            getOptionLabel={(option) => option}
                            onChange={(event, value) => setDropDown3(value)}
                            renderInput={(params) =>
                                (<TextField {...params} label="Country of Job" />)
                            }
                        />
                    </Grid>
                    <Grid item xs={6} sm>
                        <TextField
                            id="outlined-basic"
                            fullWidth
                            label="Search"
                            variant="outlined"
                            placeholder="Search for your dream job 💼"
                            type="text"
                            value={searched}
                            onChange={(event) => setSearched(event.target.value)}
                        />
                    </Grid>
                </Grid>
            </Box>
            <FormatedTable
                data={JobsDataList}
                column_names={['Job Name', 'Company Name', 'Location', 'Date']}
                row_fields={['title', 'company', 'location', 'post_time']}
                message={'No Jobs for that 😳 please try a new search 🔎'}
            />
        </TableContainer>
    );
}
