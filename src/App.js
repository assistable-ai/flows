import React, { useState } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  MiniMap,
  Controls,
  Background,
} from 'react-flow-renderer';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import './App.css';

const initialElements = [
  { id: '1', type: 'input', data: { label: 'Starting Node' }, position: { x: 250, y: 5 } },
];

function App() {
  const [elements, setElements] = useState(initialElements);
  const [open, setOpen] = useState(false);
  const [nodeName, setNodeName] = useState('');
  const [selectedNode, setSelectedNode] = useState(null);

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) => setElements((els) => addEdge(params, els));
  const onElementClick = (_, element) => {
    setSelectedNode(element);
    setNodeName(element.data.label);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setElements((els) =>
      els.map((el) => (el.id === selectedNode.id ? { ...el, data: { label: nodeName } } : el))
    );
    handleClose();
  };

  const addNode = () => {
    const newNode = {
      id: `${elements.length + 1}`,
      data: { label: `Node ${elements.length + 1}` },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
    };
    setElements((els) => els.concat(newNode));
  };

  return (
    <div className="App">
      <ReactFlowProvider>
        <div style={{ height: 800 }}>
          <ReactFlow
            elements={elements}
            onElementsRemove={onElementsRemove}
            onConnect={onConnect}
            onElementClick={onElementClick}
            deleteKeyCode={46}
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
      <Button variant="contained" color="primary" onClick={addNode} startIcon={<AddIcon />}>
        Add Node
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Node</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit the name of the node.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Node Name"
            fullWidth
            value={nodeName}
            onChange={(e) => setNodeName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
