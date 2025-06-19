const dotenv=require('dotenv');
const authRoutes=require('./routes/auth.js');
const productRoutes=require('./routes/productRoutes.js')
const salesRoutes=require('./routes/salesRoutes.js')
const customerRoutes=require('./routes/customerRoutes.js')
const express = require('express');
const app = express();
const cors = require('cors');

dotenv.config();

const PORT=process.env.PORT||5000;
app.use(express.json()); // To parse JSON bodies

// Middleware
app.use(cors());

// connect to DB
require('./config/database.js').connect();

//mount
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('./api/sales',salesRoutes);
app.use('./api/customerRoutes',customerRoutes)

// Root Route
app.get('/', (req, res) => {
  res.send('Retail Medicine Shop API is running...');
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});