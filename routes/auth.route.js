import express from 'express'
import { signin, signinWithPhoneNumber, signout, signup } from '../controller/auth.controller.js'


const router=express.Router()

router.post("/signup",signup)
router.post("/signin",signin)
router.post("/signinwithphonenumber",signinWithPhoneNumber)
router.put("/signout",signout)


export default router
