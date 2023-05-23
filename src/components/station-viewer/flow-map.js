
import ReactFlow, {
    addEdge,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
  } from 'reactflow';

import * as React from 'react';
import { useState, useEffect } from 'react';

const initialNodes = [
    {
      id: '1',
      type: 'input',
      data: { label: 'Input Node' },
      position: { x: 250, y: 25 },
    },
  
    {
      id: '2',
      // you can also pass a React component as a label
      data: { label: <div>Default Node</div> },
      position: { x: 100, y: 125 },
    },
    {
      id: '3',
      type: 'output',
      data: { label: 'Output Node' },
      position: { x: 250, y: 250 },
    },
  ];
  
const initialEdges = [
{ id: 'e1-2', source: '1', target: '2' },
{ id: 'e2-3', source: '2', target: '3', animated: true },
];
  


export default function FlowMap() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
  
    return <ReactFlow
        style={{
            width: '100%',
            height: '100%',
            margin: 0,
            padding: 0,
            boxSizing: 'border-box',
            fontfamily: 'sans-serif'
        }}
    // style={{ width: '100cm', height: '100cm' }}
    nodes={nodes} edges={edges} fitView 
    />;
};