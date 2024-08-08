import { Note } from "../../../database/models/note.model.js"
import jwt, { decode } from 'jsonwebtoken'

/*

find() -> []
findOne() -> {} 
 */
const addNote = async (req,res) =>{

    let notes = await Note.insertMany(req.body)
    res.status(201).json({message:"success",notes})

}



//get methode has no body
const getAllNotes = async (req,res) =>{
    let notes = await Note.find({user:req.user.userId})
    res.status(200).json({message:"success",notes})
}



const updateNote = async (req,res) =>{
    let note = await Note.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.status(200).json({message:"success",note})

}



const deleteNote = async (req,res) =>{
    let note = await Note.findByIdAndDelete(req.params.id, req.body)
    if(!note) return res.status(404).json({message:"note not found"})
    res.status(200).json({message:"success",note})

}

export{
    addNote,
    getAllNotes,
    updateNote,
    deleteNote
}




