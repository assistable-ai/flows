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
      data: { label: `Node ${nodes.length + 1}` },
      position: { x: Math.random() * 250, y: Math.random() * 250 },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  return (
    <div style={{ height: 500 }}>
      <button onClick={addNode}>Add Node</button>
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

