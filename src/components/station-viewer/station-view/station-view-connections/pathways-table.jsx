import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { STOP_TYPE_COLORS } from "../station-view-main";

export const colorStopType = (location_type) => (
    <div
        style={{
            width: "10px",
            height: "10px",
            backgroundColor: `rgb(${STOP_TYPE_COLORS[location_type].color.join(",")})`,
            margin: "0 auto",
            borderRadius: "50%",
        }}
    />);


export default function PathwaysTable({ StartNode, EndNode, FilteredPathwayLinks }) {
    return (
        <TableContainer >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        {EndNode.map(node => (
                            <TableCell key={node.stop_id} align="right"
                            >
                                {node.stop_id}
                                {colorStopType(node.location_type)}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        StartNode.map(startNode => (
                            <TableRow
                                key={startNode.stop_id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row"
                                >
                                    {startNode.stop_id}
                                    {colorStopType(startNode.location_type)}
                                </TableCell>
                                {EndNode.map(endNode => (
                                    <TableCell key={endNode.stop_id} align="right"
                                    >
                                        {
                                            !FilteredPathwayLinks ? (
                                                'None'
                                            ) : startNode.stop_id === endNode.stop_id ? (
                                                '-'
                                            ) : FilteredPathwayLinks[startNode.stop_id][endNode.stop_id] ? (
                                                FilteredPathwayLinks[startNode.stop_id][endNode.stop_id].totalTime
                                            ) : 'None'
                                        }
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}