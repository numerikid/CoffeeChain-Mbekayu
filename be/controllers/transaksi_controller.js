// const db = require('../db/db');

// const addTransaksi = async (req, res) => {
//     try {
//         const { produkID, varietas, kuantitas, pengirim, penerima, tanggalTransaksi, status } = req.body;
//         const sql = `INSERT INTO transaksi (produkID, varietas, kuantitas, pengirim, penerima, tanggalTransaksi, status) VALUES (?, ?, ?, ?, ?, ?, ?)`;
//         const values = [produkID, varietas, kuantitas, pengirim, penerima, tanggalTransaksi, status];
//         db.query(sql, values, (err, result) => {
//             if (err) {
//                 console.error('Error saving transaction to database:', err);
//                 res.status(500).send({ error: err.toString() });
//             } else {
//                 res.send(result);
//             }
//         });
//     } catch (e) {
//         console.error('Error saat menambahkan transaksi:', e);
//         res.status(500).send({ error: e.toString() });
//     }
// };

// module.exports = {
//     addTransaksi
// };



const traceability = require('../src/traceability');
const db = require('../db/db');

const addTransaksi = async (req, res) => {
    try {
        const { kopiID, produkID, varietas, kuantitas, pengirim, penerima, tanggalTransaksi, status } = req.body;
        const sql = `INSERT INTO transaksi (kopiID, produkID, varietas, kuantitas, pengirim, penerima, tanggalTransaksi, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [kopiID, produkID, varietas, kuantitas, pengirim, penerima, tanggalTransaksi, status];;

        db.query(sql, values, async (err, result) => {
            if (err) {
                console.error('Error saving transaction to database:', err);
                res.status(500).send({ error: err.toString() });
            } else {
                // Call smart contract function
                await traceability.addTransaksi(kopiID, varietas, kuantitas, penerima);
                res.send(result);
            }
        });
    } catch (e) {
        console.error('Error saat menambahkan transaksi:', e);
        res.status(500).send({ error: e.toString() });
    }
};

const konfirmasiTransaksi = async (req, res) => {
    try {
        const { kopiID } = req.body;
        const sql = `UPDATE transaksi SET status = 'Terkonfirmasi' WHERE kopiID = ?`;
        
        db.query(sql, [kopiID], async (err, result) => {
            if (err) {
                console.error('Error updating transaction in database:', err);
                res.status(500).send({ error: err.toString() });
            } else {
                // Call smart contract function
                await traceability.konfirmasiTransaksi(kopiID);
                res.send(result);
            }
        });
    } catch (e) {
        console.error('Error saat mengonfirmasi transaksi:', e);
        res.status(500).send({ error: e.toString() });
    }
};

module.exports = {
    addTransaksi,
    konfirmasiTransaksi
};

