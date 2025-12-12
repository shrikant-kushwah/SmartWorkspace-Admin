# Smart Workspace Admin

A workspace management system built with Angular and Node.js. This project handles different user roles (admin, manager, employee) with their own dashboards and features.

## What's This About?

Basically, it's a full-stack app where users can log in based on their role and get access to different parts of the system. Admins can manage everything, managers handle their teams, and employees see their own stuff. Pretty standard setup, but it works.

## Tech Stack

**Frontend:**
- Angular 16.2
- TypeScript
- RxJS for handling async stuff

**Backend:**
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication (access tokens + refresh tokens)
- bcrypt for password hashing

## Getting Started

First things first, you'll need Node.js installed and MongoDB running locally (or use a cloud instance).

### Backend Setup

1. Go into the backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Copy the `.env.example` file to `.env` and fill in your values:
```bash
cp .env.example .env
```

You'll need to set:
- `PORT` - usually 4000
- `MONGODB_URI` - your MongoDB connection string
- `JWT_SECRET` - some random secret string for signing tokens
- `REFRESH_TOKEN_SECRET` - another secret for refresh tokens
- Token expiry times (15m for access, 7d for refresh is fine)

4. Seed some users if you want (optional):
```bash
npm run seed
```

5. Start the server:
```bash
npm start
```

Or use nodemon for development:
```bash
npm run dev
```

The backend should be running on `http://localhost:4000` (or whatever port you set).

### Frontend Setup

1. Go into the frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Copy `.env.example` to `.env` if you need to change the API URL (defaults to `http://localhost:4000/api`):
```bash
cp .env.example .env
```

4. Start the dev server:
```bash
npm start
```

The frontend will be running on `http://localhost:4200`.

## Project Structure

**Backend:**
- `server.js` - main entry point
- `config/db.js` - MongoDB connection
- `models/User.js` - user schema
- `routes/auth.js` - login, register, password reset endpoints
- `routes/users.js` - user management endpoints
- `middleware/auth.js` - JWT verification and role checking

**Frontend:**
- `src/app/modules/auth/` - login, forgot password, reset password pages
- `src/app/modules/admin/` - admin dashboard stuff
- `src/app/modules/manager/` - manager dashboard
- `src/app/modules/employee/` - employee dashboard
- `src/app/core/` - guards, interceptors, auth service

## Features

- **Authentication**: Login with email/password, JWT tokens, refresh token rotation
- **Password Reset**: Forgot password flow with reset tokens (15 minute expiry)
- **Role-Based Access**: Different routes for admin, manager, and employee roles
- **User Management**: Admins can see all users, everyone can see their own profile

## Routes

**Backend API:**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout
- `POST /api/auth/forgot` - Request password reset
- `POST /api/auth/reset` - Reset password with token
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/me` - Get current user profile

**Frontend Routes:**
- `/auth` - Login page
- `/auth/forgot` - Forgot password
- `/admin` - Admin dashboard (admin only)
- `/manager` - Manager dashboard (manager only)
- `/employee` - Employee dashboard (authenticated users)

## Notes

- Make sure MongoDB is running before starting the backend
- The password reset tokens expire after 15 minutes
- Refresh tokens are stored in the database and checked on refresh
- All passwords are hashed with bcrypt (10 rounds)
- The frontend uses Angular guards to protect routes based on roles

That's pretty much it. If you run into issues, check that MongoDB is running and your environment variables are set correctly.
