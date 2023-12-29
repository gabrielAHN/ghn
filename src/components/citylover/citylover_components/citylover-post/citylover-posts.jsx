import * as React from 'react';
import { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import PostBySourceFilter from './citylover-by-source';
import CityloverPostSearch from './citylover-posts-search';
import ByTypeFilter from './citylover-by-type';

const color_dict = {
    'podcast': '#F7931E',
    'article': '#E4ECF0',
    'blog': '#DB5367',
    'news': '#0f75bc'
}


export default function CityloverPosts({PostsData, BrandData}) {
    const [ViewType, setViewType] = useState("1");
    

    const handleChange = (event, newAlignment) => {
        if (newAlignment !== null) {
            setViewType(newAlignment);
        }
    };


    if (PostsData !== undefined || PostsData.length < 1)

        return (
            <div >
                <ToggleButtonGroup
                    color="primary"
                    value={ViewType}
                    size="small"
                    exclusive
                    onChange={handleChange}
                    sx={{ float: "left", marginBottom: '2%' }}
                    aria-label="Platform"
                >
                    <ToggleButton value="1">By Type</ToggleButton>
                    <ToggleButton value="2">By Source</ToggleButton>
                    <ToggleButton value="3">All</ToggleButton>
                </ToggleButtonGroup>
                <Grid container rowheight={"auto"} >
                    {
                        ViewType == 1 && PostsData &&
                        <ByTypeFilter
                            post_data={PostsData}
                            brands_dict={BrandData}
                            color_dict={color_dict}
                        />
                    }
                    {
                        ViewType == 2 && BrandData &&
                        <PostBySourceFilter
                            post_data={PostsData}
                            brands_dict={BrandData}
                            color_dict={color_dict}
                        />
                    }
                    {ViewType == 3 && PostsData &&
                        <CityloverPostSearch
                            post_data={PostsData}
                            brands_dict={BrandData}
                            color_dict={color_dict}
                        />
                    }
                </Grid>
            </div>
        )
};