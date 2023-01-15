const express=require("express")

const {NoteModel}=require("../modules/notesModel")

const notesRouter=express.Router()


notesRouter.get("/",async(req,res)=>{

const notes= await NoteModel.find()

res.send(notes)
})

notesRouter.post("/create",async (req,res)=>{

    const  payload=req.body

    try{
        const new_note= new NoteModel(payload)

        await new_note.save()
    
        res.send({"msg":"Note created"})
    }catch(err){
        res.send({"msg":"Data is invalid"})
    }

  
     
    
})

notesRouter.patch("/update/:id",async (req,res)=>{

    const payload=req.body

    const id=req.params.id
    const note=await NoteModel.findOne({"_id":id})

    const userID_note=note.userID

    const userID_req=req.body.userID
   try{

    if(userID_req!==userID_note){
        res.send({"msg":"Not authorized"})
    }else{
        await NoteModel.findByIdAndUpdate({"_id":id},payload)

        res.send("updated the Note")
    }
   }catch(err){
console.log(err)
res.send("Invalid")
   }
})
notesRouter.delete("/delete/:id",async (req,res)=>{

    const payload=req.body

    const id=req.params.id
    const note=await NoteModel.findOne({"_id":id})

    const userID_note=note.userID

    const userID_req=req.body.userID
   try{

    if(userID_req!==userID_note){
        res.send({"msg":"Not authorized"})
    }else{
        await NoteModel.findByIdAndDelete({"_id":id})

        res.send("Deleted the Note")
    }
   }catch(err){
console.log(err)
res.send("Invalid")
   }
})
module.exports={
    notesRouter
}

// {

//     "title":"coding ",
//   "note":"coiding is interesting",
//   "category":"code",
//   "author":"Tarak"

// }