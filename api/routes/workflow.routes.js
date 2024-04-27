import express from "express"
import { createWorkflow, getWorkflowForUser, runWorkflowController } from "../controllers/workflow.controller.js"

const router = express.Router()

router.post("/workflow", createWorkflow)
router.get("/workflow/:userid", getWorkflowForUser)
router.post("/workflow-controller", runWorkflowController)

export default router