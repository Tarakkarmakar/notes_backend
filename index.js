const express=require("express")
require("dotenv").config()
const {connection}=require("./config/db")
const {authenticate}=require("./middleware/authenticate")
const {userRoute}=require("./router/userAuth")
const {notesRouter}=require("./router/notesRoute")
const app=express()

app.use(express.json())


app.get("/welcome to Home page of my API")

app.use("/users",userRoute)

app.use(authenticate)

app.use("/notes",notesRouter)

app.listen(process.env.port ,async()=>{

    try{
        await connection

        console.log("connected to DB")
    }catch{
        console.log("Trouble to connect to Db")
    }

    console.log("server is runnig")
})