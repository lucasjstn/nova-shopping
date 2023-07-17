
import express from 'express'
import { createItems } from '../controllers/itemController.js'
import { protectedRoute } from '../controllers/authController.js'

const router = express.Router()

router.route("/item").post(protectedRoute, createItems)

export default router;
