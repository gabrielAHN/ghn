import { Box, LinearProgress, Grid } from '@mui/material';


export default function LinearProgressWithLabel(props) {
  return (
    <Grid item sx={{  maxWidth: '50vh', margin: '0 auto' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <p>
      {`${Math.round(props.value,)}%`}
      </p>
    </Grid>
  );
}
