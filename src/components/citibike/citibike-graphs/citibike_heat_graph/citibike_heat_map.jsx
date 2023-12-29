import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';

import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import HeatGraph from './heat_map';


export default function HeatMapWidget({data}) {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{
                flexGrow: 1,
                bgcolor: 'background.paper',
                display: 'flex', height: '25%',
                width: '100%',
            }}
        >
            <TabContext value={value.toString()}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                    value={value}
                    onChange={handleChange}
                >
                    {
                        Object.entries(data).map(
                            ([key, value], index) =>
                            (
                                <Tab wrapped
                                    key={index}
                                    label={key}
                                />
                            ))
                    }
                </Tabs>
                {
                    Object.entries(data).map
                        (([key, value], index) =>
                        (
                            <TabPanel
                                key={index}
                                label={index}
                                value={index.toString()}
                                sx={{ width: '100%', height: '0%' }}
                            >
                                <HeatGraph key={index} data={data[key]} />
                            </TabPanel>
                        )
                        )
                }
            </TabContext>
        </Box>
    )
}