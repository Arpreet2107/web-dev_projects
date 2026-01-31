# Detailed Setup Guide

This guide provides step-by-step instructions for setting up the PMI Pune-Deccan website.

## Quick Start

1. **Start PostgreSQL**
   ```bash
   docker-compose up -d
   ```

2. **Install Dependencies**
   ```bash
   npm run install:all
   ```

3. **Set Up Backend Database**
   ```bash
   cd backend
   echo "DATABASE_URL=postgresql://postgres:postgres@localhost:5432/pmipune_db?schema=public" > .env
   echo "NODE_ENV=development" >> .env
   echo "PORT=5000" >> .env
   npx prisma generate
   npx prisma migrate dev --name init
   cd ..
   ```

4. **Start All Services**
   - Terminal 1: `cd cms && npm run develop` (First time: create admin user)
   - Terminal 2: `cd backend && npm run dev`
   - Terminal 3: `cd frontend && npm run dev`

## Strapi CMS Setup

### First-Time Setup

1. Start Strapi: `cd cms && npm run develop`
2. Open http://localhost:1337/admin
3. Create your admin account (first user)
4. The content types (Event, Member, Resource, Partner) are already configured

### Configuring Public Permissions

After logging into Strapi admin:

1. Go to **Settings** → **Users & Permissions Plugin** → **Roles**
2. Click on **Public** role
3. Under **Permissions**, find each content type:
   - **Event**: Enable `find` and `findOne`
   - **Member**: Enable `find` and `findOne`
   - **Resource**: Enable `find` and `findOne`
   - **Partner**: Enable `find` and `findOne`
4. Click **Save**

### Adding Sample Content

1. Go to **Content Manager**
2. Select a content type (e.g., **Event**)
3. Click **Create new entry**
4. Fill in the required fields:
   - **Event**: title, slug (auto-generated), startDateTime, description
   - **Member**: name, role, bio
   - **Resource**: title, resourceType, description
   - **Partner**: name, logo (upload image), websiteUrl
5. Click **Save** then **Publish**

## Testing the Application

### Test Event Registration Flow

1. Ensure all services are running
2. Create an event in Strapi CMS
3. Navigate to http://localhost:3000/events
4. Click on an event to view details
5. Fill out the registration form
6. Submit the form
7. Verify registration in database:
   ```bash
   cd backend
   npx prisma studio
   ```

### Verify API Endpoints

- Health check: http://localhost:5000/health
- Get registrations: http://localhost:5000/api/registrations
- Strapi API: http://localhost:1337/api/events

## Troubleshooting

### Port Already in Use

If a port is already in use:

- **Port 3000**: Change in `frontend/package.json` dev script
- **Port 1337**: Change in `cms/config/server.js` or `.env`
- **Port 5000**: Change in `backend/.env` or `backend/src/index.ts`
- **Port 5432**: Stop existing PostgreSQL or change in `docker-compose.yml`

### Database Connection Issues

```bash
# Check if PostgreSQL is running
docker-compose ps

# Check PostgreSQL logs
docker-compose logs postgres

# Test connection
psql -h localhost -U postgres -d pmipune_db
```

### Strapi Content Types Not Appearing

1. Restart Strapi server
2. Check `cms/src/api/` directory structure
3. Verify schema.json files are correct
4. Check Strapi logs for errors

### Frontend Not Loading Data

1. Verify Strapi is running and accessible
2. Check browser console for CORS errors
3. Verify Public role permissions are set
4. Test Strapi API directly: http://localhost:1337/api/events

### Registration Form Not Working

1. Verify Express backend is running
2. Check browser console for API errors
3. Verify Prisma migrations completed
4. Check backend logs for errors
5. Test API directly: `curl -X POST http://localhost:5000/api/registrations -H "Content-Type: application/json" -d '{"eventSlug":"test","eventTitle":"Test Event","fullName":"Test User","email":"test@example.com"}'`

## Production Deployment Notes

Before deploying to production:

1. Update all `.env` files with production values
2. Change database from SQLite to PostgreSQL for Strapi
3. Set secure APP_KEYS and JWT secrets
4. Configure proper CORS origins
5. Set up SSL/HTTPS
6. Configure environment-specific API URLs
7. Set up proper logging and monitoring
8. Configure backup strategy for databases

