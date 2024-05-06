import { useEffect } from 'react';
import { Grid, Slider, Checkbox, Button } from "@mui/material";
import StartandEndStations from './components/start-and-end-stations';
import SliderColorGradient from './components/slider-color-gradient';
import { STOP_TYPE_COLORS } from "../station-view-main";


export default function StationDashboardConnections({
    nodes, PathwaysLinks, maxTime, minTime,
    setFilteredPathwayLinks, setStartNode, setEndNode,
    SliderValues, NodeTypes, HandleSliderChange,
    ConnectionStatus, StartNode, EndNode,
    handleCheckboxChange, handleCheckbox2Change,
    StartStation, setStartStation, EndStation,
    setEndStation, setSliderValues, setNodeTypes
}) {


    const handleResetSelection = () => {
        setStartStation("");
        setEndStation("");
        setSliderValues([minTime, maxTime]);
        setNodeTypes(
            nodes.reduce((acc, { location_type }) => ({
                ...acc,
                [location_type]: { checked: true, visible: true }
            }), {})
        );
    };

    useEffect(() => {
        let filteredNodes = nodes.filter(
            node => NodeTypes[node.location_type].checked
        );

        let filteredLinksData = Object.fromEntries(
            Object.entries(PathwaysLinks).map(([key, subObject]) => [
                key,
                Object.fromEntries(
                    Object.entries(subObject).filter(([subKey, value]) =>
                        value === null || (value.totalTime >= SliderValues[0] && value.totalTime <= SliderValues[1])
                    )
                )
            ])
        );

        if (StartStation !== "" && EndStation !== "") {
            filteredNodes = filteredNodes.filter(node =>
                node.stop_id === StartStation || node.stop_id === EndStation
            );
        }

        if (!ConnectionStatus) {
            const RemovedNoneLinksData = Object.fromEntries(
                Object.entries(filteredLinksData).map(([key, subObject]) => [
                    key,
                    Object.fromEntries(Object.entries(subObject).filter(([_, value]) => value !== null))
                ])
            );

            const RemovedNodeKeys = Object.keys(RemovedNoneLinksData).filter(key => Object.keys(RemovedNoneLinksData[key]).length > 0);
            const rowHeaderFilter = filteredNodes.filter(node => RemovedNodeKeys.includes(node.stop_id));

            const columnKeys = new Set(Object.values(RemovedNoneLinksData).flatMap(subObject => Object.keys(subObject)));
            const columnHeaderFilter = filteredNodes.filter(node => columnKeys.has(node.stop_id));

            setStartNode(rowHeaderFilter);
            setEndNode(columnHeaderFilter);
        } else {
            setStartNode(filteredNodes);
            setEndNode(filteredNodes);
        }

        setFilteredPathwayLinks(filteredLinksData);
    }, [SliderValues, ConnectionStatus, nodes, NodeTypes, StartStation, EndStation]);

    return (
        <Grid container >
            <Grid item xs={6} sm={5}>
                {NodeTypes && Object.entries(NodeTypes).map(([key, value]) => {
                    const NAME = STOP_TYPE_COLORS[key]?.name || 'Unknown';
                    const COLOR = STOP_TYPE_COLORS[key]?.color || 'grey';

                    return (
                        <div key={key} style={{ display: "flex", alignItems: "center" }}>
                            <Checkbox
                                sx={{
                                    color: `rgb(${COLOR})`,
                                    '&.Mui-checked': {
                                        color: `rgb(${COLOR})`,
                                    },
                                }}
                                checked={value.checked}
                                disabled={!value.visible}
                                onChange={(e) => handleCheckboxChange(key, e)}
                            />
                            <p>{NAME}</p>
                        </div>
                    );
                })}
                <Grid item sx={{ display: "flex", alignItems: "center" }}>
                    <Checkbox checked={ConnectionStatus} onChange={handleCheckbox2Change} />
                    <p>Add Empty Connections</p>
                </Grid>
                <Grid item xs sm={6} >
                    <Button variant="outlined" color="error" 
                    onClick={handleResetSelection}>
                        Reset Selection
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={7}>
                <Grid item xs={12} sm={12}>
                    <StartandEndStations
                        StartNode={StartNode}
                        EndNode={EndNode}
                        StartStation={StartStation}
                        setStartStation={setStartStation}
                        EndStation={EndStation}
                        setEndStation={setEndStation}
                    />
                </Grid>
                <Grid item xs={12} md={12} >
                    {
                        !isFinite(maxTime) || !isFinite(minTime) ? null : (
                            <Grid item >
                                <SliderColorGradient
                                    minTime={minTime}
                                    maxTime={maxTime}
                                />
                                <Slider
                                    value={SliderValues}
                                    min={minTime}
                                    max={maxTime}
                                    disableSwap
                                    onChange={HandleSliderChange}
                                    valueLabelDisplay="auto"
                                />
                            </Grid>
                        )
                    }
                </Grid>
            </Grid>
        </Grid>
    );
}