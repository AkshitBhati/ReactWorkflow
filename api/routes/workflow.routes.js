import express from "express"
import { createWorkflow, getWorkflowByUniqueId, getWorkflowForUser } from "../controllers/workflow.controller.js"
import { executeWorkflow } from "../controllers/execute.workflow.js"

const router = express.Router()

router.post("/workflow", createWorkflow)
router.get("/workflow/:userid", getWorkflowForUser)
router.get("/workflow/byuniqueid/:uniqueid", getWorkflowByUniqueId);

router.post("/execution", executeWorkflow)


export default router