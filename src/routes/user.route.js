import express from  'express'
import usercontroller from '../controllers/user.controller.js'
import {validId,validUser} from  '../middlewares/global.middlewares.js'

const router = express.Router()

router.post("/", usercontroller.create)
router.get("/", usercontroller.findAll)
router.get("/:id",validId, validUser,usercontroller.findById)
router.patch("/:id",validId, validUser,usercontroller.update)  

export default router