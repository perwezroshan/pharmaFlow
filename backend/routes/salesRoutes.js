const express = require('express');
const router = express.Router();
const {createSale,getSaleReceipt} = require('../controllers/salesController');

router.post('/', createSale);
router.get('/:id/receipt', getSaleReceipt);

module.exports = router;
