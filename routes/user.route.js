import express from 'express'
import { updateUser } from '../controller/user.controller.js'
import { verifyUser } from '../utils/verifyToken.js'
const router=express.Router()

router.put('/update/:userId',verifyUser,updateUser)

export default router