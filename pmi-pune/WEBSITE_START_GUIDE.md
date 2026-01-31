# PMI Pune-Deccan Chapter Website - Complete Start Guide

This comprehensive guide will help you set up and launch the PMI Pune-Deccan Chapter website from scratch.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Architecture](#project-architecture)
3. [Installation Steps](#installation-steps)
4. [Environment Configuration](#environment-configuration)
5. [Database Setup](#database-setup)
6. [Starting the Services](#starting-the-services)
7. [Initial Configuration](#initial-configuration)
8. [API Keys & External Services](#api-keys--external-services)
9. [Testing the Application](#testing-the-application)
10. [Troubleshooting](#troubleshooting)
11. [Production Deployment](#production-deployment)
12. [Feature List](#feature-list)

---

## Prerequisites

Before starting, ensure you have the following installed:

### Required Software

1. **Node.js** (v18.x or higher)
   - Download from: https://nodejs.org/
   - Verify: `node --version` (should show v18.x or higher)
   - Verify: `npm --version` (should show 9.x or higher)

2. **PostgreSQL** (v14 or higher) OR **Docker** (for containerized PostgreSQL)
   - PostgreSQL: https://www.postgresql.org/download/
   - Docker: https://www.docker.com/get-started
   - Verify PostgreSQL: `psql --version`
   - Verify Docker: `docker --version`

3. **Git** (for version control)
   - Download from: https://git-scm.com/
   - Verify: `git --version`

### Recommended Tools

- **VS Code** or any modern code editor
- **Postman** or **Insomnia** (for API testing)
- **pgAdmin** or **DBeaver** (for database management)

---

## Project Architecture

The website consists of three interconnected applications:

```
pmi-pune/
├── frontend/          # Next.js 14 application (Port 3000)
├── backend/           # Express.js API server (Port 5000)
├── cms/              # Strapi CMS (Port 1337)
└── docker-compose.yml # PostgreSQL container
```

### Technology Stack

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- NextAuth.js (Authentication)
- React Query (Data fetching)
- Razorpay (Payment gateway)
- Recharts (Analytics charts)
- Lucide React (Icons)
- React Hook Form + Zod (Form validation)
- Date-fns (Date formatting)

**Backend:**
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- Razorpay SDK
- Axios (HTTP client)
- Helmet (Security)
- CORS

**CMS:**
- Strapi 4
- SQLite (development)
- PostgreSQL (production)

---

## Installation Steps

### Step 1: Navigate to Project

```bash
cd pmi-pune
```

### Step 2: Install Dependencies

Install dependencies for all three applications:

```bash
# Frontend
cd frontend
npm install
cd ..

# Backend
cd backend
npm install
cd ..

# CMS
cd cms
npm install
cd ..
```

**Or use the root script:**
```bash
npm run install:all
```

### Step 3: Start PostgreSQL Database

**Option A: Using Docker (Recommended)**
```bash
docker-compose up -d
```

This will start PostgreSQL on port 5432 with:
- Database: `pmipune_db`
- User: `postgres`
- Password: `postgres`

**Option B: Using Local PostgreSQL**

1. Create a database:
```bash
createdb pmipune_db
```

2. Update `backend/.env` with your PostgreSQL credentials

---

## Environment Configuration

### Step 1: Create Environment Files

Create the following `.env` files in each directory:

#### Frontend (`frontend/.env.local`)

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-minimum-32-characters-long

# Google OAuth (Optional but recommended)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# API URLs
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337

# Razorpay (Get from Razorpay Dashboard)
NEXT_PUBLIC_RAZORPAY_KEY_ID=your-razorpay-key-id

# Strapi (for server-side operations)
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your-strapi-api-token
```

#### Backend (`backend/.env`)

```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/pmipune_db?schema=public

# Server
NODE_ENV=development
PORT=5000

# NextAuth (must match frontend)
NEXTAUTH_SECRET=your-super-secret-key-minimum-32-characters-long

# Strapi
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your-strapi-api-token

# Razorpay
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
```

#### CMS (`cms/.env`)

```env
# Server
HOST=0.0.0.0
PORT=1337

# Security Keys (Generate random strings)
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=your-random-salt-string
ADMIN_JWT_SECRET=your-random-jwt-secret
TRANSFER_TOKEN_SALT=your-random-transfer-salt

# Database (SQLite for development)
DATABASE_FILENAME=.tmp/data.db
```

### Step 2: Generate Secure Keys

**For NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

**For Strapi keys:**
```bash
# Generate random strings (you can use any method)
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Run this multiple times to generate different keys.

---

## Database Setup

### Step 1: Generate Prisma Client

```bash
cd backend
npx prisma generate
```

### Step 2: Run Database Migrations

```bash
npx prisma migrate dev --name init
```

This will:
- Create all tables in PostgreSQL
- Set up NextAuth tables (User, Account, Session, VerificationToken)
- Create EventRegistration, PaymentOrder, PduLog, ResourceDownload tables

### Step 3: Verify Database

```bash
npx prisma studio
```

This opens a web interface at `http://localhost:5555` where you can view your database.

---

## Starting the Services

You need to run all three services simultaneously. Use **three separate terminal windows**:

### Terminal 1: Strapi CMS

```bash
cd cms
npm run develop
```

**First Time Setup:**
1. Open http://localhost:1337/admin
2. Create your admin account:
   - First Name
   - Last Name
   - Email
   - Password
3. Click "Let's start"

**Configure Permissions:**
1. Go to **Settings** → **Users & Permissions Plugin** → **Roles**
2. Click on **Public** role
3. Under **Permissions**, enable:
   - **Event**: `find`, `findOne`
   - **Member**: `find`, `findOne`
   - **Resource**: `find`, `findOne`
   - **Partner**: `find`, `findOne`
   - **Page**: `find`, `findOne`
4. Click **Save**

### Terminal 2: Express Backend

```bash
cd backend
npm run dev
```

The API will be available at: http://localhost:5000

**Test the API:**
```bash
curl http://localhost:5000/health
```

Should return: `{"status":"ok","timestamp":"..."}`

### Terminal 3: Next.js Frontend

```bash
cd frontend
npm run dev
```

The website will be available at: http://localhost:3000

---

## Initial Configuration

### 1. Create Strapi API Token

1. Go to http://localhost:1337/admin
2. Navigate to **Settings** → **API Tokens**
3. Click **Create new API Token**
4. Name: `Frontend API Token`
5. Token type: `Full access`
6. Token duration: `Unlimited`
7. Click **Save**
8. **Copy the token** and add it to:
   - `frontend/.env.local` as `STRAPI_API_TOKEN`
   - `backend/.env` as `STRAPI_API_TOKEN`

### 2. Add Sample Content in Strapi

**Create an Event:**
1. Go to **Content Manager** → **Event**
2. Click **Create new entry**
3. Fill in:
   - Title: "Monthly Chapter Meeting"
   - Slug: (auto-generated)
   - Description: (rich text)
   - Excerpt: "Join us for our monthly chapter meeting"
   - Start Date Time: (select future date)
   - Venue: "Pune Office"
   - Registration Fee: 0 (or any amount)
   - Max Attendees: 50
   - Available Seats: 50
   - PDU Credits: 2
   - Is Active: true
4. Click **Save** then **Publish**

**Create a Member:**
1. Go to **Content Manager** → **Member**
2. Create entries for leadership team
3. Add name, role, bio, and avatar image

**Create a Resource:**
1. Go to **Content Manager** → **Resource**
2. Create entries with:
   - Title, description
   - Resource Type (Template, Whitepaper, Case Study, Guide)
   - Category (Agile, Risk, PMP, General)
   - Upload file and featured image

**Create a Partner:**
1. Go to **Content Manager** → **Partner**
2. Add partner name, logo, website URL, isActive: true

**Create a Page:**
1. Go to **Content Manager** → **Page**
2. Create dynamic pages like "About Us", "Membership Benefits"
3. Use Dynamic Zone to add rich text, images, CTAs

---

## API Keys & External Services

### Razorpay Setup (For Payment Processing)

1. **Create Razorpay Account:**
   - Go to https://razorpay.com/
   - Sign up for an account
   - Complete KYC verification

2. **Get API Keys:**
   - Go to **Settings** → **API Keys**
   - Generate **Test Keys** (for development)
   - Copy **Key ID** and **Key Secret**

3. **Add to Environment:**
   - `frontend/.env.local`: `NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_...`
   - `backend/.env`: 
     ```
     RAZORPAY_KEY_ID=rzp_test_...
     RAZORPAY_KEY_SECRET=your_key_secret
     ```

4. **Webhook Configuration (Production):**
   - In Razorpay Dashboard → **Webhooks**
   - Add webhook URL: `https://yourdomain.com/api/registrations/verify-payment`
   - Select events: `payment.captured`, `payment.failed`

### Google OAuth Setup (Optional)

1. **Create Google Cloud Project:**
   - Go to https://console.cloud.google.com/
   - Create a new project
   - Enable **Google+ API**

2. **Create OAuth Credentials:**
   - Go to **APIs & Services** → **Credentials**
   - Click **Create Credentials** → **OAuth client ID**
   - Application type: **Web application**
   - Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
   - Copy **Client ID** and **Client Secret**

3. **Add to Environment:**
   - `frontend/.env.local`:
     ```
     GOOGLE_CLIENT_ID=your-client-id
     GOOGLE_CLIENT_SECRET=your-client-secret
     ```

---

## Testing the Application

### 1. Test Homepage
- Visit http://localhost:3000
- Verify hero section, events grid, partner carousel, testimonials
- Test search bar functionality
- Test chatbot (click floating button)

### 2. Test Authentication
- Click **Register** → Create account
- Or click **Login** → Sign in
- Test Google OAuth (if configured)
- Verify redirect to dashboard

### 3. Test Event Registration
- Go to **Events** page
- Click on an event
- Click **Register** button
- For paid events: Complete Razorpay payment
- Verify registration appears in dashboard

### 4. Test Calendar View
- Go to **Events** → **Calendar View**
- Navigate between months
- Click on events in calendar
- Verify upcoming events list

### 5. Test Admin Panel
- Login as admin user
- Visit http://localhost:3000/admin
- Verify admin dashboard loads with charts
- Test event management
- Test registrations view with CSV export
- Test user directory

### 6. Test Search
- Use search bar in header
- Search for events or resources
- Verify results appear
- Click on results to navigate

### 7. Test Forms
- Contact form
- Volunteer application
- Sponsorship inquiry
- Membership application

### 8. Test API Endpoints

**Health Check:**
```bash
curl http://localhost:5000/health
```

**Get Events:**
```bash
curl http://localhost:5000/api/strapi/events
```

**User Profile (requires auth):**
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:5000/api/user/profile
```

---

## Troubleshooting

### Common Issues

#### 1. Port Already in Use

**Error:** `Port 3000 is already in use`

**Solution:**
```bash
# Find process using port
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Kill process or change port in package.json
```

#### 2. Database Connection Error

**Error:** `Can't reach database server`

**Solutions:**
- Verify PostgreSQL is running: `docker-compose ps`
- Check DATABASE_URL in `backend/.env`
- Test connection: `psql -h localhost -U postgres -d pmipune_db`

#### 3. Strapi Not Starting

**Error:** `Error: listen EADDRINUSE: address already in use :::1337`

**Solutions:**
- Kill existing Strapi process
- Change port in `cms/.env`: `PORT=1338`
- Update frontend/backend URLs accordingly

#### 4. NextAuth Error

**Error:** `NEXTAUTH_SECRET is missing`

**Solution:**
- Ensure `NEXTAUTH_SECRET` is set in `frontend/.env.local`
- Must be at least 32 characters
- Restart Next.js dev server

#### 5. Razorpay Payment Not Working

**Error:** Payment modal doesn't open

**Solutions:**
- Verify `NEXT_PUBLIC_RAZORPAY_KEY_ID` is set
- Check browser console for errors
- Ensure Razorpay script loads: Check Network tab
- Verify backend has correct Razorpay keys

#### 6. CORS Errors

**Error:** `Access to fetch blocked by CORS policy`

**Solutions:**
- Verify CORS settings in `backend/src/index.ts`
- Check `cms/config/middlewares.js` CORS configuration
- Ensure all URLs match in environment files

#### 7. Strapi Content Not Appearing

**Error:** Events/resources not showing on frontend

**Solutions:**
- Verify Public role permissions in Strapi
- Check content is published (not draft)
- Verify API token is correct
- Check browser console for API errors

#### 8. TypeScript Errors

**Error:** Various TypeScript compilation errors

**Solutions:**
- Run `npm install` in each directory
- Ensure all dependencies are installed
- Check `tsconfig.json` files are correct
- These errors should resolve after installing dependencies

---

## Production Deployment

### Pre-Deployment Checklist

- [ ] All environment variables set with production values
- [ ] Database migrated to PostgreSQL (not SQLite)
- [ ] Razorpay production keys configured
- [ ] Google OAuth production redirect URIs set
- [ ] Strapi API token regenerated
- [ ] Security keys regenerated
- [ ] CORS origins updated to production domain
- [ ] Error tracking configured (Sentry, etc.)
- [ ] SSL/HTTPS certificates configured

### Deployment Steps

1. **Build Applications:**
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm run build

# CMS
cd cms
npm run build
```

2. **Set Production Environment Variables**

3. **Deploy Services:**
   - Frontend: Deploy to Vercel, Netlify, or your server
   - Backend: Deploy to Railway, Render, or your server
   - CMS: Deploy to Railway, Render, or your server
   - Database: Use managed PostgreSQL (AWS RDS, Railway, etc.)

4. **Update DNS and SSL**

5. **Test Production Environment**

---

## Feature List

### ✅ Implemented Features

1. **Modern Homepage** - Hero, stats, events, resources, partners, testimonials
2. **Event Calendar** - List and calendar views
3. **Event Registration** - With Razorpay payment
4. **Certification Section** - PMP, CAPM, PMI-ACP details
5. **Membership Hub** - Benefits, fees, application form
6. **User Authentication** - Login, register, Google OAuth
7. **Member Dashboard** - Overview, events, PDU tracking, profile
8. **Resource Library** - Searchable, filterable, downloadable
9. **Dynamic Pages** - CMS-managed content
10. **Site-Wide Search** - Events and resources
11. **PDU Tracking** - Advanced dashboard with charts
12. **Chatbot** - AI assistant (ready for integration)
13. **Admin Dashboard** - Analytics, event management, registrations
14. **Volunteer Form** - Application system
15. **Sponsorship Form** - Inquiry system
16. **Contact Form** - Full contact system

### 📦 Dependencies & Libraries

#### Frontend Dependencies

```json
{
  "next": "14.2.35",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "next-auth": "^4.24.10",
  "@auth/prisma-adapter": "^2.7.0",
  "@tanstack/react-query": "^5.62.7",
  "react-hook-form": "^7.54.2",
  "@hookform/resolvers": "^3.9.1",
  "zod": "^3.23.8",
  "lucide-react": "^0.468.0",
  "razorpay": "^1.3.1",
  "recharts": "^2.15.0",
  "date-fns": "^4.1.0"
}
```

#### Backend Dependencies

```json
{
  "express": "^4.21.1",
  "@prisma/client": "^5.22.0",
  "prisma": "^5.22.0",
  "zod": "^3.23.8",
  "jsonwebtoken": "^9.0.2",
  "razorpay": "^2.9.2",
  "axios": "^1.7.9",
  "cors": "^2.8.5",
  "helmet": "^8.0.0"
}
```

#### CMS Dependencies

```json
{
  "@strapi/strapi": "4.25.0",
  "@strapi/plugin-users-permissions": "4.25.0",
  "@strapi/plugin-i18n": "4.25.0",
  "better-sqlite3": "11.3.0"
}
```

---

## Quick Start Commands

```bash
# Install all dependencies
npm run install:all

# Start PostgreSQL (Docker)
docker-compose up -d

# Setup database
cd backend && npx prisma migrate dev --name init && cd ..

# Start all services (in separate terminals)
# Terminal 1:
cd cms && npm run develop

# Terminal 2:
cd backend && npm run dev

# Terminal 3:
cd frontend && npm run dev
```

---

## Support & Resources

- **Strapi Documentation:** https://docs.strapi.io/
- **Next.js Documentation:** https://nextjs.org/docs
- **Prisma Documentation:** https://www.prisma.io/docs
- **Razorpay Documentation:** https://razorpay.com/docs/
- **NextAuth Documentation:** https://next-auth.js.org/
- **React Query Documentation:** https://tanstack.com/query/latest

---

## License

MIT License - See LICENSE file for details

---

**Last Updated:** December 2024

For issues or questions, contact: info@pmipunechapter.com
