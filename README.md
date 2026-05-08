# Inventory Management Dashboard

> Full-Stack MERN Application | Backend Developer Internship Project

StockFlow is a modern full-stack inventory and product management dashboard built using the MERN stack.
The application focuses on scalable backend architecture, secure authentication, role-based access control, and clean frontend design.

It allows admins to manage products efficiently while users can browse and search inventory through a responsive dashboard interface.

---

# Features

## Authentication & Security

* JWT-based authentication
* Password hashing using `bcryptjs`
* Protected API routes
* Role-Based Access Control (`admin` & `user`)
* Helmet security middleware
* Express rate limiting

## Product Management

* Create products
* View products
* Update products
* Delete products
* Product search & filtering
* Inventory stock management

## Frontend

* Responsive dashboard UI
* React + Vite frontend architecture
* Tailwind CSS styling
* Toast notifications
* Reusable component structure
* Protected frontend routes

## Backend

* RESTful API architecture
* MongoDB Atlas integration
* Express middleware architecture
* Modular folder structure
* Validation & centralized error handling
* Postman API testing collection included

---

# Tech Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* React Router DOM

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

## Authentication

* JWT
* bcryptjs

---

# Project Architecture & Scalability

This project follows a modular and scalable backend architecture designed for real-world production systems.

### Scalability Improvements for Large-Scale Systems

* Microservice-based architecture separation
* Redis caching for frequently accessed APIs
* Load balancing with NGINX
* MongoDB sharding strategies
* Docker containerization
* CI/CD deployment pipelines

---

# Screenshots

## Login Page

<img width="959" height="411" alt="Screenshot 2026-05-09 014948" src="https://github.com/user-attachments/assets/51ab0f52-220d-4da1-badf-4955f039604d" />


---

## Dashboard Overview

<img width="959" height="415" alt="Screenshot 2026-05-09 015124" src="https://github.com/user-attachments/assets/667fc4a9-1f01-4570-9010-cb3a2c7bd747" />


---


## Add Product Modal

<img width="959" height="415" alt="Screenshot 2026-05-09 020022" src="https://github.com/user-attachments/assets/367414b8-8f3a-4d23-93a3-01ad1220932a" />


---

# API Testing

API endpoints were tested using Postman.

Included file:
`StockFlow.postman_collection.json`

---

# Quick Start

## Clone Repository

```bash
git clone https://github.com/onlyshreeya/inventory-management-system.git
```

---

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# Environment Variables

Create a `.env` file inside the backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

# Folder Structure

```txt
backend/
frontend/
screenshots/
README.md
```

---

# Future Improvements

* Product analytics dashboard
* Cloudinary image uploads
* Redis caching
* Docker deployment
* Advanced filtering
* Pagination
* Admin analytics panel

---

# Author

Shreeya Srivastava
