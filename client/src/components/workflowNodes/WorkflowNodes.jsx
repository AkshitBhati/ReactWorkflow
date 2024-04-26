import React from 'react';

const WorkflowNodes = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'Start')} draggable>
        Start
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'Filter')} draggable>
       Filter
      </div>

      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'Wait')} draggable>
       Wait
      </div>

      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'Convert Format')} draggable>
       Convert Format
      </div>

      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'Send POST Request')} draggable>
       Send POST Request
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'End')} draggable>
        End
      </div>
    </aside>
  );
};


export default WorkflowNodes