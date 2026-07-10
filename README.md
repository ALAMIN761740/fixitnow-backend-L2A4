# FixItNow Backend

FixItNow is a production-ready backend API for a home services marketplace. It provides authentication, role-based authorization, service catalog, technician profiles, booking flow, payment integration (Stripe), reviews, and admin management.

**Repository placeholders (fill before submission)**
- Backend GitHub repo: [REPO_URL_HERE]
- Live API URL: [LIVE_API_URL_HERE]
- Postman collection: https://github.com/ALAMIN761740/fixitnow-backend-L2A4/blob/main/postman/fixitnow-backend.postman_collection.json

## Features
- Authentication (JWT)
- Role-based authorization (Customer, Technician, Admin)
- CRUD for categories and services
- Technician profiles and availability
- Booking flow with status updates
- Payment session creation (Stripe) and confirmation
- Review system for completed bookings
- Admin dashboard endpoints (users, bookings)

## Tech Stack
- Node.js (v18+)
- Express
- TypeScript
- Prisma ORM + PostgreSQL
- JWT for auth
- Zod for request validation
- Stripe for payments

## Folder Structure (important files)

- `src/`
	- `config/` — DB client and environment config
	- `middlewares/` — auth, validation, error handling
	- `modules/` — feature modules (each has route/controller/service/interface/validation)
		- `auth/`, `user/`, `category/`, `technician/`, `service/`, `booking/`, `payment/`, `review/`, `admin/`
	- `utils/` — shared helpers (hashing, pagination, error classes)
	- `routes/` — central route registration

## Installation

1. Install dependencies

```bash
npm install
```

2. Copy environment example and fill values

```bash
cp .env.example .env
# Edit .env and set DATABASE_URL, JWT_SECRET, STRIPE_SECRET_KEY, CLIENT_URL
```

3. Generate Prisma client and apply migrations

```bash
npx prisma validate
npx prisma generate
npx prisma migrate dev
```

4. Seed the database (creates default admin)

```bash
npm run seed
```

5. Start development server

```bash
npm run dev
```

## Environment Variables

- `DATABASE_URL` — Postgres connection string
- `JWT_SECRET` — JSON Web Token secret (keep secret)
- `JWT_EXPIRES_IN` — token expiry (default `7d`)
- `PORT` — server port (default `5000`)
- `STRIPE_SECRET_KEY` — Stripe secret (for payments)
- `CLIENT_URL` — frontend URL used for redirect URLs

See `.env.example` for a template.

## API Overview

All endpoints are mounted under `/api`.

- `POST /api/auth/register` — register new user
- `POST /api/auth/login` — login and receive access token
- `GET /api/auth/me` — get current profile (authenticated)
- `GET /api/categories` — list categories
- `POST /api/categories` — create category (ADMIN)
- `GET /api/services` — list services
- `POST /api/services` — create service (TECHNICIAN)
- `GET /api/technicians` — list technicians
- `GET /api/technicians/:id` — technician detail
- `POST /api/technicians/profile` — create/update technician profile (TECHNICIAN)
- `POST /api/bookings` — create booking (CUSTOMER)
- `GET /api/bookings` — get bookings for current user
- `PATCH /api/bookings/:id` — update booking status (authorized roles)
- `POST /api/payments/create` — create Stripe payment session (CUSTOMER)
- `POST /api/payments/confirm` — confirm payment (CUSTOMER)
- `GET /api/payments` — list user payments
- `POST /api/reviews` — create review for booking (CUSTOMER)
- `GET /api/admin/users` — list users (ADMIN)
- `PATCH /api/admin/users/:id` — update user status (ADMIN)
- `GET /api/admin/bookings` — list all bookings (ADMIN)

Refer to the Postman collection (placeholder above) for request/response examples.

## Authentication & Roles

- Uses JWT in `Authorization: Bearer <token>` header.
- Roles: `CUSTOMER`, `TECHNICIAN`, `ADMIN`.
- Role-based authorization is enforced in routes via middleware.

## Error Response Format

All error responses follow this shape:

```json
{
	"success": false,
	"message": "...",
	"errorDetails": "..." // only present in non-production
}
```

## Admin Credentials (seeded)

- Email: `admin@fixitnow.com`
- Password: `admin123`

## Project Architecture & Notes

- Each module follows a clean structure: `route`, `controller`, `service`, `interface`, `validation`.
- Controllers are thin and delegate business logic to services.
- Validation uses Zod and is applied via a shared `validateRequest` middleware.
- Prisma client centralized in `src/config/db.ts`.
- Error handling is centralized in `src/middlewares/errorHandler.ts` and hides internal details in production.

## Git Commit Plan

Create several meaningful commits (already prepared locally):
- `chore(config): fix tsconfig and Prisma config for dev runtime`
- `feat(modules): add service and interface layers; move business logic into services`
- `feat(validation): add Zod validators and wire into module routes`
- `chore(utils): add utilities and improve error handling`

## Submission Placeholders

- Backend GitHub repo: [REPO_URL_HERE]
- Live API URL: [LIVE_API_URL_HERE]
- Postman collection: [POSTMAN_COLLECTION_URL_HERE]
- Admin Email: admin@fixitnow.com
- Admin Password: admin123

## License

MIT

