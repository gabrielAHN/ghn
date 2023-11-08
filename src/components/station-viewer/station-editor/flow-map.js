
import ReactFlow, {
    addEdge,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    applyNodeChanges, 
    applyEdgeChanges 
  } from 'reactflow';

import React, { useCallback } from 'react';
import { useState, useEffect } from 'react';
import 'reactflow/dist/style.css';



const initialNodes = [
    {
      id: '1',
      type: 'dragHandleNode',
      animated: true,
      data: { label: 'Input Node' },
      position: { x: 0, y: 0 },
    },
  
    {
      id: '2',
      
      // you can also pass a React component as a label
      data: { label: <div>Default Node</div> },
      position: { x: 10, y: 10 },
    },
    {
      id: '3',
      type: 'dragHandleNode',
      data: { label: 'Output Node' },
      position: { x: 20, y: 20 },
    },
  ];
  
const initialEdges = [
{ id: 'e1-2', source: '1', target: '2' },
{ id: 'e2-3', source: '2', target: '3', animated: true },
];


export default function FlowMap() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useEdgesState(initialEdges);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
    
    const onNodesChange = useCallback(
      (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
      []
    );
    const onEdgesChange = useCallback(
      (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
      []
    );
  
    return <ReactFlow
        style={{
            width: '100cm',
            height: '100cm',
            margin: 0,
            padding: 0,
            boxSizing: 'border-box',
            fontfamily: 'sans-serif'
        }}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
      <Controls />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
};