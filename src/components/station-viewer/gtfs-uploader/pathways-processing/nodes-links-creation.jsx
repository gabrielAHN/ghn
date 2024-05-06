import { useGraph, findShortestPath } from "./pathways-component";

export default function getPathwaysData({ row, stops, pathways }) {
    if (pathways.data.length === 0) {
        return { 
            pathways_status: "❌",
            pathways: {
                PathwaysLinks: null,
                arcData: null,
                links: [],
                maxTime: null,
                minTime: null,
                nodes: [
                    row
                ]
            }
        }
    }

    const nodes = filterNodes(stops.data, row.stop_id);
    const nodeIds = new Set(nodes.map(node => node.stop_id));
    const links = pathways.data.filter(link =>
        nodeIds.has(link.from_stop_id) || nodeIds.has(link.to_stop_id)
    );

    const pathwaysData = createPathwaysData({ nodes, links });

    const pathways_status = pathwaysData.arcData?.length > 0 ? "✅"
                          : pathwaysData.arcData ? "🟡"
                          : "❌";

    return { pathways_status, pathways: pathwaysData };
}

export function filterNodes(data, stopId) {
    return data.filter(node =>
        [3, 2, 0].includes(Number(node.location_type)) && node.parent_station === stopId
    );
}

export function createPathwaysData({ nodes, links }) {
    const PathwaysLinks = createPathwaysLinks(nodes, links);
    if (!PathwaysLinks) {
        return { nodes, links, PathwaysLinks: null, arcData: null, maxTime: null, minTime: null };
    }

    const PathwaysNodes = Object.fromEntries(
        nodes.filter(node => node.stop_lat && node.stop_lon)
             .map(node => [node.stop_id, node])
    );

    const arcData = createArcData(PathwaysLinks, PathwaysNodes);
    const times = arcData.map(arc => arc.total_time);

    return {
        nodes,
        links,
        PathwaysNodes,
        PathwaysLinks,
        arcData,
        maxTime: Math.max(...times),
        minTime: Math.min(...times)
    };
}

export function createPathwaysLinks(nodes, links) {
    const filteredLinks = links.filter(link => link.traversal_time !== "");
    if (!filteredLinks.length) return null;

    const graph = useGraph(filteredLinks);
    const PathwayNodes = nodes.filter(node => [0, 1, 2, 3].includes(Number(node.location_type)));

    const results = PathwayNodes.flatMap(startNode =>
        PathwayNodes.map(endNode => ({
            from_type: startNode.location_type,
            from: startNode.stop_id,
            to: endNode.stop_id,
            to_type: endNode.location_type,
            result: startNode.stop_id !== endNode.stop_id ? findShortestPath(graph, startNode.stop_id, endNode.stop_id) : null,
        }))
    );

    return results.reduce((acc, { from, to, result }) => {
        acc[from] = acc[from] || {};
        acc[from][to] = result;
        return acc;
    }, {});
}

export function createArcData(PathwaysLinks, PathwaysNodes) {
    return Object.entries(PathwaysLinks).flatMap(([from, tos]) => {
        const fromStation = PathwaysNodes[from];

        return Object.entries(tos).map(([to, path]) => {
            if (!path) return null;
            const toStation = PathwaysNodes[to];

            if (!fromStation || !toStation || [fromStation.location_type, toStation.location_type].includes("3")) {
                return null;
            }

            return {
                from: { name: fromStation.stop_id, coordinates: [Number(fromStation.stop_lon), Number(fromStation.stop_lat)] },
                to: { name: toStation.stop_id, coordinates: [Number(toStation.stop_lon), Number(toStation.stop_lat)] },
                total_time: path.totalTime,
            };
        }).filter(Boolean);
    });
}
