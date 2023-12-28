import React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { Checkbox } from '@material-ui/core';


function Row(props) {
    const index = props.index;
    const row_fields = props.row_fields;
    const data = props.data;
    const checkbox_object = props.checkbox_object;
    const checkbox_function = props.checkbox_function;
    const filtered_row = Object.keys(data)

    .filter(key => row_fields.includes(key))
    .reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
    }, {});

    return (
        <React.Fragment>
             
            <TableRow
                sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell key={1} align="left">
                        <Checkbox
                            color="secondary"
                            checked={checkbox_object.indexOf('checkbox'+index) !== -1}
                            onChange={checkbox_function('checkbox'+index, props)}
                            inputProps={{ 'aria-label': 'controlled' }} 
                        />
                    </TableCell>
                    {
                    Object.entries(filtered_row).map(
                        ([key, value]) =>
                            <TableCell sx={{fontSize: 12,  paddingRight: 0.5}} key={key+1} align="left">{value}</TableCell>
                    )
                    }
            </TableRow>
        </React.Fragment>
    );
}

export default function FormatedTable( {data, checkbox_object, checkbox_function, column_names, row_fields, message} ) {

    if (data === undefined) return (<h1>Loading....</h1>)
    
    return(
    <Table size="small">
        <TableHead>
            <TableRow>
                {column_names.map(
                    (names, index) =>(
                        <TableCell key={index} align="left" style={{ fontWeight: 'bold' }}>{names}</TableCell>
                    )
                )}
            </TableRow>
        </TableHead>
        <TableBody>
            { data != undefined ? Object.keys(data).map(
            (key, index) => (
                <Row key={index} index={index} data={data[key]}
                    row_fields={row_fields}
                    checkbox_function={checkbox_function}
                    checkbox_object={checkbox_object}    
                />
            )
            ):
                <tr>
                    <td>{message}</td>
                </tr>
            }
        </TableBody>
    </Table>
    )
}