import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function StartandEndStations({
  StartNode, EndNode, StartStation, setStartStation, EndStation,
  setEndStation
}) {


  const handleStartChange = (event) => {
    setStartStation(event.target.value);
  };
  const handleEndChange = (event) => {
    setEndStation(event.target.value);
  };

  return (
    <>
      <FormControl fullWidth sx={{ m: '1vh' }}>
        <InputLabel>Start Station</InputLabel>
        <Select
          label="Start Station"
          value={StartStation}
          onChange={handleStartChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
            StartNode.map((node) => (
              <MenuItem key={node.stop_id} value={node.stop_id}>{node.stop_id}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ m: '1vh' }}>
        <InputLabel>End Station</InputLabel>
        <Select
          label="End Station"
          value={EndStation}
          onChange={handleEndChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
            EndNode.map((node) => (
              <MenuItem key={node.stop_id} value={node.stop_id}>{node.stop_id}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </>
  );
}