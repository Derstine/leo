const mysql = require("mysql2");

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'accounts_app'
}).promise();

module.exports = pool;