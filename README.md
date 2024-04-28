# Workflow Builder Web Application

## Overview

This web application allows users to create and execute workflows for basic data manipulation tasks. Users can visually construct workflows using pre-defined nodes via a drag-and-drop interface. Once constructed, users can upload data and select the workflow to trigger execution.

## Workflow Nodes (Drag and Drop)

- **Filter Data:** Converts all data within a specified column to lowercase.
- **Wait:** Introduces a 60-second delay in the workflow execution.
- **Convert Format:** Transforms data from CSV format to JSON.
- **Send POST Request:** Transmits a POST request containing a JSON payload to a designated URL (mock URL provided).

## Functionality

### Frontend (Reactflow)

- Users can drag and drop workflow nodes onto the canvas to build their desired workflow.
- Nodes can be connected to define the execution order based on user interaction.
- The application provides the ability to save and load previously created workflows.
- Visual feedback showcases the workflow execution progress.
- Each workflow is saved with a unique ID for easy retrieval.

### Frontend (Call Workflow)

- Simple portal to upload a CSV file.
- Select workflow unique ID from the dropdown menu.
- Submit button sends the CSV file to the backend to execute the workflow.

### Backend (Node.js)

- Receives workflow data (node types, connections) upon saving.
- Interprets the workflow and executes tasks in the defined sequence.
- For the "Filter Data" node, processes the uploaded data and converts the column values to lowercase.
- The "Wait" node introduces an asynchronous delay using server-side logic.
- The "Convert Format" node transforms the data from CSV to JSON format.
- The "Send POST Request" node transmits the generated JSON payload to a predefined URL.
- Handles errors gracefully and provides informative feedback to the user interface.

## Technical Requirements

- **Frontend:** React.js, Reactflow
- **Backend:** Node.js (Express.js recommended)
- **Database:** A basic database solution for storing workflow definitions (MongoDB/PostgreSQL)
- **Additional Information:**
  - Create your own CSV file .
  - Refer to Reactflow documentation and examples for implementation.
  - State management can be handled using Zustand or Redux.

## Getting Started

1. Clone the repository.
2. Install dependencies for both frontend and backend.
3. Start the frontend and backend servers.
4. Access the application in your web browser.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
