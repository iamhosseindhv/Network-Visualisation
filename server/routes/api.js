var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var Database = require('../database');


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
    var db = new Database();
    db.query('SELECT * FROM graphs WHERE user_id = ?', [user_id])
        .then(results => res.json({ graphs: results }))
        .catch(err => console.log(err)); //for now we just throw
});


// router.get('/graph_data/:graph_id', (req, res) => {
//     const graph_id = req.params.graph_id;
//     var db = new Database();
//     var nodes, links;
//     const selectNodes = 'SELECT * FROM nodes WHERE graph_id = ?', [graph_id];
//     const selectLinks = 'SELECT * FROM links WHERE graph_id = ?', [graph_id];
//     db.query('SELECT * FROM nodes WHERE graph_id = ?', [graph_id])
//         .then(results => {
//             nodes = results;
//             return db.query('SELECT * FROM links WHERE graph_id = ?', [graph_id]);
//         })
//         .then(results => { links = results; } )
//         .then(() => res.json({ links: links, nodes: nodes }) )
//         .catch(err => console.log(err)); //for now we just throw
// });


module.exports = router;
