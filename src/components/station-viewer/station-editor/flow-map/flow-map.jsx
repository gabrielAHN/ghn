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

// const nodeTypes = {
//   0: PlatformNode,
//   2: ExitEntranceNode,
//   3: PathwaysNode
// };

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

// const nodeDirection = {
//   0: 'left',
//   2: '',
//   3: 'right'
// };

const nodeTypes = { 
  'PlatformNode': PlatformNode,
  'ExitEntranceNode': ExitEntranceNode,
  'PathwaysNode': PathwaysNode
};


function FlowFormat(props) {
  var initialNodes = props.station_data.pathways.nodes
  var initialEdges = props.station_data.pathways.links



  var FlowNodes = initialNodes.map((node) => {
    // console.log(PathwayType[node.location_type])
    return {
        id: node.stop_id,
        type: PathwayType[node.location_type],
        className: PathwayType[node.location_type],
        layoutOptions: {
          'partitioning.partition': nodeDirection[node.location_type]
        },
        // data: { label: node.stop_name  },
        // extent: 'parent',
        data: { label: node  },
        // type: nodeTypes[node.location_type],
        // parentNode: PathwayType[node.location_type],
        // extent: 'parent',
        // position: Position.Right,
        // direction: nodeDirection[node.location_type] ,
        width: 1,
        height: 1,
        // width: node.type === "rectangleNode" ? 70 : 50,
        // height: node.type === "rhombusNode" ? 70 : 50
    };
  });

  
  const FlowEdges = initialEdges.map((edges) => {
      return {
          id: edges.pathway_id,
          source: edges.from_stop_id,
          target: edges.to_stop_id
      };
  });

  return {nodes: FlowNodes, edges: FlowEdges}
  }



export default function FlowMap(props) {
  const [nodes, setNodes, onNodesChange] = useNodesState(null);
  const [edges, setEdges, onEdgesChange] = useEdgesState(null);
  // const [nodes, setNodes, onNodesChange] = useNodesState([]);
  // const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    // const [nodes, setNodes, onNodesChange] = useState(null);
    // const [edges, setEdges] = useState(null);

    var flowdata = FlowFormat(props)


    const nodesForFlow = (graph) => {
      return [
        ...graph.children.map(
          (node) => {
          return {
            ...flowdata.nodes.find((n) => n.id === node.id),
            position: { x: node.x, y: node.y }
          };
        })
      ];
    };
    const edgesForFlow = (graph) => {
      return graph.edges;
    };

    elkLayout(flowdata).then(
      (graph) => {
        // console.log(nodesForFlow(graph));
      setNodes(nodesForFlow(graph));
      setEdges(edgesForFlow(graph));
    }
    );

    if (nodes === null) {
      return <>Loading</>;
    }
    return (
      <div style={{width: '90%', height: '120vh'}}>
        <ReactFlowProvider>
          <ReactFlow
              sx={{
                  width: '100vh',
                  height: '100vh',
                  margin: 0,
                  padding: 0,
                  boxSizing: 'border-box',
                  fontfamily: 'sans-serif'
              }}
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              // onConnect={onConnect}
            >
            <Controls />
            <Background color="#aaa" gap={16} />
            </ReactFlow>
          </ReactFlowProvider>
      </div>
    )
};