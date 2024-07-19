import React, { useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Handle,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 250, y: 5 }, data: { label: 'Input Node' }, type: 'input' },
  { id: '2', position: { x: 100, y: 100 }, data: { label: 'Default Node' } },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const CustomNode = ({ data }) => (
  <div style={{ padding: 10, border: '1px solid black', borderRadius: 5 }}>
    {data.label}
    <Handle type="source" position="right" />
    <Handle type="target" position="left" />
  </div>
);

const nodeTypes = { custom: CustomNode };

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
  const onNodeClick = (event, node) => setSelectedNode(node);

  const addNode = () => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      data: { label: `Node ${nodes.length + 1}` },
      position: { x: Math.random() * 250, y: Math.random() * 250 },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  const saveFlow = () => {
    // Add your save logic here
    console.log('Flow saved!');
  };

  return (
    <div style={{ height: '100vh', display: 'flex' }}>
      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 10 }}>
        <button onClick={saveFlow}>Save</button>
        <button onClick={() => console.log('Go back')}>Back</button>
      </div>
      <button onClick={addNode} style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}>Add Node</button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
      {selectedNode && (
        <div style={{ position: 'absolute', right: 0, top: 0, width: '300px', height: '100vh', backgroundColor: '#f9f9f9', borderLeft: '1px solid #ccc', padding: '20px' }}>
          <h3>{selectedNode.data.label}</h3>
          <textarea
            value={selectedNode.data.label}
            onChange={(e) => {
              const updatedNode = { ...selectedNode, data: { ...selectedNode.data, label: e.target.value } };
              setNodes((nds) => nds.map((node) => (node.id === selectedNode.id ? updatedNode : node)));
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Flow;
