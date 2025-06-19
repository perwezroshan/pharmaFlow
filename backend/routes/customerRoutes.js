const express = require('express');
const router = express.Router();
const {getCustomersByRetailer} = require('../controllers/customerController');

// GET /api/customers/:retailerId → get all customers of a retailer
router.get('/:retailerId', getCustomersByRetailer);

module.exports = router;