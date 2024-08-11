require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const path = require("path");
const fs = require("fs");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/images", express.static("views/assets/images"));
app.use("/styles", express.static("views/assets/styles"));
app.use("/sc", express.static("sc"));

// Konfigurasi MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "kopi_skripsi",
});

// Koneksi ke database MySQL
// db.connect((err) => {
//   if (err) {
//     console.error("Error connecting to the database:", err);
//   } else {
//     console.log("Connected to MySQL database.");
//   }
// });

app.use(cors());
app.use(bodyParser.json());

// Menggunakan route utama
const mainRoute = require("./routes/main_route");
mainRoute(app);

// Menjalankan server
const port = process.env.PORT || 8080;

// Routes for Reading JSON Files -> bagian Berikut
app.get("/abi", (req, res) => {
  const filePath = path.join(__dirname, "/sc/abi.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ error: "Failed to read ABI file" });
      return;
    }
    res.json(JSON.parse(data));
  });
});

app.get("/address", (req, res) => {
  const filePath = path.join(__dirname, "/sc/address.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ error: "Failed to read address file" });
      return;
    }
    res.json(JSON.parse(data));
  });
});

app.get("/bytecode", (req, res) => {
  const filePath = path.join(__dirname, "/sc/bytecode.txt");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ error: "Failed to read bytecode file" });
      return;
    }
    res.send(data);
  });
});

app.get("/", (req, res) => {
  return res.render("index.ejs");
});
app.listen(port, () => {
  console.log(`Server berjalan pada port ${port}`);
});
