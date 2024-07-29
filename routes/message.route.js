import express from 'express'
import { getMessage, sendMessage } from '../controller/message.controller.js'
import { verifyUser } from '../utils/verifyToken.js'

const router=express.Router()

router.post('/send/:receiverId',verifyUser,sendMessage)
router.get('/get/:receiverId',verifyUser,getMessage)

export default router 