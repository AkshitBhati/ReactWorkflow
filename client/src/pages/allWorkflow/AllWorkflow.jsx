import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
} from 'reactflow';
import { useParams } from "react-router-dom"
import 'reactflow/dist/style.css';

const AllWorkflow = () => {
  const { id } = useParams()
  
  const reactFlowWrapper = useRef(null);

  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])

    const getData = async() => {
        fetch(`/api/workflow/${currentUser._id}`).then((res) => res.json()).then((data) => {
          console.log(data)
          data.map((data) => {
            console.log(data)
            setNodes(data.nodes)
            setEdges(data.edges)
          })
        })
    }

    useEffect(() => {
        getData()
    }, [])

    const onConnect = useCallback(
      (params) => setEdges((eds) => addEdge(params, eds)),
      [],
    );

    const onDragOver = useCallback((event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    }, []);
  
    const onDrop = useCallback(
      (event) => {
        event.preventDefault();
  
        const type = event.dataTransfer.getData('application/reactflow');
  
        
        if (typeof type === 'undefined' || !type) {
          return;
        }
  
        
        const position = reactFlowInstance.screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });
        const newNode = {
          id: type + " " + getId(),
          // type:type,
          position,
          data: { label: `${type}` },
        };
  
        setNodes((nds) => nds.concat(newNode));
      },
      [reactFlowInstance],
    );
  return (
    <div style={{height:"80vh"}}>
      <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            // onNodesChange={onNodesChange}
            // onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            
          >
            <Controls />
            <Background />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
    </div>
  )
}

export default AllWorkflow
