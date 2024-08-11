const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/coffee-retail/dashboard');
const transactionController = require('../controllers/coffee-retail/transaction');

router.get("/dashboard", dashboardController.index)
router.get("/transaction", transactionController.index)

module.exports = router;
