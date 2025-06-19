const Customer = require('../models/customer');

exports.getCustomersByRetailer = async (req, res) => {
  try {
    const { retailerId } = req.params;
    const customers = await Customer.find({ retailerId });
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch customers', error: err.message });
  }
};
