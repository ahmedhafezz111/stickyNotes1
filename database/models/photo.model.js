import { Schema , model} from "mongoose";




const schema = new Schema({
   title:String,
   imgUrl:String,
   images:[String]
 
},{
    timestamps:{updatedAt:false},
    versionKey:false
})

schema.post('init',function (doc) {

        doc.imgUrl="http://localhost:3000/uploads/" + doc.imgUrl
        doc.images = doc.images.map(img=>"http://localhost:3000/uploads/" + img)
})

//find =>return array of objects
// init return each doc as object with out array so no need to use loop = better performance

export const Photo = model('Photo',schema)