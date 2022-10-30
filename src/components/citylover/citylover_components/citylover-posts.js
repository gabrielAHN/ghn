import { useState, useEffect } from 'react';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';


var color_dict = {
    'all': '#FCE25F',
    'podcast': '#F7931E',
    'article': '#E4ECF0',
    'blog': '#DB5367',
    'news': '#0f75bc'
}

export default function PostCards({ data }) {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    var post_color = color_dict[data[2][data[0]].type]

    return (
        <div onClick={handleClick}
            style={{ width: 165, minHeight: 150, borderRadius: 10, border: `3px solid ${post_color}` }}
        >
            <img style={{ height: data[2][data[0]].image_size, margin: 5 }} src={data[2][data[0]].image} />
            <p>{data[2][data[0]].name}</p>
            <br />
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {data[1].map(
                        (value) => (
                            <ListItemButton style={{ fontSize: 13 }} onClick={() => window.open(`${value.url}`, "_blank")}>
                                {value.title}
                            </ListItemButton>
                        )
                    )}
                </List>
            </Collapse>
        </div>
    );
}
