import { Router } from "express";
import { signin, signup } from "./user.controller.js";
import { checkEmail } from "../../middleware/checkEmail.js";
import { validate } from "../../middleware/validate.js";
import { signinVal, signupVal } from "./user.validation.js";





const userRouter = Router()
userRouter.post('/signup',validate(signupVal),checkEmail,signup)
userRouter.post('/signin',validate(signinVal),signin)




export default userRouter