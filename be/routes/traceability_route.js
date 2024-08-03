const express = require('express');
const router = express.Router();
const traceability_controller = require('../controllers/trace_product');

router.get('/', traceability_controller.index);

module.exports = router;
