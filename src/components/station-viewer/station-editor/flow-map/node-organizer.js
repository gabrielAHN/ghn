import ELK from 'elkjs/lib/elk.bundled.js';
import React, { useCallback } from 'react';

const elk = new ELK();


export default function NodesOrganizer(props) {
    console.log(props)
    // const useLayoutedElements = () => {
    // const { getNodes, setNodes, getEdges, fitView } = useReactFlow();
    // const defaultOptions = {
    //     'elk.algorithm': 'layered',
    //     'elk.layered.spacing.nodeNodeBetweenLayers': 100,
    //     'elk.spacing.nodeNode': 80,
    // };
    
    // const getLayoutedElements = useCallback((options) => {
    //     const layoutOptions = { ...defaultOptions, ...options };
    //     const graph = {
    //     id: 'root',
    //     layoutOptions: layoutOptions,
    //     children: getNodes(),
    //     edges: getEdges(),
    //     };
    
    //     elk.layout(graph).then(({ children }) => {
    //     // By mutating the children in-place we saves ourselves from creating a
    //     // needless copy of the nodes array.
    //     children.forEach((node) => {
    //         node.position = { x: node.x, y: node.y };
    //     });
    
    //     setNodes(children);
    //     window.requestAnimationFrame(() => {
    //         fitView();
    //     });
    //     });
    // }, []);
    
    // return { getLayoutedElements };
    //   };
}