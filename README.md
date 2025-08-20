# PharmaFlow – Medicine Retail Shop Management System

PharmaFlow is a full-stack web application for medicine retailers. It provides secure authentication, inventory tracking, order generation, sales processing, customer management, and analytics.

---

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Monorepo Structure](#monorepo-structure)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
  - [Backend Environment](#backend-environment)
  - [Frontend Environment](#frontend-environment)
- [Available Scripts](#available-scripts)
- [Core Workflows](#core-workflows)
- [API Overview](#api-overview)
- [Data Models (Reference)](#data-models-reference)
- [Security & Secrets](#security--secrets)
- [Quality](#quality)
- [Troubleshooting](#troubleshooting)
- [License](#license)
- [Support](#support)

---

## Features

- **Authentication**: JWT-based login, email verification (OTP), protected routes.
- **Dashboard**: Sales/profit summaries, interactive charts, recent activity, time filters (1M/6M/1Y).
- **Product Management**: CRUD for medicines, search/filtering, stock monitoring, low-stock alerts, margin calculation.
- **Order Management**: Auto-generate low-stock orders, wholesaler summaries, export order lists.
- **Sales & Receipts**: Customer capture, real-time product search, PDF receipt generation, automatic inventory updates.
- **Customer Management**: Searchable database, order history, profiles, purchase analytics.

---

## Architecture

