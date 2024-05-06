import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';


export default function TableComponent({
    Title,
    Data,
    ColumnsData,
    ColumnName }) {

    const ColumnData = ColumnName.reduce((obj, key, index) => {
        obj[key] = ColumnsData[index];
        return obj;
    }, {});

    return (
        <Table>
            <TableBody>
                {
                    Object.entries(ColumnData).map(
                        ([column, value]) => (
                            <TableRow key={column}>
                                <TableCell component="th" scope="row" width="auto">
                                    {column}
                                </TableCell>
                                <TableCell
                                    align="right"
                                    width="auto"
                                >
                                    {Data[value]}
                                </TableCell>
                            </TableRow>
                        ))}
            </TableBody>
        </Table>
    );
}