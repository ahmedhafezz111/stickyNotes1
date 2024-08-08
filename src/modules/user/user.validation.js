import Joi from "joi"


const signupVal = Joi.object({
    name:Joi.string().min(2).max(20).required(),
    email:Joi.string().email().required(),
    password:Joi.string().pattern(/^[A-Z][A-za-z0-9]{8,40}$/).required(),
    rePassword:Joi.valid(Joi.ref('password')).required(),
    age:Joi.number().min(8).max(80).required()
})


const signinVal = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().pattern(/^[A-Z][A-za-z0-9]{8,40}$/).required()
    
})

export{
    signupVal,
    signinVal
}