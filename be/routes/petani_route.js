const express = require('express');
const router = express.Router();
const petaniController = require('../controllers/petani/dashboard');
const transactionController = require('../controllers/petani/transaction');

router.get("/dashboard", petaniController.index)
router.get("/transaction", transactionController.index)

module.exports = router;
