const savemodel = require("../models/savemodel.js");
const albumcontroller = require("../controllers/albumcontroller.js");

function save(req, res) {
  var title = req.body.title;
  var hdurl = req.body.hdurl;
  var date = req.body.date;
  var explanation = req.body.explanation;
  var copyright = req.body.copyright;

  console.log("Creating save for: " + title);
  savemodel.savenewphoto(title, hdurl, date, explanation, copyright, function(err, results) {
  albumcontroller.getalbum(req, res);
  });
}

module.exports = {
  save: save,
}