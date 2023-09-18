require("dotenv").config()
const express=require("express")
const app=express()
const port= 8000;
const adminRoute=require("./routes/adminroutes")


app.use(express.json())
app.use("/",adminRoute)

app.listen(port,(err)=>{
    if (err) {
        console.log(err);
    }
    console.log("server running on port: "+port);
})