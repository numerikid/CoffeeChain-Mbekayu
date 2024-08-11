const express = require('express');
const router = express.Router();
const transaksi_controller = require('../controllers/transaksi_controller');

router.post('/addTransaksi', transaksi_controller.addTransaksi);
router.post('/konfirmasiTransaksi', transaksi_controller.konfirmasiTransaksi);

module.exports = router;
