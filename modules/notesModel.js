const mongoose=require("mongoose")

const noteShema=mongoose.Schema({

    title:String,
    note:String,
    category:String,
    author:String,
    userID:String

    
})

const NoteModel=mongoose.model("note",noteShema)

module.exports={
    NoteModel
}