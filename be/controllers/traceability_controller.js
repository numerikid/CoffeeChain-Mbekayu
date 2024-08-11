const db = require('../db/db');
const getTraceData = async (req, res) => {
    try {
        const { produkID } = req.query;
        
        const sql = `
            SELECT
                t.transaksiID,
                t.kopiID,
                t.produkID,
                t.varietas,
                t.kuantitas,
                t.pengirim,
                u1.nama AS namaPengirim,
                u1.alamat AS alamatPengirim,
                t.penerima,
                u2.nama AS namaPenerima,
                u2.alamat AS alamatPenerima,
                t.tanggalTransaksi,
                t.status,
                p.tanggalProduksi,
                p.tanggalKadaluarsa,
                p.foto
            FROM
                transaksi t
            LEFT JOIN
                produk p ON t.produkID = p.produkID
            LEFT JOIN
                user u1 ON t.pengirim = u1.walletAddress
            LEFT JOIN
                user u2 ON t.penerima = u2.walletAddress
            WHERE
                t.produkID = ?
        `;
        
        db.query(sql, [produkID], (err, results) => {
            if (err) {
                console.error('Error fetching trace data from database:', err);
                res.status(500).send({ error: err.toString() });
            } else {
                res.send(results);
            }
        });
    } catch (e) {
        console.error('Error fetching trace data:', e);
        res.status(500).send({ error: e.toString() });
    }
};

module.exports = {
    getTraceData
};
