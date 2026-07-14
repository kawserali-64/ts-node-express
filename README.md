# 🏠 House Rental Platform - Backend

Backend API for the **House Rental Platform** built with **Node.js**, **Express.js**, **TypeScript**, and **MongoDB**. It provides secure REST APIs for managing rental houses, authentication, dashboard statistics, and property management.

---

# 🌐 Live API

https://YOUR-BACKEND-LIVE-LINK.vercel.app

---

# 💻 Frontend Repository

https://github.com/kawserali-64/house-rental-client

---

# 📂 Backend Repository

https://github.com/kawserali-64/ts-node-express
---

# ✨ Features

- Secure REST API
- TypeScript Support
- MongoDB Integration
- Better Auth JWT Verification
- Protected Routes
- Add New House
- Delete House
- Get My Houses
- Featured Houses
- Related Houses
- Dashboard Statistics
- Search Houses
- Filter Houses
- Sort Houses
- Pagination
- Error Handling

---

# 🛠️ Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- JOSE (JWT Verification)
- Better Auth
- CORS
- Dotenv

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/kawserali-64/ts-node-express

## Install Dependencies

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

## Build Project

```bash
npm run build
```

## Start Production

```bash
npm start
```

---

# 🔐 Authentication

Protected APIs require a valid JWT token.

Example Header

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

# 📡 API Endpoints

## Public Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | / | Server Status |
| GET | /houses | Get All Houses |
| GET | /houses/:id | Get Single House |
| GET | /houses/:id/related | Get Related Houses |
| GET | /featured-houses | Featured Houses |

---

## Protected Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /houses | Add New House |
| GET | /my-houses/:ownerId | Get User Houses |
| DELETE | /houses/:id | Delete House |
| GET | /dashboard | Dashboard Statistics |

---

# 🔍 Query Parameters

### GET /houses

| Parameter | Description |
|-----------|-------------|
| search | Search by title |
| category | Filter by category |
| division | Filter by division |
| sort | low, high, new, old |
| page | Current page |
| limit | Items per page |

Example

```
/houses?search=Flat&category=Apartment&division=Dhaka&sort=low&page=1&limit=8
```

---

# 📊 Dashboard Response

- Total Houses
- Available Houses
- Rented Houses
- Category Distribution
- Monthly Added Houses

---

# 📱 Deployment

Backend is deployed on **Vercel**.

---

# 👨‍💻 Author

Kawser Ali

GitHub:
https://github.com/kawserali-64

---

# 📜 License

This project is developed for educational purposes.