const express=require("express");
const app=express();
const cors =require("cors");


app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Express is running");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, async(error) => {
    if(!error){
        console.log(`Server is running on port ${PORT}`);
    }
    else{
        console.log("Error "+error);
    }
  
});