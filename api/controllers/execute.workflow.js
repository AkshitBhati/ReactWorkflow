import errorHandler from "../utils/errorHandler.js";

const executeWorkflow = (req, res, next) => {
    const { edges } = req.body;

    try {
        const workflowSequence = [];

        edges.forEach((edge, index) => {
            if (index === 0 || edge.source !== edges[index - 1]?.target) {
                workflowSequence.push(edge.source);
            }
            workflowSequence.push(edge.target);
        });

        const actions = {
            Filter: () => {
                console.log("Filter0");
            },
            Wait: () => {
                console.log("Wait1");
            },
            Convert: () => {
                console.log("Convert2");
            },
            Send: () => {
                console.log("Send3");
            }
        };
        
        const modifiedArray = workflowSequence.map(item => item.replace(/\s\d+$/, ''));
        
        modifiedArray.forEach(action => {
            if (actions[action]) {
                actions[action]();
            } else {
                console.log(`Function for action ${action} not found.`);
            }
        });

        // Send a response back to the client (Postman)
        res.status(200).json({ message: "Workflow executed successfully" });
    } catch (err) {
        // If an error occurs, handle it and send an error response
        next(errorHandler(400, "Error executing workflow"));
    }
};

export { executeWorkflow };
