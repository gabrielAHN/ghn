import { useEffect, useState } from 'react';
import {
    Checkbox, Paper, Collapse, IconButton, Box, styled,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { STOP_TYPE_COLORS } from "../../station-view-main";

const ExpandMore = styled(IconButton, {
    shouldForwardProp: (prop) => prop !== 'expand',
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function StationInfoLegendMap({
    nodes, NodeTypes, setFilteredNodes, handleCheckboxChange
}) {
    const [expanded, setExpanded] = useState(true);

    const handleExpandClick = () => setExpanded(!expanded);

    useEffect(() => {
        const filteredNodes = nodes.filter(
            node => NodeTypes[node.location_type]?.checked
        );
        setFilteredNodes(filteredNodes);
    }, [nodes, NodeTypes, setFilteredNodes]);

    return (
        <Paper sx={{ width: "30vh", position: "absolute", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", top: "1vh", right: "1vh" }}>
            <Box sx={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "center", position: "relative" }}>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    sx={{ position: "absolute", left: 0 }}
                >
                    <ExpandMoreIcon />
                </ExpandMore>
                <h4>Station Part Types</h4>
            </Box>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                {NodeTypes && Object.entries(NodeTypes).map(([key, value]) => (
                    <Box key={key} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Checkbox
                            sx={{
                                color: `rgb(${STOP_TYPE_COLORS[key]?.color || 'grey'})`,
                                '&.Mui-checked': {
                                    color: `rgb(${STOP_TYPE_COLORS[key]?.color || 'grey'})`,
                                },
                            }}
                            checked={value.checked}
                            disabled={!value.visible}
                            onChange={(e) => handleCheckboxChange(key, e)}
                        />
                        <p>{STOP_TYPE_COLORS[key]?.name || 'Unknown'}</p>
                    </Box>
                ))}
            </Collapse>
        </Paper>
    );
}
