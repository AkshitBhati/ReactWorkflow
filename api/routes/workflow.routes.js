import express from "express"
import { createWorkflow, getWorkflowForUser } from "../controllers/workflow.controller.js"

const router = express.Router()

router.post("/workflow", createWorkflow)
router.get("/workflow/:userid", getWorkflowForUser)

export default router