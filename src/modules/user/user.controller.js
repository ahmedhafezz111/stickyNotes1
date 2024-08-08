import { User } from "../../../database/models/user.model.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import { sendMail } from "../../email/email.js"











const signup = async (req,res)=>{

    let user = await  User.insertMany(req.body) 
    sendMail(req.body.email)
    user[0].password=undefined
    res.status(201).json({message:'sucess',user})
    

}



const signin = async (req,res)=>{

    let user = await User.findOne({email:req.body.email}) //null
    
    if(!user || !bcrypt.compareSync(req.body.password ,user.password))
        return  res.status(401).json({message:"incorrect password or email ."})
     
    jwt.sign({userId:user._id, name:user.name , role:user.role },
        'myNameIsHafez',(err,token)=>{
        res.json({message:"success..." ,token})
    }) 
    

}

export {
    signup,
    signin,
    
}