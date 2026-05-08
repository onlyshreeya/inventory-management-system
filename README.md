# StockFlow - Product Management System
> Full-Stack MERN Application | Backend Internship Assignment

StockFlow is a scalable, role-based product inventory management system built with React, Node.js, Express, and MongoDB.

## Features
- **Role-Based Access Control (RBAC):** Distinct `admin` and `user` privileges.
- **Secure Authentication:** JWT-based stateless authentication with `bcryptjs` password hashing.
- **RESTful APIs:** Complete CRUD lifecycle for products with validation and error handling.
- **Modern Dashboard UI:** Built with React 19, Vite, and Tailwind CSS.
- **Security Best Practices:** Helmet headers, Express Rate Limiting, and input sanitization.

## Scalability & Architecture Note
To scale this application for millions of users:
1. **Microservices:** Decouple Auth, Products, and Order modules into independently scalable microservices.
2. **Caching:** Implement **Redis** to cache the `GET /products` endpoint to significantly reduce MongoDB read load.
3. **Load Balancing:** Use NGINX or an AWS Application Load Balancer to distribute traffic across multiple Node.js instances.
4. **Database Sharding:** Scale MongoDB horizontally by sharding the product collections based on `category` or `brand`.
5. **Docker:** Containerize both frontend and backend for seamless CI/CD deployment to Kubernetes.

## Quick Start
1. Setup the Backend: `cd backend && npm install && npm run dev`
2. Setup the Frontend: `cd frontend && npm install && npm run dev`

*See individual folder READMEs for more details.*
