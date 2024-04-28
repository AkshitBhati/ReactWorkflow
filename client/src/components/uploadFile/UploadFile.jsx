import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { v4 as uuidV4 } from "uuid";
import "./UploadFile.css";
import toast from "react-hot-toast";

const UploadFile = ({ toggleModal, setUniqueIdParent, edges }) => {
  const [uniqueId, setUniqueId] = useState(uuidV4());
  const [csvData, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");

  setUniqueIdParent(uniqueId); // sending data to parent

  const handleFileSelect = () => {
    const fileInput = document.querySelector("#file-input");
    fileInput.click();
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const runWorkflow = async () => {
    if(csvData === null){
      toast.error("Please upload a file")
    }
    try {
      const res = await fetch("/api/execution", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ edges, csvData })
      });

      if (!res.ok) {
        throw new Error("Failed to execute workflow");
      }

      const reader = res.body.getReader();
      let partialResult = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        partialResult += new TextDecoder().decode(value);
        // Update status with partialResult
        setStatus(partialResult);
      }

      // Reset error state on successful execution
      setError(null);

      // Final update after workflow completion
      setStatus("Workflow executed successfully");

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={toggleModal}>
          &times;
        </span>
        <h2 style={{ textAlign: "center" }}>Upload File</h2>
        <div className="upload-screen" onClick={handleFileSelect}>
          <input
            type="file"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            hidden
            id="file-input"
            onChange={handleFileChange}
          />
          <FaCloudUploadAlt size={40} color="rgb(9, 100, 160)" />
          <p>{csvData ? csvData.name : "Choose or drop file"}</p>
        </div>

        <div className="select-id">
          <h3>Select Unique Id</h3>
          <select value={uniqueId} onChange={(e) => setUniqueId(e.target.value)}>
            <option value={uniqueId}>{uniqueId}</option>
          </select>
        </div>

        <div className="run-workflow">
          <button onClick={runWorkflow}>Run Workflow</button>
        </div>

        {status && <div className="status">{status}</div>}
        {error && <div className="error">{error}</div>} 
      </div>
    </div>
  );
};

export default UploadFile;
