const express = require('express');
const router = express.Router();
const produk_controller = require('../controllers/produk_controller');

router.post('/addProduk', produk_controller.addProduk);

module.exports = router;
