import express from 'express'
import { dbConnection } from './database/dbConnection.js'
import userRouter from './src/modules/user/user.routes.js'
import { checkEmail } from './src/middleware/checkEmail.js'
import { signin } from './src/modules/user/user.controller.js'
import noteRouter from './src/modules/note/note.routes.js'
import { User } from './database/models/user.model.js'
import jwt from 'jsonwebtoken'
import { AppError } from './src/utils/appError.js'
import { Photo } from './database/models/photo.model.js'
import { uploadMixOfFiles } from './src/fileUpload/fileUpload.js'

const app = express()
const port = 3000

app.use(express.json())
app.use('/uploads',express.static('uploads')) //static send from backend to frontend

app.use('/auth',userRouter)
app.use('/notes',noteRouter)
app.use('/verify/:token', async(req,res)=>{

    jwt.verify(req.params.token,'hafez',async(err,payload)=>{
        if(err) return res.json(err)
        await User.findOneAndUpdate({email:payload.email},{confirmEmail:true})
        res.json({message:'sucess',email:payload.email})
    })    
 
})




app.post('/photos',uploadMixOfFiles( [{ name: 'photo', maxCount: 1 },{ name: 'images', maxCount: 8 }]),async(req,res,next)=>{
    req.body.imgUrl=req.files.photo[0].filename
    req.body.images=req.files.images.map((val)=>val.filename)
    await Photo.insertMany(req.body)
    res.json({message:"success"})
})


app.get('/photos',async(req,res,next)=>{

  let photos = await Photo.find()
  res.json({message:"success",photos})
})

app.use('*',(req,res,next)=>{
    next(new AppError(`route not found: ${req.originalUrl}`,404))
})

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))