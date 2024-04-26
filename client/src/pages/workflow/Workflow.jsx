import React from 'react'
import "./Workflow.css"
import WorkflowNodes from '../../components/workflowNodes/WorkflowNodes'
import WorkflowChart from '../../components/workflowChart/WorkflowChart'

const Workflow = () => {
  return (
    <div className='workflow-page'>
      <div className="workflow-node">
        <WorkflowNodes />
      </div>
      <div className="workflow-chart">
        <WorkflowChart />
      </div>
    </div>
  )
}

export default Workflow
