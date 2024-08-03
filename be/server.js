require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const path = require("path");

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname,"views"))
app.use("/images",express.static("views/assets/images"))
app.use("/styles",express.static("views/assets/styles"))
app.use("/sc",express.static("sc"))

// Konfigurasi MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kopi_skripsi'
});

// Koneksi ke database MySQL
db.connect(err => {
    if (err) {
        console.error('Error connecting to the Local Host:', err);
    } else {
        console.log('Connected to Local Host.');
    }
});

app.use(cors());
app.use(bodyParser.json());

// Menggunakan route utama
const mainRoute = require('./routes/main_route');
mainRoute(app);

// Menjalankan server
const port = process.env.PORT || 8080;
app.get("/", (req, res) => {
    return res.render("index.ejs")
})
app.listen(port, () => {
    console.log(`Server berjalan pada port ${port}`);
});
