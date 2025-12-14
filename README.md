# Sweet Shop Management System

A MERN-stack web application for managing a sweet shop. Users can view and order sweets, and admins can add, update, or delete sweets with images.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [License](#license)

---

## Features

**User:**
- View all sweets with price, stock, category, description, and image.
- View individual sweet details on a separate page.
- Place orders with quantity selection.
- Stock updates after order placement.

**Admin:**
- Add new sweets with image upload.
- Update or delete existing sweets.
- View all sweets with details in a dashboard.

---

## Tech Stack

- **Frontend:** React, MUI (Material-UI), Axios, React Router
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, Multer
- **Others:** dotenv, cors, cookie-parser, JWT

---

## Project Structure

sweet-shop-management/
├── backend/
│ ├── controllers/
│ │ └── adminController.js
│ ├── models/
│ │ └── Sweet.js
│ ├── routes/
│ │ ├── adminRoutes.js
│ │ └── authRoutes.js
│ ├── images/ # Uploaded sweet images
│ ├── index.js
│ └── package.json
├── frontend/
│ ├── src/
│ │ ├── api/
│ │ │ └── axios.js
│ │ ├── components/
│ │ │ ├── AdminDashboard.jsx
│ │ │ ├── SweetForm.jsx
│ │ │ ├── SweetDetails.jsx
│ │ │ └── Home.jsx
│ │ ├── pages/
│ │ │ ├── UserLogin.jsx
│ │ │ └── UserSignup.jsx
│ │ └── App.jsx
│ └── package.json
└── README.md

yaml
Copy code

---

## Setup and Installation

### Backend

1. Navigate to the backend folder:

```bash
cd backend
Install dependencies:

bash
Copy code
npm install
Create a .env file in the backend root with the following:

ini
Copy code
PORT=5000
DATABASE_URL=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
Start the backend server:

bash
Copy code
nodemon index.js
Server will run on http://localhost:5000

Sweet images can be accessed via http://localhost:5000/images/<image_name>

Frontend
Navigate to the frontend folder:

bash
Copy code
cd frontend
Install dependencies:

bash
Copy code
npm install
Start the frontend server:

bash
Copy code
npm run dev
React app will run on http://localhost:5173

API Endpoints
Auth
POST /api/user-signup → Signup a new user

POST /api/user-login → User login

POST /api/admin-login → Admin login

Admin Sweet Management
POST /api/admin/sweet → Add new sweet (image upload supported)

PUT /api/admin/sweet/:id → Update sweet

DELETE /api/admin/sweet/:id → Delete sweet

GET /api/admin/sweets → Get all sweets for admin dashboard

User Sweet
GET /user/sweet/:id → Get single sweet details

POST /user/order → Place an order

Screenshots
Admin Dashboard:

Add, edit, delete sweets with images.

User Dashboard:

View sweets, select quantity, place orders.
