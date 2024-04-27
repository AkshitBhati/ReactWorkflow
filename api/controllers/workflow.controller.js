import Workflow from "../modal/workflow.modal.js";
import errorHandler from "../utils/errorHandler.js";

// Define the executeNode function
async function executeNode(node, nodes, edges) {
    // Perform actions based on the node's label
    // Implement your logic here...
}

const createWorkflow = async (req, res, next) => {
    try {
        const { nodes, edges, userid } = req.body;
        const newWorkflow = new Workflow({ nodes, edges, userid });
        await newWorkflow.save();
        res.status(201).json(newWorkflow);
    } catch (error) {
        next(errorHandler(500, "Could not create workflow"));
    }
};

const getWorkflowForUser = async (req, res, next) => {
    const { userid } = req.params;
    try {
        const userData = await Workflow.find({ userid });
        if (!userData) {
            return next(errorHandler(404, "Data does not exist"));
        }
        res.status(200).json(userData);
    } catch (err) {
        next(errorHandler(500, "Could not get the workflow"));
    }
};

const executeWorkflow = async (req, res, next) => {
    
    
};

export { createWorkflow, getWorkflowForUser };
