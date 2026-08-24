# MERN Banking Portal

A full-stack web application simulating a NetBanking portal. Built with MongoDB, Express.js, React.js, and Node.js (MERN stack).

---

## Project Overview

This project was developed as a portfolio project to demonstrate practical full-stack development skills:
- Creating REST APIs with Express and Node.js
- Securing endpoints using JSON Web Tokens (JWT) and hashing passwords with bcrypt
- Connecting to MongoDB via Mongoose and persisting real user transactions
- Building a responsive client-side interface using React and Material-UI (MUI)
- Handling client-side routing, protected routes, and centralized Axios HTTP interceptors

---

## Features

- **User Authentication**: Register a new account and login with Customer ID and password. Passwords are encrypted before storing in the database.
- **JWT Protection**: Private routes require a valid JWT token passed in the Authorization header (`Bearer <token>`).
- **Dashboard & Accounts**: View savings and current account balances, portfolio summary, and recent transaction history.
- **MongoDB-Backed Fund Transfer**: Send money via IMPS/NEFT. Transfers are validated, saved directly to MongoDB, and instantly appear in the transaction table.
- **Card Management**: View credit and debit card details, adjust daily spend limits, toggle online/contactless usage, and set card PIN.
- **Bill Payments**: Pay electricity, broadband, mobile, or FASTag bills and receive instant digital confirmation receipts.
- **Session Management**: Secure logout clears the stored JWT token and user session data.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite, React Router 6, Material-UI (MUI v5), Axios |
| **Backend** | Node.js, Express 5.x |
| **Database** | MongoDB (Atlas / Local) with Mongoose ODM |
| **Authentication** | JSON Web Tokens (`jsonwebtoken`), `bcrypt` |
| **Configuration** | `dotenv`, `cors` |

---

## Architecture

```
┌────────────────────────┐      HTTP / JSON       ┌────────────────────────┐
│     React Frontend     │ ◄────────────────────► │     Express Backend    │
│      (Port 5173)       │  Authorization: Bearer │       (Port 3000)      │
│                        │                        │                        │
│ - React Router DOM     │                        │ - authMiddleware       │
│ - Material-UI Theme    │                        │ - Controllers & Routes │
│ - Axios Interceptors   │                        │ - bcrypt & JWT         │
└────────────────────────┘                        └───────────┬────────────┘
                                                              │
                                                     Mongoose │ Queries
                                                              ▼
                                                  ┌────────────────────────┐
                                                  │     MongoDB Database   │
                                                  │                        │
                                                  │ - users collection     │
                                                  │ - transactions coll.   │
                                                  └────────────────────────┘
```

---

## Project Structure

```
Hdfc_Bank_Batch6/
├── Backend/
│   ├── server.js                      # Server startup & DB connection
│   ├── package.json
│   ├── .env.example                   # Backend environment template
│   └── src/
│       ├── app.js                     # Express app, middleware & route mounting
│       ├── config/
│       │   └── config.js              # Mongoose DB connection logic
│       ├── controllers/
│       │   ├── authController.js       # Login, Signup, Profile logic
│       │   ├── transactionController.js# MongoDB Transaction CRUD
│       │   └── bankingController.js   # Accounts, Cards, Bills handlers
│       ├── middleware/
│       │   └── authMiddleware.js      # JWT Bearer token verification
│       ├── models/
│       │   ├── User.js                # User schema with bcrypt pre-save
│       │   └── Transaction.js         # Transaction schema linked to User
│       ├── routes/
│       │   ├── authRoutes.js          # /login, /signup, /api/user-profile
│       │   ├── transactionRoutes.js   # /api/transactions
│       │   └── bankingRoutes.js       # /api/accounts, /api/cards, etc.
│       └── data/
│           └── mockData.js            # Initial mock data for cards & bills
│
└── FrontEnd/hdfc_bank/
    ├── index.html                     # Vite entry HTML
    ├── package.json
    ├── vite.config.js
    ├── .env.example                   # Frontend environment template
    └── src/
        ├── main.jsx                   # React root with ThemeProvider
        ├── App.jsx                    # Route definitions & protection
        ├── theme.js                   # Material-UI custom theme
        ├── services/
        │   └── api.js                 # Axios instance with interceptors
        └── Components/
            ├── AuthSidebar/           # Clean banking sidebar for login/signup
            ├── Login/                 # Login page
            ├── Signup/                # Registration page
            ├── NetBankingLoginForm/   # Login form component
            ├── NavBar/                # Navigation header & user menu
            ├── Home/                  # Dashboard & Transfer modal
            ├── CardsData/             # Cards management & limit slider
            ├── Bills_Recharge/        # Utility bills & recharge
            ├── CreditCardVisual/      # Visual card component
            └── Icons/                 # Vector SVG icon components
```

---

## Environment Variables

### Backend (`Backend/.env`)
Create a `.env` file in the `Backend/` directory based on `.env.example`:
```env
MONGODB_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/mern_banking?retryWrites=true&w=majority
PORT=3000
JWT_SECRET_KEY=your_secret_key_here
CLIENT_URL=http://localhost:5173
```

### Frontend (`FrontEnd/hdfc_bank/.env`)
Create a `.env` file in the `FrontEnd/hdfc_bank/` directory based on `.env.example`:
```env
VITE_API_URL=http://localhost:3000
```

---

## Installation & Running Locally

### Prerequisites
- Node.js (v18 or higher)
- MongoDB instance (MongoDB Atlas cluster or local MongoDB)

### 1. Setup Backend
```bash
cd Backend
npm install
npm run dev
```
The backend server runs on `http://localhost:3000`.

### 2. Setup Frontend
```bash
cd FrontEnd/hdfc_bank
npm install
npm run dev
```
The frontend dev server runs on `http://localhost:5173`.

---

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/` | Health check | No |
| POST | `/signup` | Register new user + seed demo transactions | No |
| POST | `/login` | Authenticate user & return JWT token | No |
| GET | `/api/user-profile` | Get profile of logged-in user | Yes (`Bearer <token>`) |
| GET | `/api/transactions` | Get transactions for logged-in user from MongoDB | Yes (`Bearer <token>`) |
| POST | `/api/transactions` | Record new transfer / payment into MongoDB | Yes (`Bearer <token>`) |
| GET | `/api/accounts` | Get account balance details | Yes (`Bearer <token>`) |
| GET | `/api/cards` | Get card details and features | Yes (`Bearer <token>`) |
| GET | `/api/billsrecharge` | Get pending utility bills | Yes (`Bearer <token>`) |
| GET | `/api/loans` | Get loan options | Yes (`Bearer <token>`) |

---

## Database Design

### 1. `users` Collection
- `UserName` (String, required)
- `fullname` (String, required)
- `CustomerID` (String, unique, required)
- `Password` (String, bcrypt hashed, required)
- `country` (String, required)
- `mobileNumber` (String, required)
- `createdAt` (Date)

### 2. `transactions` Collection
- `userId` (ObjectId referencing User, required)
- `title` (String, required)
- `category` (String, required)
- `amount` (Number, required)
- `type` (String, enum: `['credit', 'debit']`, required)
- `date` (String, required)
- `referenceNo` (String, required)
- `status` (String, default: `'Success'`)
- `createdAt` (Date)

---

## Future Improvements

1. Add pagination and date-range filters for the transaction history.
2. Integrate OTP verification for fund transfers.
3. Migrate the remaining banking modules (Cards and Bills) from mock data to dedicated MongoDB collections.
4. Add automated unit and integration tests using Jest / Supertest.
