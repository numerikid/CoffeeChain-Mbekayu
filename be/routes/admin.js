const express = require('express');
const router = express.Router();
const dashboard_controller = require("../controllers/dashboard")
const transaction_controller = require("../controllers/transaction")
const users_transaction = require("../controllers/users")

router.get('/dashboard', dashboard_controller.index);
router.get('/transaction', transaction_controller.index);
router.get('/users', users_transaction.index);

module.exports = router;
