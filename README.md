Scenario:

Develop a web application that,

Allows users to create workflows for basic data manipulation tasks. Users will visually construct workflows using pre-defined nodes (mentioned in Workflow Nodes section below) available via a drag-and-drop interface.
Then in another page they can upload data & select the workflow to trigger the execution
Workflow Nodes (drag drop nodes):

Filter Data: This node converts all data within a specified column to lowercase.
Wait: This node introduces a 60-second delay in the workflow execution.
Convert Format: This node transforms data from CSV format to JSON.
Send POST Request: This node transmits a POST request containing a JSON payload to a designated URL ( you may use https://requestcatcher.com ).
Functionality:

Frontend (Reactflow):
Users can drag and drop workflow nodes onto the canvas to build their desired workflow.
Nodes can be connected to define the execution order based on user interaction.
The application provides the ability to save and load previously created workflows.
Visual feedback showcases the workflow execution progress.
Save the workflow with an Unique Id
Frontend (Call Workflow):
Simple portal to upload a CSV file
Select workflow Unique Id from drop down created
Submit button that will send the CSV file to the backend to execute the workflow
Backend (Node.js):
The backend receives workflow data (node types, connections) upon saving.
It interprets the workflow and executes tasks in the defined sequence.
For the "Filter Data" node, the backend processes the uploaded data and converts the column values to lowercase.
The "Wait" node introduces an asynchronous delay using server-side logic.
The "Convert Format" node transforms the data from CSV to JSON format.
The "Send POST Request" node transmits the generated JSON payload to a predefined URL (mock URL using https://requestcatcher.com/ can be used).
The backend handles errors gracefully and provides informative feedback to the user interface.
Important: Each node in the front end represents a function block in the backend. So you can chain as many nodes in the front end & backend will read the workflow details & call the correct functions accordingly.
Technical Requirements:

Frontend: React.js, Reactflow
Backend: Node.js (Express.js recommended)
Database: A basic database solution (for storing workflow definitions), mongo/postgres as per your choice
Additional Information:

You can create your own CSV file or use tsx-data.csv 
Refer Reactflow documentation ( https://reactflow.dev/learn )
For state management use Zustand or Redux
Refer to an UI implementation for Reactflow
( https://reactflow.dev/learn/tutorials/react-flow-and-the-web-audio-api ) for the UI creation
Refer to Reactflow examples for workflow builder (https://github.com/xyflow/react-flow-example-apps )
