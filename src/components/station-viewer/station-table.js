import * as React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';

function Row(props) {
    const row_fields = props.row_fields;
    const data = props.data;
    const station_number = props.station_number;

    const filtered_data = Object.keys(data)
    .filter(key => row_fields.includes(key))
    .reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
    }, {});

    return (
        <React.Fragment>
             
            <TableRow
                hover
                onClick={
                    () => {
                    props.set_select_station(station_number);
                    props.set_value(station_number);
                }}
                sx={{ '& > *': { borderBottom: 'unset' } }}>
                    {
                    Object.entries(filtered_data).map(
                        ([key, value]) =>
                            <TableCell key={key} align="left">{value}</TableCell>
                    )
                    }
            </TableRow>
        </React.Fragment>
    );
}


function StationTable(props) {


    const data = props.data;
    const column_names = props.column_names;
    const row_fields = props.row_fields;

    return (
        <Table>
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
                { 
                    data ? Object.keys(data).map(
                        (row, index) => (
                            <Row key={index} station_number={index} set_value={props.set_value} 
                            data={data[row]} row_fields={row_fields} set_select_station={props.set_select_station} />
                        )
                    ):
                    <tr>
                        <td>{props.message}</td>
                    </tr>
                }
            </TableBody>
        </Table>
        )
}
export default StationTable;