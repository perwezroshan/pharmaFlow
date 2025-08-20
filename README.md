# PharmaFlow – Medicine Retail Shop Management System

PharmaFlow is a full-stack web application for medicine retailers. It provides secure authentication, inventory tracking, order generation, sales processing, customer management, and analytics.

---

## Table of Contents
🔐 Authentication: JWT-based login, email verification (OTP), protected routes

📊 Dashboard: Sales/profit summaries, interactive charts, recent activity, time filters (1M/6M/1Y)

💊 Product Management: CRUD for medicines, search/filtering, stock monitoring, low-stock alerts, margin calculation

📦 Order Management: Auto-generate low-stock orders, wholesaler summaries, export order lists

🧾 Sales & Receipts: Customer capture, real-time product search, PDF receipt generation, automatic inventory updates

👥 Customer Management: Searchable database, order history, profiles, purchase analytics

---

## Tech Stack

### Backend

Node.js, Express.js
MongoDB + Mongoose
JWT, Nodemailer, PDFKit, bcryptjs

### Frontend

-React 19 + Vite
-Redux Toolkit, React Router
-Recharts, Axios
-Tailwind CSS
---

## Architecture

PharmaFlow/
├── backend/
│   ├── controllers/     # API controllers
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middleware/      # Authentication middleware
│   ├── services/        # Business logic services
│   ├── utils/           # Utility functions
│   └── index.js         # Server entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── store/       # Redux store and slices
│   │   ├── services/    # API services
│   │   └── App.jsx      # Main app component
│   └── public/          # Static assets
└── README.md

