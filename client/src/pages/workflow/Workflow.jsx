import React, { useState } from 'react';
import "./Workflow.css";
import WorkflowNodes from '../../components/workflowNodes/WorkflowNodes';
import WorkflowChart from '../../components/workflowChart/WorkflowChart';
import UploadFile from '../../components/uploadFile/UploadFile';

const Workflow = () => {
  const [nodeParent, setNodesParent] = useState([]); 
  const [edgeParent, setEdgesParent] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const [uniqueId, setUniqueIdParent] = useState("")
  
  // Function to toggle modal visibility
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  
  return (
    <div className='workflow-page'>
      <div className="workflow-node">
        <WorkflowNodes nodes={nodeParent} edges={edgeParent} toggleModal={toggleModal} uniqueId={uniqueId} />
      </div>
      <div className="workflow-chart">
        <WorkflowChart nodeParent={nodeParent} setNodesParent={setNodesParent} edgeParent={edgeParent} setEdgesParent={setEdgesParent} />
      </div>

      {/* Modal */}
      {showModal && (
        <UploadFile toggleModal={toggleModal} setUniqueIdParent={setUniqueIdParent} edges={edgeParent}/>
      )}
    </div>
  );
}

export default Workflow;
