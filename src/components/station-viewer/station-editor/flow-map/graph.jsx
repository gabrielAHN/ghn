import ELK from 'elkjs/lib/elk.bundled.js';
// import { initialNodes, initialEdges } from "./initialData";

const elk = new ELK();


const elkLayout = (flowdata) => {

    const graph = {
        id: "root",
        layoutOptions: {
            'considerModelOrder.strategy': 'PREFER_EGDES',
            "elk.algorithm": "layered",
            "elk.direction": "LEFT",
            'elk.alignment': 'LEFT',
            'elk.edgeRouting': 'POLYLINE',
            'elk.layered.nodePlacement.strategy': 'BRANDES_KOEPF',
            // "elk.alg.mrtree.options.OrderWeighting": "CONSTRAINT",
            // "elk.order.layoutHierarchy": 'true',
            'elk.partitioning.activate': 'true',
            'elk.layered.mergeEdges': 'true',
            'elk.layered.layering.strategy': 'BF_MODEL_ORDER',
            'elk.spacing.nodeNode': '100',
            'elk.layered.spacing.edgeNodeBetweenLayers': '200',
            'elk.layered.spacing.nodeNodeBetweenLayers': '100',
            
            // intCoordinates: true,
            // direction: "DOWN",
            // edgeRouting: "ORTHOGONAL",
            // cycleBreaking: "INTERACTIVE",
            // nodeLayering: "INTERACTIVE",
            // crossMin: "INTERACTIVE",
            
            // "elk.hierarchyHandling": "SEPARATE_CHILDREN",
            // "elk.hierarchyHandling": "INHERIT",
            // 'elk.layered.spacing.nodeNodeBetweenLayers': '1',
            // 'elk.layered.unnecessaryBendpoints': 'true',
            // 'elk.spacing.nodeNode': '1',
            // "nodePlacement.strategy": "SIMPLE"
        },

        children: flowdata.nodes,
        edges: flowdata.edges
    };
    return elk.layout(graph);
};

export default elkLayout;
