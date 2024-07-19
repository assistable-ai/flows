import React, { useState } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  ReactFlowProvider,
  applyNodeChanges,
  applyEdgeChanges
} from 'react-flow-renderer';
import './App.css';

const initialNodes = [
  { id: '1', type: 'input', data: { label: 'Input Node' }, position: { x: 250, y: 5 } },
  { id: '2', type: 'customNode', data: { label: 'Custom Node' }, position: { x: 100, y: 100 } },
  { id: '3', data: { label: 'Default Node' }, position: { x: 400, y: 100 } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3' },
];

const CustomNode = ({ data }) => {
  return (
    <div style={{ padding: 10, border: '1px solid black', borderRadius: 5 }}>
      {data.label}
    </div>
  );
};

const nodeTypes = {
  customNode: CustomNode,
};

const Flow = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));
  const onNodesChange = (changes) => setNodes((nds) => applyNodeChanges(changes, nds));
  const onEdgesChange = (changes) => setEdges((eds) => applyEdgeChanges(changes, eds));

  const addNode = () => {
    const newNode = {
      id: `${nodes.length + 1}`,
      data: { label: `new_state_${nodes.length + 1}` },
      position: { x: Math.random() * 250, y: Math.random() * 250 },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  const saveWorkflow = () => {
    const workflow = {
      nodes: nodes.map(node => ({
        id: node.id,
        label: node.data.label,
        position: node.position
      })),
      edges: edges.map(edge => ({
        id: edge.id,
        source: edge.source,
        target: edge.target
      }))
    };

    fetch('YOUR_ENDPOINT_URL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workflow),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div style={{ height: 800, width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <button onClick={saveWorkflow} style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Save</button>
        <button onClick={addNode} style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>+ Add State</button>
      </div>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Flow />
    </div>
  );
}

export default App;
