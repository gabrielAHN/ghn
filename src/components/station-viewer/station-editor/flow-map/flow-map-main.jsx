import ReactFlow, {
  ReactFlowProvider,
    addEdge,
    useReactFlow,
    MiniMap,
    Position,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    applyNodeChanges, 
    applyEdgeChanges 
  } from 'reactflow';

import React from 'react';

import elkLayout from "./graph.jsx";
import 'reactflow/dist/style.css';
import PlatformNode from './platform-node.jsx';
import ExitEntranceNode from './exit-entrance-node.jsx';
import PathwaysNode from './pathways-node.jsx';
import { useEffect, useMemo } from 'react';

const PathwayType = {
  0: "PlatformNode",
  2: "ExitEntranceNode",
  3: "PathwaysNode"
};

const nodeDirection = {
  0: 1,
  2: 3,
  3: 2
};


const nodeTypes = { 
  'PlatformNode': PlatformNode,
  'ExitEntranceNode': ExitEntranceNode,
  'PathwaysNode': PathwaysNode
};


function FlowFormat(props) {
  const { SelectStation, StationData } = props;
  const initialNodes = StationData[SelectStation].pathways.nodes
  const initialEdges = StationData[SelectStation].pathways.links

  const NodeList = initialNodes.map((node) => 
    node.stop_id
  )

  var FlowNodes = initialNodes.map((node) => {
    return {
        id: node.stop_id,
        type: PathwayType[node.location_type],
        className: PathwayType[node.location_type],
        layoutOptions: {
          'partitioning.partition': nodeDirection[node.location_type]
        },
        data: { label: node  },
        // data: { label: node.stop_name  },
        // extent: 'parent',

        // type: nodeTypes[node.location_type],
        // parentNode: PathwayType[node.location_type],
        // extent: 'parent',
        // position: Position.Right,
        // direction: nodeDirection[node.location_type] ,
        width: 0.5,
        height: 0.5,
        // width: node.type === "rectangleNode" ? 70 : 50,
        // height: node.type === "rhombusNode" ? 70 : 50
    };
  });

  
  const FlowEdges = initialEdges.map((edges) => {
      if (NodeList.includes(edges.from_stop_id) && NodeList.includes(edges.to_stop_id)) {
        
        return {
            id: edges.pathway_id,
            source: edges.from_stop_id,
            target: edges.to_stop_id
        };
    }
  });

  return {nodes: FlowNodes, edges: FlowEdges}
  }


export default function FlowMap(props) {
  const { SelectStation, StationData } = props;
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);

  const { initialNodes, initialEdges } = useMemo(() => {
    const data = StationData[SelectStation].pathways;
    return { initialNodes: data.nodes, initialEdges: data.links };
  }, [SelectStation, StationData]);

  useEffect(() => {
    const nodeList = new Set(initialNodes.map(node => node.stop_id));

    const formattedNodes = initialNodes.map(node => ({
      id: node.stop_id,
      type: PathwayType[node.location_type],
      data: { label: node }
    }));

    const formattedEdges = initialEdges.filter(edge => 
      nodeList.has(edge.from_stop_id) && nodeList.has(edge.to_stop_id)
    ).map(edge => ({
      id: edge.pathway_id,
      source: edge.from_stop_id,
      target: edge.to_stop_id
    }));

    elkLayout({ nodes: formattedNodes, edges: formattedEdges }).then(graph => {
      const nodesWithPosition = graph.children.map(node => ({
        ...formattedNodes.find(n => n.id === node.id),
        position: { x: node.x, y: node.y }
      }));
      setNodes(nodesWithPosition);
      setEdges(graph.edges);
    });
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  if (nodes.length === 0) {
    return <>Loading</>;
  }

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          style={{ background: '#aaa' }}
        >
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
    )
};