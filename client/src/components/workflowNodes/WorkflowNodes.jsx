import React from 'react'
import "./WorkflowNodes.css"

const WorkflowNodes = () => {
  return (
    <div className='nodes-container'>
      <h1>Workflow Nodes</h1>
      <div>
        <p>Start</p>
        <p>Filter Data</p>
        <p>Wait</p>
        <p>Convert Format</p>
        <p>Send POST Request</p>
      </div>
    </div>
  )
}

export default WorkflowNodes
