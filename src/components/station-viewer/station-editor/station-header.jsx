import Grid from '@mui/material/Grid';
import TableChartIcon from '@mui/icons-material/TableChart';
import FileUploadOutlined from '@mui/icons-material/FileUploadOutlined';
import { useState, useMemo } from 'react';
import TabContext from '@mui/lab/TabContext';
import Tab from '@mui/material/Tab';

export default function StationViewerHeader(props) {
    const {
        setSelectStation,
        setFileStatus,
        StationData,
        setStationData,
        setProgressData
     } = props;
    const [ value, setValue] = useState("0");


    const tabPanelItems = useMemo(() => [
        {
            label: "All Stations",
            value: "0",
            icon: <TableChartIcon />,
            onClick: () => {
                setSelectStation(null);
                setStationData(StationData);
            }
        },
        {
            label: "Upload New File",
            value: "1",
            icon: <FileUploadOutlined />,
            onClick: () => {
                setSelectStation(null);
                setStationData([]);
                setFileStatus('not_started');
                setProgressData(0);
            }
        }

    ], [StationData, setSelectStation]);


    return (
        <Grid container spacing={2} >
            <TabContext value={value}>
                <Grid item xs={12}>
                {
                tabPanelItems.map((item, index) =>
                    (
                        <Tab
                            key={String(index)}
                            value={String(index)}
                            icon={item.icon}
                            iconPosition="top"
                            label={item.label}
                            onClick={item.onClick}
                        />
                        ))
                }
                </Grid>
            </TabContext>
      </Grid>
)
};