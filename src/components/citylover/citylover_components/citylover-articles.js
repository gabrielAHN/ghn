import { useState } from 'react';
import ByBrandFilter from './citylover-posts';
import BrandDict from '../brand_dict.json';
import { Grid } from '@material-ui/core';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import BySourceFilter from './citylover-by-type';
import CityloverAllTable from './citylover-all-table';


const news_types = ['news', 'article', 'blog', 'podcast']
const color_dict = {
    'podcast': '#F7931E',
    'article': '#E4ECF0',
    'blog': '#DB5367',
    'news': '#0f75bc'
}


export default function CityloverPosts({ data }) {
    const [ViewType, setViewType] = useState("1");

    const handleChange = (event, newAlignment) => {
        if (newAlignment !== null) {
            setViewType(newAlignment);
        }
    };

    return (
        <div >
            <ToggleButtonGroup
                color="primary"
                value={ViewType}
                size="small"
                exclusive
                onChange={handleChange}
                sx={{float: "left", marginBottom: '2%'}}
                aria-label="Platform"
            >
                <ToggleButton value="1">By Type</ToggleButton>
                <ToggleButton value="2">By Source</ToggleButton>
                <ToggleButton value="3">All</ToggleButton>
            </ToggleButtonGroup>
            <Grid container rowHeight={"auto"} justifyContent="left"  >
                {ViewType == 1 && news_types.map(
                    (value) => (
                        <BySourceFilter data={[value, BrandDict, data.post_sources, color_dict]} />
                    )
                )}
                {ViewType == 2 && Object.entries(data.post_sources).map(
                    ([key, value], index) => (
                        <Grid item key={index} style={{ margin: '0.75%' }} >
                            <ByBrandFilter key={index} data={[key, value, BrandDict]} />
                        </Grid>
                    ))}
                {ViewType == 3 && data.post_sources &&
                    <CityloverAllTable data={[data.post_sources, BrandDict, data.post_sources, color_dict ]}/>
                }
            </Grid>
        </div>
    )
};