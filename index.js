// This is the class 7 && 8 && 9 of Backend 
// Title // Hands-on Practice from Past Lessons | Part 7 - Backend Development....
// Title // Putting Theory into Practice | Part 8 - Backend Development....
// Title // Edit feature code | Part 9 - Backend Development
// .......X........X................X............X.................X........x
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const { fileLoader } = require("ejs");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res) {
      fs.readdir(`./files`, function(err, files){
        res.render("index", {files: files});
    })
} );

app.post("/create", function(req, res) {
    // to create file
    fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`, req.body.details, function(err) {
        res.redirect("/")
    } )
} );

// the function which is given below  is the part of class 8
app.get("/file/:filename", function(req, res) {
    fs.readFile(`./files/${req.params.filename}`, "utf-8", function(err, filedata) {
        res.render("show", {filename: req.params.filename, filedata: filedata});
    });
} );  

// the function which is given below  is the part of class 9
app.get("/edit/:filename", function(req, res) {
    res.render("edit", {filename: req.params.filename})
} );  

app.post("/edit", function(req, res) {
    fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}`, function(err) {
        res.redirect("/");
    });
});

app.listen(3000);