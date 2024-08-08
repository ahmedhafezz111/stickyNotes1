import { connect } from "mongoose";

export const dbConnection = connect('mongodb://localhost:27017/notes').then(()=>{
    console.log("db connection successfully");
})
