const express=require("express")
const {UserModel}=require("../modules/userModel")
const jwt =require("jsonwebtoken")
const bcrypt=require("bcrypt")
const userRoute=express.Router()


userRoute.post("/signup",async (req,res)=>{

    const {name,email,password,age}=req.body
    
    try{
        bcrypt.hash(password, 8, async(err ,hash)=>{

            const user=new UserModel({name,email,password:hash,age})

            await user.save()

            res.send("Registered successfully")
        })
    }catch(err){
        res.send("Error in registering the user")
    console.log(err)
    }

})


userRoute.post("/login",async(req,res)=>{

    const {email,password}=req.body

    try{

        const user=await UserModel.find({email})

        if(user.length>0){

            bcrypt.compare(password ,user[0].password, function(err,result){

                if(result){

                    const token =jwt.sign({course:'backend'},"masai");

                    res.send({"msg":"Login Successfull","token":token})


                }else{
                    res.send("Wrong Crediential")
                }
            })
        }
    }catch(err){
res.send("something Went Wrong")

console.log(err)
    }
    
})

module.exports={
    userRoute
}