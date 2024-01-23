import { Handle, Position } from 'reactflow';

export default function ExitEntranceNode({data}) {
  return (
    <div
      style={{border: '1px solid #555', borderRadius: '5px',
      background: '#eee', borderRadius: '5px', fontSize: '12px',
      textAlign: 'center', buffer: '1%' }}
    >
      <h1>{data.label.stop_name}</h1>
      <h1>{data.label.location_type}</h1>
      <Handle type="source" position={Position.Right}  id={data.label.stop_id}/>
    </div>
  );
};
