# FixItNow Backend

## Overview
FixItNow is a backend API for a home services marketplace where customers can browse services, book technicians, make payments, and leave reviews.

## Roles
- Customer
- Technician
- Admin

## Admin Credentials
- Email: admin@fixitnow.com
- Password: admin123

## Tech Stack
- Node.js + Express
- TypeScript
- Prisma + PostgreSQL
- JWT
- Stripe

## API Routes
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me
- GET /api/categories
- POST /api/categories
- GET /api/services
- POST /api/services
- GET /api/technicians
- GET /api/technicians/:id
- POST /api/technicians/profile
- GET /api/bookings
- POST /api/bookings
- PATCH /api/bookings/:id
- POST /api/payments/create
- GET /api/payments
- POST /api/reviews
- GET /api/admin/users
- PATCH /api/admin/users/:id
- GET /api/admin/bookings

## Setup
1. npm install
2. Create a .env with DATABASE_URL and JWT_SECRET
3. npx prisma migrate dev
4. npm run seed
5. npm run dev
