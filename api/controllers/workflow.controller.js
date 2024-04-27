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

async function runWorkflowController(req, res) {
    try {
        const { nodes, edges } = req.body;

        // Find the starting node (the one without any incoming edges)
        const startingNode = nodes.find((node) => !edges.some((edge) => edge.target === node.id));

        // Start executing the workflow from the starting node
        await executeNode(startingNode, nodes, edges);

        // Respond with success message and the workflow data
        res.status(200).json({
            message: "Workflow executed successfully",
            workflow: {
                nodes: nodes,
                edges: edges,
            },
        });
    } catch (error) {
        // Handle errors
        console.error("Error executing workflow:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export { createWorkflow, getWorkflowForUser, runWorkflowController };
