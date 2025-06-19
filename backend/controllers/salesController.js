const Sale = require('../models/sale');
const Product = require('../models/Product');
const Customer = require('../models/customer');
const { generateReceiptPDF } = require('../services/pdfService');

exports.createSale = async (req, res) => {
  try {
    const { customerInfo, products, retailerId } = req.body;

    // Find or create customer
    let customer = await Customer.findOne({
      name: customerInfo.name,
      phone: customerInfo.phone,
      retailerId,
    });

    if (!customer) {
      customer = new Customer({ ...customerInfo, retailerId });
      await customer.save();
    }

    // Calculate total
    let totalAmount = 0;
    for (let p of products) {
      totalAmount += p.quantity * p.price;
    }

    // Create Sale
    const sale = new Sale({ customer: customer._id, products, totalAmount, retailerId });
    await sale.save();

    // Subtract product quantity
    for (let p of products) {
      await Product.findByIdAndUpdate(p.product, { $inc: { quantity: -p.quantity } });
    }

    res.status(201).json({ message: 'Sale recorded', sale });
  } catch (err) {
    res.status(500).json({ message: 'Sale creation failed', error: err.message });
  }
};


exports.getSaleReceipt = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id)
      .populate('products.product')
      .populate('customer');

    if (!sale) return res.status(404).json({ message: 'Sale not found' });

    generateReceiptPDF(sale, sale.customer, res);
  } catch (err) {
    res.status(500).json({ message: 'Failed to generate receipt', error: err.message });
  }
};
