const traceability = require("../src/traceability");
const db = require('../db/db');

// Controller untuk menambahkan user
const addUser = async (req, res) => {
    try {
        const { walletAddress, roleName, roleID, nama, telepon, alamat, foto } = req.body;
        console.log("Data diterima di addUser:", req.body);
        
        // Menyimpan data ke blockchain
        const receipt = await traceability.addUser(walletAddress, roleName, roleID, nama, telepon, alamat, foto);
        
        // Menyimpan data ke database MySQL setelah berhasil ditambahkan ke blockchain
        const sql = `INSERT INTO user (walletAddress, roleName, roleID, nama, telepon, alamat, foto) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const values = [walletAddress, roleName, roleID, nama, telepon, alamat, foto];
        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error saving user to database:', err);
                res.status(500).send({ error: err.toString() });
            } else {
                res.send(receipt); // Mengirimkan receipt sebagai response
            }
        });
    } catch (e) {
        console.error('Error saat menambahkan user:', e);
        res.status(500).send({ error: e.toString() });
    }
};

module.exports = {
    addUser
};
