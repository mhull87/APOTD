const { Pool } = require("pg");
require('dotenv').config();

const db_url = process.env.DATABASE_URL;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0" // Avoids DEPTH_ZERO_SELF_SIGNED_CERT error for self-signed certs

const pool = new Pool({connectionString: db_url});

function savenewphoto(title, hdurl, date, explanation, copyright, callback) {
  console.log("Saving: " + title);

  var sql = "INSERT INTO myalbum (title, hdurl, date, explanation, copyright) VALUES ($1::text, $2::text, $3::text, $4::text, $5::text)";

  params = [title, hdurl, date, explanation, copyright];
  pool.query(sql, params, function(err, db_results) {
    if (err) {
      throw err;
    } else {
      var results = db_results.rows;
    };
  callback(null, results)
  })
;
}

module.exports = {
  savenewphoto: savenewphoto
}