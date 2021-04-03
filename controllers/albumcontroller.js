const albummodel = require('../models/albummodel.js');

function getalbum(req, res) {
  albummodel.displayalbum(function (err, results) {
    res.render("pages/myalbum.ejs", {
      results
    })
  })
}

function albumdetails(req, res) {
  var id = req.body.id;
  albummodel.displaydetails(id, function (err, results) {
    console.log(results)
    res.render("pages/details.ejs", {
      results
    })
  })
}

function edit(req, res) {
  var id = req.body.id;
  var header = req.body.header;
  var notes = req.body.notes;

  albummodel.editphoto(id, header, notes, function(err, results) {
    getalbum(req, res);
  })
}

function deletephoto(req, res) {
  var id = req.body.id;
  albummodel.deletephoto(id, function(err, results) {
    getalbum(req, res);
  })
}

function search(req, res) {
  var keyword = req.body.keyword;
  albummodel.searchalbum(keyword, function(err, results) {
    console.log(results)
    res.render("pages/details.ejs", {
      results, keyword
    })
  })
}

module.exports = {
  albumdetails: albumdetails,
  getalbum: getalbum,
  edit: edit,
  deletephoto: deletephoto,
  search: search
}