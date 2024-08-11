const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/produser/dashboard');
const transactionController = require('../controllers/produser/transaction');

router.get("/dashboard", dashboardController.index)
router.get("/transaction", transactionController.index)

module.exports = router;
