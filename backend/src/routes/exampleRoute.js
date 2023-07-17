import express from 'express'
import { protectedRoute } from '../controllers/authController.js'

const router = express.Router()

router.route("/protected").get(protectedRoute)

export default router;
