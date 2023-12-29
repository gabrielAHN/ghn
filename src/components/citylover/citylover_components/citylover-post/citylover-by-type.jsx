import { useState, useEffect } from 'react';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';


export default function PostCards({ post_data, brands_dict, color_dict }) {
    const [isOpenCollapse, setIsOpenCollapse] = useState(null);

    const handleOpen = (clickedIndex) => {
        if (isOpenCollapse === clickedIndex) {
            setIsOpenCollapse(null);
        } else {
            setIsOpenCollapse(clickedIndex);
        }
    };

    if (post_data === undefined || brands_dict.length < 1) return (<h1>Loading....</h1>)

    return (
        <div style={{ width: '100%' }}>
            {
                Object.entries(color_dict).map(
                    ([source_type, color], index) => (
                        <div
                            key={index}
                            onClick={() => handleOpen(index)}
                            style={{ margin: 5, minHeight: 100, width: '100%', borderRadius: 10, border: `4px solid ${color}` }}
                        >
                            <h1>{source_type}</h1>
                            <br />
                            <Collapse
                                in={isOpenCollapse === index}
                                timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {
                                        post_data
                                            .filter(post =>
                                                brands_dict[post.source].type.includes(source_type)
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
                                            )
                                    }
                                </List>
                            </Collapse>
                        </div>
                    )
                )
            }
        </div>
    );
}
