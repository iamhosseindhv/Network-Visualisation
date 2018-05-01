var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET home page. */
router.get('/hello', (req, res) => {

  var getConnection = require('../database');
  getConnection((err, connection) => {
    if (err) throw err; // for now we just throw

    connection.query('SELECT * FROM listing', function (error, result) {
      if (error) throw error;
      connection.release();
      res.send({
        express: 'Hello From Expressss',
        result: result[0],
      });
    });
  });

});

module.exports = router;
