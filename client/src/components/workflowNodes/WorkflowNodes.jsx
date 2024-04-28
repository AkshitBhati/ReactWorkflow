import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { workflowSaveStart, workflowSaveSuccess,workflowSaveFailure } from "../../redux/workflow/workflowSlice"
import { toast } from "react-hot-toast"
import { Link } from "react-router-dom";
import "./WorkflowNodes.css";

const WorkflowNodes = ({ nodes, edges, toggleModal, uniqueId:uniqueid }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  const dispatch = useDispatch()

  const { currentUser } = useSelector(state => state.user)
  let userid = currentUser._id
  
  const saveWorkflow = async () => {
    if(uniqueid === ""){
      toast.error("Upload a file")
    }
    try {
      dispatch(workflowSaveStart());
      const res = await fetch("/api/workflow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodes, edges, userid, uniqueid }),
      });
  
      const data = await res.json();
      if (data.success === false) {
        dispatch(workflowSaveFailure(data.message));
      }
  
      if (res.ok) {
        dispatch(workflowSaveSuccess(data));
        toast.success("Workflow saved successfully")
      }
    } catch (err) {
      dispatch(workflowSaveFailure(err.message));
    }
  };
  
  
  return (
    <aside className="nodes">
      <div className="description">Workflow Nodes.</div>

      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "Filter")}
        draggable
      >
        Filter
      </div>

      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "Wait")}
        draggable
      >
        Wait
      </div>

      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "Convert")}
        draggable
      >
        Convert Format
      </div>

      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "Send")}
        draggable
      >
        Send POST Request
      </div>

      <div className="workflow-buttons">
        <button onClick={saveWorkflow}>Save Workflow</button>
        <button onClick={toggleModal}>Upload File</button>
      </div>
    </aside>
  );
};

export default WorkflowNodes;
