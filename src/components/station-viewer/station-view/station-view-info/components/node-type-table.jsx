import React from 'react';
import { STOP_TYPE_COLORS } from '../../station-view-main';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

function Row({ row, setClickInfo, columnsDict, setViewState }) {
  const handleClick = () => {
    setViewState({
      latitude: Number(row.stop_lat),
      longitude: Number(row.stop_lon),
      zoom: 16
    });
    setClickInfo({
      object: {
        code: row.stop_name,
        coordinates: [Number(row.stop_lon), Number(row.stop_lat)],
        stop_type: row.location_type,
        name: row.stop_name
      }
    });
  };

  return (
    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
      <TableCell>
        {row.stop_lat ? (
          <Button onClick={handleClick}>View</Button>
        ) : '❌'}
      </TableCell>
      {Object.keys(columnsDict).map((key) => (
        <TableCell key={key} align="right">
          {key === 'location_type' ? STOP_TYPE_COLORS[row[key]].name : row[key]}
        </TableCell>
      ))}
    </TableRow>
  );
}

export default function NodeTypeTable({ nodes, nodeType, setClickInfo, setViewState }) {
  const columnsDict = {
    stop_id: 'Stop ID',
    stop_name: 'Stop Name',
    platform_name: 'Platform Name',
    stop_lat: 'Lat',
    stop_lon: 'Lon',
    level_id: 'Level ID',
    location_type: 'Location Type',
    parent_station: 'Parent Station',
    wheelchair_boarding: 'Wheelchair Boarding',
  };

  const filteredNodes = nodes.filter(node => node.location_type === nodeType);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align="right" />
          {Object.entries(columnsDict).map(([key, label]) => (
            <TableCell key={key} align="right">
              {label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {filteredNodes.map((node, index) => (
          <Row key={node.stop_id} row={node}
            columnsDict={columnsDict} setClickInfo={setClickInfo}
            setViewState={setViewState}
          />
        ))}
      </TableBody>
    </Table>
  );
}
