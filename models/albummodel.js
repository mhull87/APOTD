const {
  Pool
} = require("pg");
require('dotenv').config();

const db_url = process.env.DATABASE_URL;
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0" // Avoids DEPTH_ZERO_SELF_SIGNED_CERT error for self-signed certs

const pool = new Pool({
  connectionString: db_url,
  ssl: {
    rejectUnauthorized: false
  }
});

function displayalbum(callback) {
  var sql = "SELECT * FROM myalbum";
  pool.query(sql, function (err, db_results) {
    if (err) {
      console.log(err)
    } else {
      var results = {
        result: db_results.rows
      }
    }
    callback(null, results)
  })
}

function displaydetails(id, callback) {
  var sql = "SELECT * FROM myalbum WHERE id=$1::int";
  var params = [id];
  pool.query(sql, params, function (err, db_results) {
    if (err) {
      console.log(err)
    } else {
      var results = {
        result: db_results.rows
      }
      console.log(results)
    }
    callback(null, results)
  })
}

function editphoto(id, header, notes, callback) {

  var sql = "UPDATE myalbum SET header=$1::text, notes=$2::text WHERE id=$3::int";

  params = [header, notes, id];
  pool.query(sql, params, function(err, db_results) {
    if (err) {
      console.log(err);
    } else {
      var results = db_results.rows;
    }
  callback(null, results)
  })
}

function deletephoto(id, callback) {
  var sql = "DELETE FROM myalbum WHERE id=$1::int";
  var params = [id];
  pool.query(sql, params, function(err, db_results) {
    if (err) {
      console.log(err);
    } else {
      var results = db_results.rows;
    }
    callback(null, results)
  })
}

function searchalbum(keyword, callback) {
  var key = "%" + keyword + "%";
  console.log(key)
  var sql = "SELECT * FROM myalbum WHERE header LIKE $1::text";
  var params = [key];
  pool.query(sql, params, function(err, db_results) {
    if (err) {
      console.log(err);
    } else {
      var results = {
        result: db_results.rows};
      console.log(results)
    }
    callback(null, results);
  })
}

module.exports = {
  displayalbum: displayalbum,
  displaydetails: displaydetails,
  editphoto: editphoto,
  deletephoto: deletephoto,
  searchalbum: searchalbum
}