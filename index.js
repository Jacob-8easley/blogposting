import express from "express";
//import ejs from "ejs";

const app = express();
const port = 3000;

app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.render("partials/index.ejs");
})

app.get("/posted",(req,res)=>{
    res.render("partials/submit.ejs")
})



app.listen(port,()=>{
    console.log(`Port is operating on local ${port}.`)
});