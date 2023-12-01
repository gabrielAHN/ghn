import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';


function StationPicker(props) {
    var row = props.row.field
    var row_fields = props.params.row
    var set_select_station = props.set_select_station
    var station_data = props.station_data
    var set_filter_station_data = props.set_filter_station_data

    return (
        <a onClick={
            () => {
                set_select_station(row_fields.stop_id);
                set_filter_station_data(station_data)
            }}>
            {row_fields[row]}
        </a>
    )
}


var column_data = [
    { field: 'stop_id', headerName: 'Stop Id' },
    { field: 'stop_name', headerName: 'Stop Name' },
    { field: 'stop_lat', headerName: 'Latitude' },
    { field: 'stop_lon', headerName: 'Longitude' },
    { field: 'exit_count', headerName: 'Exit count' },
    { field: 'pathways_data', headerName: 'Pathways Data' },
]


export default function StationTableViewer(props) {
    var set_select_station = props.set_select_station
    var set_filter_station_data = props.set_filter_station_data
    var station_data = props.station_data

    var rows = Object.entries(props.data).map(
        ([key, value], index) => {
            value['id'] = index
            if (value.pathways.links.length > 0) {
                value['pathways_data'] = 'true'
            } else {
                value['pathways_data'] = 'false'
            }
            return value
        }
    )

    var columns = column_data.map(
        (row) => {
            row['minWidth'] = 130
            row['flex'] = 1
            row['renderCell'] = (params) =>
                StationPicker(
                    {
                        row: row,
                        params: params,
                        set_select_station: set_select_station,
                        set_filter_station_data: set_filter_station_data,
                        station_data: station_data
                    }
                )
            return row
        }
    )



    return (
        <div style={{ width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
            // initialState={{
            //     pagination: {
            //     paginationModel: { page: 0, pageSize: 5 },
            //     },
            // }}
            // pageSizeOptions={[5, 10]}
            // getRowId={(row) => row.stop_id}
            // checkboxSelection
            />
        </div>
    )
}
