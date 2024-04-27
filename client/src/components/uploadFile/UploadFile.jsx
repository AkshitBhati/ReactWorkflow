import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { v4 as uuidV4 } from "uuid";
import "./UploadFile.css";

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
    try {
      const formData = new FormData();
      formData.append("csvFile", csvData);
      formData.append("edges", JSON.stringify(edges || {}));

      const res = await fetch("/api/execution", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: formData
      });

      if (!res.ok) {
        throw new Error("Failed to execute workflow");
      }

      // Reset error state on successful execution
      setError(null);

      // Start polling for status updates
      setStatus("Executing workflow...");
      pollStatus();
    } catch (err) {
      setError(err.message);
    }
  };

  const pollStatus = async () => {
    try {
      // Simulate polling for status updates
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds

      // Simulate different status updates
      setStatus("Filtering data...");
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait for 3 seconds

      setStatus("Converting data...");
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait for 3 seconds

      setStatus("Sending data...");
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait for 3 seconds

      setStatus("Workflow executed successfully."); // Final status update
    } catch (err) {
      console.error("Error polling for status:", err);
      setStatus("Error: Unable to retrieve status updates.");
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

        {status && <div className="status">{status}</div>} {/* Display status update */}
        {error && <div className="error">{error}</div>} {/* Display error message */}
      </div>
    </div>
  );
};

export default UploadFile;
