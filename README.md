# MERN Stack Authentication App 🔐

A secure MERN stack authentication system with user registration, login, JWT-based auth, cookie token storage, OTP email verification, and forgot password feature.

## 🚀 Features

- ✅ Register & Login
- ✅ JWT Auth (stored in cookies)
- ✅ Bcrypt Password Hashing
- ✅ Email Verification via OTP
- ✅ Resend OTP
- ✅ Forgot Password via Email
- ✅ Protected Routes

## 🛠️ Tech Stack

- Frontend: React, Axios
- Backend: Node.js, Express
- DB: MongoDB
- Auth: JWT, Bcrypt
- Mail: NodeMailer

## 🔒 Authentication Flow

1. User registers with name, email, password.
2. Password is hashed using bcrypt.
3. OTP is sent to the user's email via NodeMailer.
4. User verifies the OTP to activate the account.
5. On login, JWT is generated and stored in an HTTP-only cookie.
6. Protected routes validate JWT before allowing access.


## ⚙️ Setup

## Backend .env file 
PORT=5000
MONGO_URI=your_mongodb_uri
SECRET_KEY=your_secret
NODE_ENV=development
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
CLIENT_URL=http://localhost:3000

### Backend
```bash
cd server
npm install
npm start

### Frontned
```bash
cd client
npm install
npm run dev

```




