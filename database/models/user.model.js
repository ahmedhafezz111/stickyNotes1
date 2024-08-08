import { Schema , model} from "mongoose";




const schema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:String,
    password:String,
    confirmEmail:{
        type: Boolean,
        default:false      
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    }
},{
    timestamps:{updatedAt:false},
    versionKey:false
})

export const User = model('User',schema)