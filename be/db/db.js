// db/db.js
const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kopi_skripsi'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the Local Host:', err);
    } else {
        console.log('Connected to Local Host.');
    }
});

module.exports = db;
