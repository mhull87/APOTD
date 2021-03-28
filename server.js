var path = require("path");
var ejs = require("ejs");
var express = require("express");
const savecontroller = require("./controllers/savecontroller.js");
var app = express();
const albumcontroller = require("./controllers/albumcontroller");

app.set("port", (process.env.PORT || 5000));
app.use(express.static(path.join(__dirname, 'public')));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({
  extended: true
}));

app.get("/", (req, res) => res.render("pages/index"));
app.get("/search", (req, res) => res.render("pages/search"));
app.get('/myalbum', albumcontroller.getalbum);
app.post('/details', albumcontroller.albumdetails);
app.post('/edit', albumcontroller.edit);
app.post('/delete', albumcontroller.deletephoto);
app.post('/editview', function (req, res) {
var id = req.body.id;
var title = req.body.title;
var hdurl = req.body.hdurl;
var header = req.body.header;
var notes = req.body.notes;

var params = { id:id, title:title, hdurl:hdurl, header:header, notes:notes };

res.render('pages/edit', params);

});
app.post('/deleteview', function (req, res) {
  var id = req.body.id;
  var title = req.body.title;
  var hdurl = req.body.hdurl;
  var header = req.body.header;
  var notes = req.body.notes;
  var date = req.body.date;
  var copyright = req.body.copyright;
  var explanation = req.body.explanation;
  
  var params = { id:id, title:title, hdurl:hdurl, header:header, notes:notes, date:date, copyright:copyright, explanation:explanation };
  
  res.render('pages/delete', params);
});

 app.post("/save", savecontroller.save);

 app.post('/searchalbum', albumcontroller.search);

app.listen(app.get("port"), function() {
  console.log("Now listening on port: ", app.get("port"));
});

