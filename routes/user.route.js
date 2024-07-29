import express from 'express'
import { getUsers, updateUser } from '../controller/user.controller.js'
import { verifyUser } from '../utils/verifyToken.js'
const router=express.Router()

router.put('/update/:userId',verifyUser,updateUser)
router.get('/getusers',verifyUser,getUsers)

export default router