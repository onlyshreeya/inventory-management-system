# StockFlow Backend API

RESTful API built for the StockFlow Product Management System.

## Technologies Used
- **Node.js & Express.js**: High-performance backend framework.
- **MongoDB & Mongoose**: NoSQL database for flexible product schemas.
- **JSON Web Tokens (JWT)**: Stateless user authentication.
- **Bcrypt.js**: Secure password hashing.
- **Express Validator**: Input sanitization and error throwing.
- **Helmet & Rate Limit**: Security middlewares against standard web vulnerabilities.

## Getting Started
1. Create a `.env` file with `PORT`, `MONGO_URI`, and `JWT_SECRET`.
2. Run `npm install`
3. Run `npm run dev`

## API Collection
Import `StockFlow.postman_collection.json` (located in the root folder) into Postman to test all available endpoints easily.
