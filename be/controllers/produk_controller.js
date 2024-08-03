const traceability = require('../src/traceability');
const db = require('../db/db');

const addProduk = async (req, res) => {
    try {
        const { kopiID, varietas, kuantitas, tanggalProduksi, tanggalKadaluarsa, foto, pemilik } = req.body;

        // Panggil smart contract untuk menambah produk dan dapatkan produkID
        const result = await traceability.addProduk(kopiID, varietas, kuantitas, tanggalProduksi, tanggalKadaluarsa, foto);
        const produkID = result.produkID;

        // Simpan produk ke database
        const sql = `INSERT INTO produk (produkID, kopiID, varietas, kuantitas, tanggalProduksi, tanggalKadaluarsa, foto, pemilik) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [produkID, kopiID, varietas, kuantitas, tanggalProduksi, tanggalKadaluarsa, foto, pemilik]; // Pastikan pemilik adalah walletAddress pengguna

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error saving product to database:', err);
                res.status(500).send({ error: err.toString() });
            } else {
                res.send({ produkID, result }); // Kembalikan produkID yang dihasilkan
            }
        });
    } catch (e) {
        console.error('Error saat menambahkan produk:', e);
        res.status(500).send({ error: e.toString() });
    }
};

module.exports = {
    addProduk
};