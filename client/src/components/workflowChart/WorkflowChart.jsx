import React from 'react'
import ReactFlow, { Controls, Background } from 'reactflow';
import "./WorkflowChart.css"
import 'reactflow/dist/style.css';

const nodes = [
    {
      id: '1',
      position: { x: 0, y: 0 },
    },
  ];
//   const nodes = [
//     {
//       id: '1',
//       data: { label: 'Hello' },
//       position: { x: 0, y: 0 },
//       type: 'input',
//     },
//     {
//       id: '2',
//       data: { label: 'World' },
//       position: { x: 100, y: 100 },
//     },
//   ];
    
const WorkflowChart = () => {
  return (
    <div style={{height: '100%'}}>
      <ReactFlow nodes={nodes}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}

export default WorkflowChart
