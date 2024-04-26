import React, { useState } from 'react'
import "./Workflow.css"
import WorkflowNodes from '../../components/workflowNodes/WorkflowNodes'
import WorkflowChart from '../../components/workflowChart/WorkflowChart'

const Workflow = () => {
  const [nodeName, setNodeName] = useState([])
  return (
    <div className='workflow-page'>
      <div className="workflow-node">
        <WorkflowNodes  setNodeName={setNodeName}/>
      </div>
      <div className="workflow-chart">
        <WorkflowChart nodeName={nodeName}/>
      </div>
    </div>
  )
}

export default Workflow
