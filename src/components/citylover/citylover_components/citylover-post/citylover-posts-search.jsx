import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Grid } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import FormatedTable from '../citylover-table';
import Button from '@mui/material/Button';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';


export default function CityloverPostSearch({ post_data }) {
    const [PostData, setPostData] = useState(post_data);
    const [PostDataOrg, setPostDataOrg] = useState(post_data);
    const [searched, setSearched] = useState('');

    useEffect(
        () => {
            if (searched) {
                const filteredData_list = PostData.filter((item) => {
                    return Object.values(item).join('').toLowerCase().includes(searched.toLowerCase())
                })
                setPostData(filteredData_list);
            }
            else {
                setPostData(PostDataOrg);
            }
        }, [searched]);

    if (post_data === undefined) return (<h1>Loading....</h1>)

    return (
        <TableContainer component={Paper} >
            <Box sx={{ flexGrow: 1, m: 2 }}>
                <Grid container spacing={2}>
                    <Grid item >
                        <Button
                            size="large"
                            sx={{ marginTop: 1 }}
                            variant="outlined"
                            onClick={() => {
                                setPostData(PostDataOrg);
                                setSearched('');
                            }}>
                            Clear
                        </Button>
                    </Grid>
                    <Grid item xs >
                        <TextField
                            id="outlined-basic"
                            fullWidth
                            label="Search Postings"
                            variant="outlined"
                            placeholder="Search for the post you want 🕵️"
                            type="text"
                            value={searched}
                            onChange={(event) => setSearched(event.target.value)}
                        />
                    </Grid>
                </Grid>
            </Box>
            <FormatedTable
                data={PostData}
                column_names={['Source Name', 'Title']}
                row_fields={['title', 'source_name']}
                message={'No Posts for that 😳 please try a new search 🔎'}
            />
        </TableContainer>
    );
}
