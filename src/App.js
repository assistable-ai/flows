import React, { useState } from 'react';
import ReactFlow, { addEdge, MiniMap, Controls, Background } from 'react-flow-renderer';
import './App.css';

const initialElements = [
  { id: '1', type: 'input', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
  { id: '3', data: { label: 'Node 3' }, position: { x: 400, y: 100 } },
];

const Flow = () => {
  const [elements, setElements] = useState(initialElements);
  const onConnect = (params) => setElements((els) => addEdge(params, els));

  return (
    <div style={{ height: 500 }}>
      <ReactFlow elements={elements} onConnect={onConnect}>
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
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
