# PharmaFlow - Medicine Retail Shop Management System

A comprehensive web application for managing medicine retail shops with personalized features for each retailer.

## Features

### 🔐 Authentication
- JWT-based authentication
- Email verification with OTP
- Protected routes and API endpoints

### 📊 Dashboard
- Personalized greeting with shop name
- Sales and profit summary cards
- Interactive charts showing sales/profit trends over time
- Time period filters (1 month, 6 months, 1 year)
- Recent sales overview

### 💊 Product Management
- Complete CRUD operations for medicines
- Product search and filtering
- Stock level monitoring
- Low stock alerts
- Margin calculation for pricing

### 📋 Order Management
- Auto-generate list of medicines below alert quantity
- Add new medicines to order list
- Generate order summaries by wholesaler
- Export order lists

### 🧾 Sales Receipt Generation
- Customer information capture
- Product selection with real-time search
- Quantity and price management
- PDF receipt generation and download
- Automatic inventory updates

### 👥 Customer Management
- Customer database with search functionality
- Order history tracking
- Customer profile management
- Purchase analytics per customer

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Nodemailer** for email services
- **PDFKit** for receipt generation
- **bcryptjs** for password hashing

### Frontend
- **React 19** with Vite
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Recharts** for data visualization
- **Axios** for API calls
- **Tailwind CSS** for styling

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB database
- Email service credentials (Gmail recommended)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd PharmaFlow/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

   Then update the values in `.env`:
   ```env
   PORT=3000
   MONGODB_URL="your_mongodb_connection_string"
   JWT_SECRET="your_jwt_secret"
   FRONTEND_URL="http://localhost:5173"
   EMAIL_USER="your_email@gmail.com"
   EMAIL_PASS="your_app_password"
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd PharmaFlow/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file (optional):
   ```bash
   cp .env.example .env
   ```

   Update the values in `.env` if needed (default values should work for development).

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Environment Configuration

### Frontend Environment Variables

The frontend uses Vite's environment variable system. All variables must be prefixed with `VITE_`.

**Available Variables:**
- `VITE_API_BASE_URL` - Backend API URL (default: http://localhost:3000/api)
- `VITE_APP_NAME` - Application name (default: PharmaFlow)
- `VITE_APP_VERSION` - Application version (default: 1.0.0)
- `VITE_ENVIRONMENT` - Environment (development/production)

**Environment Files:**
- `.env` - Default environment variables
- `.env.production` - Production-specific variables
- `.env.example` - Template with all available variables

### Backend Environment Variables

**Required Variables:**
- `MONGODB_URL` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `EMAIL_USER` - Email address for sending notifications
- `EMAIL_PASS` - Email password/app password

**Optional Variables:**
- `PORT` - Server port (default: 3000)
- `FRONTEND_URL` - Frontend URL for CORS (default: http://localhost:5173)
- `NODE_ENV` - Environment (development/production)
- `CORS_ORIGIN` - Specific CORS origin

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new retailer
- `POST /api/auth/verify-otp` - Verify email with OTP
- `POST /api/auth/login` - Login retailer

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/products/low-stock` - Get low stock products

### Sales
- `POST /api/sales` - Create new sale
- `GET /api/sales` - Get all sales with pagination
- `GET /api/sales/:id/receipt` - Generate PDF receipt

### Customers
- `GET /api/customers` - Get all customers (with search)
- `POST /api/customers` - Create/update customer
- `GET /api/customers/:id/orders` - Get customer order history

### Dashboard
- `GET /api/dashboard/analytics` - Get dashboard analytics
- `GET /api/dashboard/recent-sales` - Get recent sales
- `GET /api/dashboard/sales-summary` - Get sales summary

## Usage

1. **Register**: Create a new account with shop name, email, and password
2. **Verify Email**: Enter the OTP sent to your email
3. **Login**: Access your personalized dashboard
4. **Add Products**: Start by adding your medicine inventory
5. **Manage Orders**: Monitor low stock and generate order lists
6. **Process Sales**: Create sales receipts and manage customers
7. **Analytics**: Track your business performance through the dashboard

## Project Structure

```
PharmaFlow/
├── backend/
│   ├── controllers/     # API controllers
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── middleware/     # Authentication middleware
│   ├── services/       # Business logic services
│   ├── utils/          # Utility functions
│   └── index.js        # Server entry point
├── frontend/
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── pages/      # Page components
│   │   ├── store/      # Redux store and slices
│   │   ├── services/   # API services
│   │   └── App.jsx     # Main app component
│   └── public/         # Static assets
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact the development team.
