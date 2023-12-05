// import ReactFlow, { ReactFlowProvider } from 'reactflow';

import ReactFlow, {
  ReactFlowProvider,
    addEdge,
    useReactFlow,
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
import NodesOrganizer from './node-organizer';
import 'reactflow/dist/style.css';


export default function FlowMap(props) {

    // create_nodes()
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useEdgesState([]);
    const { getLayoutedElements } = NodesOrganizer();
    // const { getLayoutedElements } = NodesOrganizer({useReactFlow});

    console.log(getLayoutedElements({ 'elk.algorithm': 'layered', 'elk.direction': 'DOWN' }))

    var pathway_nodes = props.station_data.pathways.nodes
    // console.log(pathway_nodes)
    var flow_map_nodes = pathway_nodes.map(
      (node, index) => {
        // console.log(index, node)
        node['id'] = node.stop_id
        // node['type'] = 'dragHandleNode'
        node['animated'] = 'true'
        node['data'] = { label: node.stop_name }
        if (node.location_type === "0") {
          node['position'] = { x: 0 , y: index * 20  }
        } else if (node.location_type === "3") {
          node['position'] = { x: 250 , y: index * 20  }
        } else if (node.location_type === "2") {
          node['position'] = { x: 500 , y: index * 20  }
        }

        return node
      }
    )
    // console.log(getLayoutedElements)
    // setNodes(flow_map_nodes)
    // {
    //   id: '1',
    //   type: 'dragHandleNode',
    //   animated: true,
    //   data: { label: 'Input Node' },
    //   position: { x: 0, y: 0 },
    // }

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
    
    const onNodesChange = useCallback(
      (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
      []
    );
    const onEdgesChange = useCallback(
      (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
      []
    );
  
    return (
      <div style={{width: '100vh', height: '50vh'}}>
        <ReactFlowProvider>
          <ReactFlow
              // sx={{
              //     width: '100vh',
              //     height: '100vh',
              //     margin: 0,
              //     padding: 0,
              //     boxSizing: 'border-box',
              //     fontfamily: 'sans-serif'
              // }}
              nodes={flow_map_nodes}
              // edges={edges}
              // onNodesChange={onNodesChange}
              // onEdgesChange={onEdgesChange}
              // onConnect={onConnect}
            >
            <Controls />
            <Background color="#aaa" gap={16} />
            </ReactFlow>
          </ReactFlowProvider>
      </div>
    )
};