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
    // Notice: all parameters are always present. you have to check if strings are === '' or arrays are == []
    // TODO: Before sending the results, you should check if the data is a valid graph data
    // e.g. if someone asks for data of a graph with id=1000, where there isn't a graph with the given id, 
    // then we return a response where there's no data for node and link.
    // our auery has worked, everything is fine, but this is not a valid data to be displayed as a graph.
    const graph_id = req.params.graph_id;
    var db = require('../database');
    var nodes, links;
    db.query('SELECT * FROM nodes WHERE graph_id = ?', [graph_id])
        .then(results => {
            nodes = results;
            return db.query('SELECT * FROM links WHERE graph_id = ?', [graph_id]);
        })
        .then(results => { links = results; })
        .then(() => res.json({ links: links, nodes: nodes }))
        .catch(handleError);
});


const handleError = (err) => {
    // here you may send a non 200-status response and some description
    // but for now just console.log
    console.log(err);
};


module.exports = router;
