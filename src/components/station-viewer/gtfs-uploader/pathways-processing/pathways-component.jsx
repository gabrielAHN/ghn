export const useGraph = (links) => {
    const graph = {};
    links.forEach(({ from_stop_id, to_stop_id, traversal_time }) => {
        if (!graph[from_stop_id]) {
            graph[from_stop_id] = [];
        }
        graph[from_stop_id].push({
            nodeId: to_stop_id,
            traversalTime: Number(traversal_time),
        });
    });
    return graph;
};

export const findShortestPath = (graph, start, end) => {
    const queue = [{ nodeId: start, path: [start], totalTime: 0 }];
    const visited = new Set();

    while (queue.length > 0) {
        const { nodeId, path, totalTime } = queue.shift();

        if (nodeId === end) {
            return { path, totalTime };
        }

        visited.add(nodeId);

        graph[nodeId]?.forEach(({ nodeId: nextNodeId, traversalTime }) => {
            if (!visited.has(nextNodeId)) {
                queue.push({
                    nodeId: nextNodeId,
                    path: [...path, nextNodeId],
                    totalTime: totalTime + traversalTime,
                });
            }
        });
    }

    return null;
};