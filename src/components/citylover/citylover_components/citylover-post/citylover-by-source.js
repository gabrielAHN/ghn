import { useState } from 'react';
import { Grid } from '@material-ui/core';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function PostBySourceFilter({ post_data, brands_dict, color_dict }) {
    const [isOpenCollapse, setIsOpenCollapse] = useState(null);

    const post_brands = post_data.map(
        (post) => {
            return post.source
        }
    )

    const filtered_brands = Object.entries(brands_dict)
        .filter(key =>
            !key[1].type.includes('job')
            && post_brands.includes(key[0])
        ).map(
            (key, index) => {
                return key
            }
        )

    const handleOpen = (clickedIndex) => {
        if (isOpenCollapse === clickedIndex) {
            setIsOpenCollapse(null);
        } else {
            setIsOpenCollapse(clickedIndex);
        }
    };

    if (post_data === undefined) return (<h1>Loading....</h1>)

    return (
        <Grid container spacing={2}>
            {
                filtered_brands.map(
                    (brand, index) => (
                        <Grid item key={index} style={{ margin: '0.05%', minWidth: 140 }} >
                            <div
                                key={index}
                                onClick={() => handleOpen(index)}
                                style={{
                                    margin: '0.75%', width: '100%', minHeight: 135,
                                    borderRadius: 10, border: `3px solid ${color_dict[brand[1].type[0]]}`
                                }}>
                                <div>
                                    <h5>{capitalizeFirstLetter(brand[1].name)}</h5>
                                    <img width={brand[1].image_size} src={brand[1].image} />
                                    <Collapse
                                        in={isOpenCollapse === index}
                                        timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            {
                                                post_data
                                                    .filter(
                                                        post =>
                                                            post.source == brand[0]
                                                    )
                                                    .map(
                                                        (post, index) => (
                                                            <ListItemButton
                                                                key={index}
                                                                style={{ fontSize: 13 }}
                                                                onClick={() => window.open(`${post.url}`, "_blank")}
                                                            >
                                                                {post.title}
                                                            </ListItemButton>
                                                        )

                                                    )}
                                        </List>
                                    </Collapse>
                                </div>
                            </div>
                        </Grid>
                    )
                )
            }
        </Grid>
    )
};
