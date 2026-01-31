# Quick Start Guide

## Prerequisites Check
- [ ] Node.js 18+ installed
- [ ] Docker installed (for PostgreSQL)
- [ ] Git installed

## 5-Minute Setup

### 1. Start Database
```bash
docker-compose up -d
```

### 2. Install All Dependencies
```bash
npm run install:all
```

### 3. Setup Backend Database
```bash
cd backend
echo "DATABASE_URL=postgresql://postgres:postgres@localhost:5432/pmipune_db?schema=public" > .env
echo "NODE_ENV=development" >> .env
echo "PORT=5000" >> .env
npx prisma generate
npx prisma migrate dev --name init
cd ..
```

### 4. Start Services (3 terminals)

**Terminal 1 - CMS:**
```bash
cd cms
npm run develop
# First time: Create admin user at http://localhost:1337/admin
# Then: Configure Public role permissions (see SETUP.md)
```

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 3 - Frontend:**
```bash
cd frontend
npm run dev
```

### 5. Access Applications
- Frontend: http://localhost:3000
- Strapi Admin: http://localhost:1337/admin
- API: http://localhost:5000

## First-Time Strapi Setup

After starting Strapi and creating admin user:

1. Go to **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
2. Enable `find` and `findOne` for:
   - Event
   - Member
   - Resource
   - Partner
3. Click **Save**

## Test the Application

1. Create an event in Strapi CMS
2. Visit http://localhost:3000/events
3. Click on the event
4. Fill out registration form
5. Submit and verify in database:
   ```bash
   cd backend
   npx prisma studio
   ```

## Common Issues

**Port already in use?**
- Change ports in respective config files

**Database connection error?**
- Check: `docker-compose ps`
- Verify: `.env` file in backend directory

**Frontend not loading data?**
- Check Strapi is running
- Verify Public role permissions
- Check browser console for errors

**Registration form not working?**
- Verify backend is running on port 5000
- Check Prisma migrations completed
- Test API: `curl http://localhost:5000/health`

## Need More Help?

See `SETUP.md` for detailed instructions or `README.md` for full documentation.

