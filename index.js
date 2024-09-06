import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const __dirname = dirname(fileURLToPath(import.meta.url))
import ejs from "ejs";
import { title } from "process";
import * as fs from "fs";


const app = express();
const port = 3000;
app.set('views', './views');
app.set('view engine', 'ejs')
app.use(express.static("public"))

app.use(bodyParser.urlencoded({ extended: true }));
//Get the homepage to submit infomation
app.get("/", (req, res) => {
    res.render("index");
});



app.post("/submit", (req, res) => {
    //generate and trim date to need
    let currentDate = new Date();
    let day = currentDate.toString();
    let trimDate = day.slice(0, -30)

    //dictionary to store data
    const postData = new Object();
    postData["title"] = req.body["pTitle"]
    postData["post"] = [req.body["tBox"], trimDate];

    //read json file 
    let newSubmission = fs.readFileSync("submission.json", "utf-8");
    var subArray = JSON.parse(newSubmission);
    //turn json data into an array and append new data
    var arr = Array.from(subArray)
    arr.push(postData)
    //re-format to a string and write to JSON
    const data = JSON.stringify(arr);

    fs.writeFile("submission.json", data, "utf-8", (error) => {
        if (error) {
            console.error();
            throw error;
        }
        console.log("data written correctly");
    });

    let submissions = fs.readFileSync("submission.json", "utf-8");
    var array = JSON.parse(submissions);
    var historicData = Array.from(array);


    //Rendering entered information onto new page
    res.render("submit.ejs", {
        hData: historicData,
    });
});

app.listen(port, () => {
    console.log(`Port is operating on local ${port}.`)
});