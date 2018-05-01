/**
 * Created by iamhosseindhv on 01/05/2018.
 */
var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit : 20,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE,
});

const getConnection = callback => {
    pool.getConnection((err, connection) => {
        if (err) { return callback(err) }
        callback(null, connection);
    });
};

module.exports = getConnection;