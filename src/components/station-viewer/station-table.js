import * as React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';

function Row(props) {
    const row_fields = props.row_fields;
    const data = props.data;

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
                onClick={() => window.open(`${data.url}`, "_blank")}
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


function StationTable({data, column_names, row_fields, message}) {
    console.log(!data);
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
                            <Row key={index} data={data[row]} row_fields={row_fields} />
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
export default StationTable;