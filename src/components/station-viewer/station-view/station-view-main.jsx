import { Grid } from "@material-ui/core";
import StationMap from "./station-map/station-map";
import StationTable from "./station-table-info/station-table-info";
import StationTablePathways from "./station-table-pathways/station-table-pathways";


export default function StationViewMain(props) {
  const {FilterStationData,  SelectStation} = props;
  const SelectedStation = FilterStationData[SelectStation];
  return (
    <Grid
      container
      spacing={2}
      style={{ borderRadius: "4px", padding: "1.25vh" }}
    >
      <h1 style={{margin: '0 auto' }}>{SelectedStation.stop_name}</h1>
      <Grid item xs={12} sm={12}>
        <StationMap SelectedData={SelectedStation} />
      </Grid>
      <Grid item xs={12} sm={12}>
        <StationTable SelectedData={SelectedStation} />
      </Grid>
      {
        SelectedStation.pathways_status === '✅' ? (
          <Grid item xs={12} sm={12}>
            <StationTablePathways SelectedData={SelectedStation} />
          </Grid>
        ): null
      }
    </Grid>
  );
}
