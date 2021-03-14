var path = require("path");
var ejs = require("ejs");
var express = require("express");
var app = express();

app.set("port", (process.env.PORT || 5000));
app.use(express.static(path.join(__dirname, 'public')));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => res.render("pages/index"));

app.listen(app.get("port"), function() {
  console.log("Now listening on port: ", app.get("port"));
});

