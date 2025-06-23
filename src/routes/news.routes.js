import express from  'express'

import {findAll,create} from '../controllers/news.controller.js'
import { authMiddleware } from '../middlewares/auth.midlewar.js'
const router = express.Router()

router.post('/',authMiddleware, create)
router.get('/',findAll)

export default router