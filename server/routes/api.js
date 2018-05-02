var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET - test whether API works or not. */
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

router.get('/available_graphs/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    var getConnection = require('../database');
    getConnection((err, connection) => {
        if (err) throw err; // for now we just throw
        connection.query('SELECT * FROM graphs WHERE user_id = ?', [user_id], function (error, results) {
            if (error) throw error;
            connection.release();
            res.json({ graphs: results });
        });
    });
});

module.exports = router;
