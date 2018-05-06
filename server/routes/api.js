var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET - test whether API works or not. */
router.get('/hello', (req, res) => {
    var db = require('../database');
    db.query('SELECT * FROM listing LIMIT 10')
        .then(results => res.send({
            express: 'Hello From Expressss',
            result: results[0],
        }))
        .catch(handleError);
});


router.get('/available_graphs/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    var db = require('../database');
    db.query('SELECT * FROM graphs WHERE user_id = ?', [user_id])
        .then(results => res.json({ graphs: results }))
        .catch(handleError);
});


router.get('/graph_data/:graph_id', (req, res) => {
    const graph_id = req.params.graph_id;
    var db = require('../database');
    var nodes, links;
    db.query('SELECT * FROM nodes WHERE graph_id = ?', [graph_id])
        .then(results => {
            nodes = results;
            return db.query('SELECT * FROM links WHERE graph_id = ?', [graph_id]);
        })
        .then(results => { links = results; } )
        .then(() => res.json({ links: links, nodes: nodes }) )
        .catch(err => console.log(err));  //for now we just print out
});


const handleError = (err) => {
    // here you may send a non 200-status response and some description
    // but for now just console.log
    console.log(err);
};


module.exports = router;
