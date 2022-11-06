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



function Row(props, brand) {
    const { row } = props;
    

    return (
        <React.Fragment>
            <TableRow
                hover
                onClick={() => window.open(`${row[0].url}`, "_blank")}
                sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component="th" scope="row">{row[0].title}</TableCell>
                <TableCell align="right">{row[1][row[0].source].name}</TableCell>
                <TableCell align="right">{row[1][row[0].source].name}</TableCell>
                {/* <TableCell align="right">{row.company}</TableCell>
                <TableCell align="right">{row.location}</TableCell>
                <TableCell align="right">{row.post_time}</TableCell> */}
            </TableRow>
        </React.Fragment>
    );
}

export default function CityloverAllTable({ data }) {
    // console.log(data[1])
    const [rows, setRows] = useState(data[0])
    const [searched, setSearched] = useState('');
    // const [dropdown, setDropDown] = useState('');
    
    // useEffect(() => {
    //     if (searched) {
    //         const filteredData_list = data.sources.filter((item) => {
    //             return Object.values(item).join('').toLowerCase().includes(searched.toLowerCase())
    //         })
    //         setRows(filteredData_list);
    //     }
    //     else {
    //         setRows(data.sources);
    //     }
    // }, [searched, dropdown]);

    // if (data.sources === null) return (<h1>Loading....</h1>)

    return (
        <TableContainer component={Paper} >
            <Box sx={{ flexGrow: 1, m: 1 }}>
                <Grid container spacing={2}>
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
                        <TableCell style={{ fontWeight: 'bold' }}>Post Name</TableCell>
                        <TableCell align="right" style={{ fontWeight: 'bold' }}>Source Name</TableCell>
                        <TableCell align="right" style={{ fontWeight: 'bold' }}>Type</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                    Object.entries(rows).length > 0 ? Object.entries(rows).map(
                        ([key, value], index) => (
                            data[0][key].map((post) =>
                            (
                            <Row key={index} row={[post, data[1]]} />
                            )
                        ))):
                        <p>No Jobs for that 😳 please try a new search 🔎</p>
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}
