import { useState } from 'react';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function BySourceFilter({ data }) {
    const [open, setOpen] = useState(false);
    const post_color = data[3][data[0]]

    const handleClick = () => {
        setOpen(!open);
    };

    const source_type = Object.entries(data[1]).map(
        ([key, value]) => {
            if (value.type.includes(data[0])) {
                return key
            }
        }
    ).filter(function (element) {
        return element !== undefined;
    })

    return (
        <div onClick={handleClick}
            style={{ margin: '0.75%', width: '100%', borderRadius: 10, border: `3px solid ${post_color}` }}>
            <h1>{capitalizeFirstLetter(data[0])}</h1>
            <div>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {source_type.map(
                            (source_type) => {
                                return data[2][source_type] && data[2][source_type].map(
                                    (post) => (
                                        <ListItemButton style={{ fontSize: 13 }} onClick={() => window.open(`${post.url}`, "_blank")}>
                                            {post.title}
                                        </ListItemButton>
                                    )
                                )
                            }
                        )}
                    </List>
                </Collapse>
            </div>
        </div>
    )
}