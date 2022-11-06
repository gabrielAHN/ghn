import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Grid } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



function Row(props) {
    const { row } = props;

    return (
        <React.Fragment>
            <TableRow
                hover
                onClick={() => window.open(`${row.url}`, "_blank")}
                sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component="th" scope="row">{row.title}</TableCell>
                <TableCell align="right">{row.company}</TableCell>
                <TableCell align="right">{row.location}</TableCell>
                <TableCell align="right">{row.post_time}</TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const job_selections = [
    { job: 'Urban Planner', job_type: ['urban_planning'] },
    { job: 'Transportation Enthusiast', job_type: ['scooters'] },
    { job: 'Government Work', job_type: ['gov_work'] }
]

export default function CityloverTable({ data }) {
    const [rows, setRows] = useState(data.sources)
    const [searched, setSearched] = useState('');
    const [dropdown, setDropDown] = useState('');

    useEffect(() => {
        if (searched && !dropdown) {
            const filteredData_list = data.sources.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searched.toLowerCase())
            })
            setRows(filteredData_list);
        }
        else if (!searched && dropdown) {
            const filteredData_list = data.sources.filter((item) => {
                return item && dropdown.job_type.some(
                    (x) => item.job_type.includes(x)
                );
            });
            setRows(filteredData_list);
        }
        else if (searched && dropdown) {
            const filteredData_list = data.sources.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searched.toLowerCase())
            }).filter((item) => {
                return item && dropdown.job_type.some(
                    (x) => item.job_type.includes(x)
                );

            });
            setRows(filteredData_list);
        }
        else {
            setRows(data.sources);
        }
    }, [searched, dropdown]);

    if (data.sources === null) return (<h1>Loading....</h1>)

    return (
        <TableContainer component={Paper} >
            <Box sx={{ flexGrow: 1, m: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs sm={4}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={job_selections}
                            getOptionLabel={(option) => option.job}
                            onChange={(event, value) => setDropDown(value)}
                            renderInput={(params) =>
                                (<TextField {...params} label="Type of Jobs" />)
                            }
                        />
                    </Grid>
                    <Grid item xs sm={8}>
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
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ fontWeight: 'bold' }}>Job Name</TableCell>
                        <TableCell align="right" style={{ fontWeight: 'bold' }}>Company Name</TableCell>
                        <TableCell align="right" style={{ fontWeight: 'bold' }}>Location</TableCell>
                        <TableCell align="right" style={{ fontWeight: 'bold' }}>Post Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.length > 0 ? rows.map(
                        (row, index) => 
                            (
                                <Row key={index} row={row} />
                            )
                    ):
                    <p>No Jobs for that 😳 please try a new search 🔎</p>
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}
