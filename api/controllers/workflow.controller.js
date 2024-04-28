import Workflow from "../modal/workflow.modal.js";
import errorHandler from "../utils/errorHandler.js";

const createWorkflow = async (req, res, next) => {
    try {
        const { nodes, edges, userid, uniqueid } = req.body;
        const newWorkflow = new Workflow({ nodes, edges, userid, uniqueid });
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

const getWorkflowByUniqueId = async (req, res, next) => {
    const { uniqueid } = req.params;
    
    try {
        const userData = await Workflow.findOne({ uniqueid }); 
        if (!userData) {
            return next(errorHandler(404, "Data does not exist"));
        }
        res.status(200).json(userData);
    } catch (err) {
        next(errorHandler(500, "Could not get the workflow"));
    }
}

export { createWorkflow, getWorkflowForUser,getWorkflowByUniqueId };
