import express from "express"
import { verifyToken } from "../middlewares/auth.middleware.js"
import { getMyProfile, getMeasurements , getDoctors , getAppointments , getWallet} from "../controllers/user.controller.js"

const router = express.Router()

router.get("/my-profile",verifyToken,getMyProfile)
router.get("/measurements",verifyToken,getMeasurements)
router.get("/doctors",verifyToken,getDoctors)
router.get("/appointments",verifyToken,getAppointments)
router.get("/wallet",verifyToken,getWallet)

export default router
