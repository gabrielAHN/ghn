import {
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";


export default function StationTable(props) {
  const { ClickInfo, STOP_TYPE_COLORS } = props;

  return (
    <>
        <b style={{margin: '0 auto' }}>{ClickInfo.object.name}</b>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              Stop Id
            </TableCell>
            <TableCell align="right">{ClickInfo.object.code}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              coordinates
            </TableCell>
            <TableCell align="right">{`${ClickInfo.object.coordinates[0]}, ${ClickInfo.object.coordinates[1]}`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Part Type
            </TableCell>
            <TableCell align="right">
              {STOP_TYPE_COLORS[ClickInfo.object.stop_type].name}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  )
}