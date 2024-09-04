import express from "express";
import {dirname} from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const __dirname = dirname(fileURLToPath(import.meta.url))
import ejs from "ejs";
import { title } from "process";

const app = express();
const port = 3000;

app.use(express.static("public"))

app.use(bodyParser.urlencoded({extended:true}));
//Get the homepage to submit infomation
app.get("/",(req,res)=>{
    res.render("views/partials/index.ejs");
})


app.post("/submit",(req,res)=>{
    //generate and trim date to need
    let currentDate = new Date();
    let day = currentDate.toString();
    let trimDate = day.slice(0,-30)
    
    //dictionary to store data
    const postData = new Object();
    
    postData[req.body["pTitle"]] = [req.body["tBox"],trimDate];
    const logger = Object.keys(postData);
    console.log(logger);



    //Rendering entered information onto new page
    res.render("views/submit.ejs",{
    title : req.body["pTitle"],
    post : req.body["tBox"],
    date: trimDate,
});
});



app.listen(port,()=>{
    console.log(`Port is operating on local ${port}.`)
});