const express = require('express');
const router = express.Router();
const pengepulController = require('../controllers/pengepul/dashboard');
const transactionController = require('../controllers/pengepul/transaction');

router.get("/dashboard", pengepulController.index)
router.get("/transaction", transactionController.index)

module.exports = router;
