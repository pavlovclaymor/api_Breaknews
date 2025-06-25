import express from  'express'
import {findAll,create, topNews, findById} from '../controllers/news.controller.js'
import { authMiddleware } from '../middlewares/auth.midlewar.js'
const router = express.Router()

router.post('/',authMiddleware, create)
router.get('/top', topNews)
router.get('/',findAll)
router.get('/:id', findById)



export default router