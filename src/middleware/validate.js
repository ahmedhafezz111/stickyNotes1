import { signupVal } from "../modules/user/user.validation.js"

export const validate =(schema)=>{
    return async(req,res,next)=>{
        let {error} = schema.validate(req.body,{abortEarly:false})
        if(!error){
            next()
        }else{
            let errMsgs =  error.details.map((err)=>{
               return err.message
            })
            res.json(errMsgs)
        }
        // next(new AppError(errMsgs,401))
    }
}



//or   
//let errMsgs=[]
// error.details.forEach((err) => {
//     errMsgs.push(err.message)
    
// })
// res.json(errMsgs)