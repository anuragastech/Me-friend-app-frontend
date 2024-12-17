const  express=require("express")
const app = express();
app.listen(3002,()=>{
   console.log( "hello")
})

app.use("/hello",(req,res)=>{
    console.log("sucess");
    
})