import JSZip from 'jszip';
import { useState } from 'react';
import { Grid, Box, styled } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import FileUploadOutlined from "@mui/icons-material/FileUploadOutlined";
import GtfsParser from './gtfs-parser';


const WarningMessage = styled('div')({
  display: 'flex',
  width: '100%',
  backgroundColor: '#ffa726',
  color: 'white',
  borderRadius: '4px',
  padding: '20px 16px',
  border: 'none',
  textDecoration: 'none',
  fontWeight: 'bold'
});



export default function GTFSFileUploader(props) {
  const [fileError, setFileError] = useState([]);
  const [loading, setLoading] = useState(false);
  const { FileStatus, ProgressData, setFileStatus, setProgressData, setStationData, setStopsData, setFilterStationData } = props;

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file || file.type !== 'application/zip') {
      setFileStatus('no_zipfile');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setFileStatus("loading");
      setProgressData(0);

      const zip = new JSZip();
      const zipData = await zip.loadAsync(file);
      const stopFile = zipData.file('stops.txt');
      const pathwaysFile = zipData.file('pathways.txt');

      if (!stopFile || !pathwaysFile) {
        const errors = [];
        if (!stopFile) errors.push('No Stop file');
        if (!pathwaysFile) errors.push('No Pathways file');
        setFileError(errors);
        setFileStatus('error_zipfile');
        return;
      }

      const [stopsData, pathwaysData] = await Promise.all([
        stopFile.async('text'),
        pathwaysFile.async('text'),
      ]);

      GtfsParser({
        stopsData,
        pathwaysData,
        setFileError,
        ProgressData,
        setProgressData,
        FileStatus,
        setFileStatus,
        setStopsData,
        setStationData,
        setFilterStationData,
      });
    } catch (error) {
      console.error('Error processing the zip file:', error);
      setFileStatus('error_zipfile');
    } finally {
      setLoading(false);
    }
  };

  const renderFileUploader = () => (
    <Box sx={{ '& > button': { m: 2 } }}>
      <LoadingButton
        size="large"
        variant="outlined"
        component="label"
        loading={loading}
        endIcon={<FileUploadOutlined />}
        loadingIndicator="Loading…"
      >
        <span>Upload GTFS Zip File</span>
        <input type="file" hidden onChange={handleFileChange} />
      </LoadingButton>
    </Box>
  );

  const renderWarningMessage = (message, link = null) => (
    <Grid container spacing={4} justifyContent="center">
      <Grid item xs={12} sm={12}>
        {renderFileUploader()}
      </Grid>
      <Grid item xs={12} sm={6}>
        <WarningMessage>
          {message}
          {link && (
            <a className='link-style-station' href={link} target='_blank' style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
              Here is an example valid GTFS zip file.
            </a>
          )}
        </WarningMessage>
      </Grid>
    </Grid>
  );

  switch (FileStatus) {
    case 'no_zipfile':
      return renderWarningMessage('You have not uploaded a zip file 😔 please try to upload a valid GTFS zip file.', 'https://cdn.mbta.com/MBTA_GTFS.zip');
    case 'error_zipfile':
      return renderWarningMessage(`Your GTFS file is missing the following: ${fileError.join(', ')}`);
    default:
      return renderFileUploader();
  }
}
