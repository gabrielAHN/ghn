import { TableBody, TableRow, TableCell, Table } from '@mui/material';


export default function StationTablePathways(props) {
    const { SelectedData } = props;
    console.log(SelectedData)
    return (
        <Table style={{ maxWidth: '70vh', margin: '0 auto' }}>
            <h3>Station Info</h3>
            {/* <h3>Station Info</h3>
            <TableBody>
                <TableRow >
                    <TableCell component="th" scope="row">Stop Id</TableCell>
                    <TableCell align="right">{SelectedData.stop_id}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">Coordinates</TableCell>
                    <TableCell align="right">{SelectedData.stop_lat},{SelectedData.stop_lon}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">Exit Count</TableCell>
                    <TableCell align="right">{SelectedData.exit_count}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">Pathways Status</TableCell>
                    <TableCell align="right">{SelectedData.pathways_status}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">Wheel Chair Status</TableCell>
                    <TableCell align="right">{SelectedData.wheelchair_status}</TableCell>
                </TableRow>
            </TableBody> */}
        </Table>
    );
}