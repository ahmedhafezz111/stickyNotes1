import multer from 'multer'
import { v4 as uuidv4 } from 'uuid';
import { AppError } from '../utils/appError.js';


export const fileUpload=()=>{
      // const upload = multer({ dest: 'uploads/' })
const storage = multer.diskStorage({
    destination:  (req, file, cb)=>{
      cb(null, 'uploads/')
    },
    filename:  (req, file, cb)=> {
      cb(null, uuidv4()+"-"+file.originalname)
    }
  })

   function fileFilter(req, file, cb){
   
    if(file.mimetype.startsWith('image')){
        cb(null,true)
    }else{
        cb(new AppError('images only',401),false)
    }
  
  
  }
  
  const upload = multer({ storage,fileFilter, limits:{
    fieldSize: 1*1024*1024,
  }
})
    return upload
}


export const uploadSingleFile=fieldName=> fileUpload().single(fieldName)



export const uploadMixOfFiles=(arrayOfFields)=>
 fileUpload().fields(arrayOfFields)