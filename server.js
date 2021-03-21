var path = require("path");
var ejs = require("ejs");

var express = require("express");
const savecontroller = require("./controllers/savecontroller.js");
var app = express();

app.set("port", (process.env.PORT || 5000));
app.use(express.static(path.join(__dirname, 'public')));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({
  extended: true
}));

app.get("/", (req, res) => res.render("pages/index"));
app.get("/search", (req, res) => res.render("pages/search"));
app.get("/myalbum"), (req, res) => res.render("pages/myalbum");

 app.post("/save", savecontroller.save);
// {

// var params = {
//    title: title,
//    hdurl: hdurl,
//    date: date,
//    explanation: explanation,
//    copyright: copyright
//  }

//  res.render("pages/save", params);
// }




app.listen(app.get("port"), function() {
  console.log("Now listening on port: ", app.get("port"));
});

