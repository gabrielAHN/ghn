import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

function StationPicker(props) {
  const { params, set_select_station, station_data, set_filter_station_data } =
    props;

  const handleClick = () => {
    set_select_station(params.row.stop_id);
    set_filter_station_data(station_data);
  };

  return <a onClick={handleClick}>{params.row[params.field]}</a>;
}

var column_data = [
  { field: "stop_id", headerName: "Stop Id" },
  { field: "stop_name", headerName: "Stop Name" },
  { field: "stop_lat", headerName: "Latitude" },
  { field: "stop_lon", headerName: "Longitude" },
  { field: "exit_count", headerName: "Exit count" },
  { field: "pathways_status", headerName: "Pathways" },
  { field: "wheelchair_status", headerName: "Wheelchair" },
];

export default function AllStationTableViewer(props) {
  const {
    FilterStationData,
    setSelectStation,
    setFilterStationData,
    StationData,
  } = props;

  var rows = Object.entries(FilterStationData).map(([key, value], index) => {
    value["id"] = index;
    return value;
  });

  var columns = column_data.map((row) => {
    row["minWidth"] = 130;
    row["flex"] = 1;
    row["renderCell"] = (params) =>
      StationPicker({
        row: row,
        params: params,
        set_select_station: setSelectStation,
        set_filter_station_data: setFilterStationData,
        station_data: StationData,
      });
    return row;
  });

  return (
    <div style={{ width: "100%" }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}
