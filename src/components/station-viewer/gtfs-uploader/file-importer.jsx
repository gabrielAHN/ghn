import JSZip from 'jszip';
import { useState } from 'react';
import {
  Grid, Box, Button,
  Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import FileUploadOutlined from "@mui/icons-material/FileUploadOutlined";
import GtfsParser from './gtfs-parser';
import ClickTracking from '../../data-tracking/click-tracking';
import FileTracking from '../../data-tracking/file-tracking';


export default function GTFSFileUploader(props) {
  const [loading, setLoading] = useState(false);
  const {
    FileStatus, setFileStatus, abortControllerRef,
    setProgressData, setStationData,
    setFilterStationData, setFileError, FileError } = props;
  const location = useLocation().name;

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      setFileStatus('not_started');
      setLoading(false);
      return;
    }
    else if (file.type !== 'application/zip') {
      FileTracking(
        {
          status: 'non_zipfile',
          file_type: file.type,
          file_name: file.name,
        }
      )
      setFileStatus("no_zipfile");
      setLoading(false);
    }
    else {
      setLoading(true);
      setFileStatus("loading");
      setProgressData(0);
      const Signal = abortControllerRef.current.signal;

      const zip = new JSZip();
      const zipData = await zip.loadAsync(file);
      const stopFile = zipData.file('stops.txt');
      const pathwaysFile = zipData.file('pathways.txt');

      if (!stopFile) {
        const errors = [];
        if (!stopFile) errors.push('Required Stops.txt file');
        if (!pathwaysFile) errors.push('Optional Pathways.txt file');
        FileTracking(
          {
            status: 'invalid_file',
            file_type: file.type,
            file_name: file.name,
            error: errors,
          }
        )
        setFileStatus('error_gtfs_file');
        setFileError(errors);
        return;
      }
      const [stopsData, pathwaysData] = await Promise.all([
        stopFile.async('text'),
        pathwaysFile ? pathwaysFile.async('text') : null,
      ]);
      try {
        await GtfsParser({
          stopsData,
          Signal,
          pathwaysData,
          setFileError,
          setProgressData,
          FileStatus,
          setFileStatus,
          setStationData,
          setFilterStationData,
        });
      } catch (error) {
        if (error.name === 'AbortError') {
          setFileStatus('aborted');
          setProgressData(0);
        } else {
          setFileStatus('processing_error');
        }
      } finally {
        setFileError([]);
        setLoading(false);
      }
    }
  };

  const renderFileUploader = () => (
    <Box>
      <LoadingButton
        size="large"
        variant="outlined"
        component="label"
        loading={loading}
        endIcon={<FileUploadOutlined />}
        loadingIndicator="Loading…"
      >
        <span>Upload GTFS Zip File</span>
        <input type="file" hidden onChange={handleFileChange}
          onClick={() => ClickTracking('upload_file_button', location)} />
      </LoadingButton>
    </Box>
  );


  const renderWarningMessage = (props) => {
    const { message, link, title, color, files_error } = props;

    return (
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Accordion style={{ width: '16em', margin: 'auto' }}>
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon size='size' />}
              aria-controls="panel1-content"
              sx={{
                height: '2em',
                backgroundColor: color,
                color: 'black',
                borderRadius: '4px',
              }}>
              {title}
            </AccordionSummary>
            <AccordionDetails
              sx={{
                backgroundColor: `rgba(${color.match(/\d+/g).join(", ")}, 0.3)`,
              }}>
              {message}
              {
                files_error && files_error.map((file, index) => (
                  <p key={index}>{file}</p>
                ))
              }
              {link && (
                <Button size="small" variant="outlined" href={link} target='_blank'
                  sx={{ marginTop: '1em' }}>
                  Here is an example valid GTFS zip file
                </Button>
              )}
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12} md={12}>
          {renderFileUploader()}
        </Grid>
      </Grid>
    )
  };


  switch (FileStatus) {
    case 'no_zipfile':
      return renderWarningMessage({
        title: 'Invalid File Type 💾',
        color: 'rgb(255, 153, 102)',
        message: `You have not uploaded a zip file containing GTFS 😔 please try to upload a valid GTFS zip file`,
        link: 'https://transitfeeds.com/p/mta/79/latest/download'
      });
    case 'error_gtfs_file':
      return renderWarningMessage({
        title: 'GTFS Missing Required Files',
        color: 'rgb(255, 204, 0)',
        files_error: FileError,
        message: 'Your GTFS file is missing the following files:',
      });
    case 'processing_error':
      return renderWarningMessage({
        title: "Processing Error 🤖",
        color: "rgb(204, 51, 0)",
        message: "Problem Processing the data, please try another file"
      });
    case 'error':
      return renderFileUploader();
    default:
      return renderFileUploader();
  }
}
