const savemodel = require("../models/savemodel.js");

function save(req, res) {
  var title = req.body.title;
  var hdurl = req.body.hdurl;
  var date = req.body.date;
  var explanation = req.body.explanation;
  var copyright = req.body.copyright;
 
  console.log("Creating save for: " + title);
  savemodel.savenewphoto(title, hdurl, date, explanation, copyright, (results) => res.render("pages/myalbum.ejs"));
}

module.exports = {
  save: save
}