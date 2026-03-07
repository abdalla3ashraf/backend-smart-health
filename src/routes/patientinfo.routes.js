import express from "express"

import PatientInfoController from "../controllers/patientinfo.controller.js"
import { getPatientInfo ,getProfile ,updateProfile } from "../controllers/patientinfo.controller.js"
const router = express.Router()

router.post("/save-info",PatientInfoController.savePatientInfo)
router.get("/:id",getPatientInfo)
router.get("/profile",getProfile)
router.put("/profile",updateProfile)
export default router