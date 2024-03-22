import { TableBody, TableRow, TableCell } from '@mui/material';
import Table from '@mui/material/Table';


export default function StationTable(props) {

    const { SelectStation, StationData } = props;
    const select_station = StationData[SelectStation]

    return (
        <div>
        <h1>{select_station.stop_name}</h1>
        <Table style={{ maxWidth: '70vh', margin: '0 auto' }}>
            <TableBody>
                <TableRow >
                    <TableCell component="th" scope="row">Stop Id</TableCell>
                    <TableCell align="right">{select_station.stop_id}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">Coordinates</TableCell>
                    <TableCell align="right">{select_station.stop_lat},{select_station.stop_lon}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">Exit Count</TableCell>
                    <TableCell align="right">{select_station.exit_count}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">Pathways Status</TableCell>
                    <TableCell align="right">{select_station.pathways_status}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">Wheel Chair Status</TableCell>
                    <TableCell align="right">{select_station.wheelchair_status}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
    );
}