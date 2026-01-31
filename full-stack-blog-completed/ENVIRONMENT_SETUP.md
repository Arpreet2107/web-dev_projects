# Environment Variables Setup Guide

## ⚠️ IMPORTANT: Update Your .env Files

Both `.env` files have been created with placeholder values. You **MUST** update them with your actual credentials before the application will work.

## Backend Environment Variables

Location: `backend/.env`

```env
# MongoDB Connection
# Local MongoDB: mongodb://localhost:27017/blogapp
# MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/blogapp
MONGO=mongodb://localhost:27017/blogapp

# Clerk Authentication
# Get these from: https://dashboard.clerk.com → Your App → API Keys
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key_here
CLERK_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# ImageKit Configuration
# Get these from: https://imagekit.io/dashboard → Settings → Developer Options
IK_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
IK_PUBLIC_KEY=your_imagekit_public_key
IK_PRIVATE_KEY=your_imagekit_private_key

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:5173
```

### How to Get Clerk Keys:
1. Go to https://dashboard.clerk.com
2. Select your application (or create a new one)
3. Navigate to **API Keys** in the sidebar
4. Copy the **Secret Key** → `CLERK_SECRET_KEY`
5. Copy the **Publishable Key** → Use in frontend `.env` as `VITE_CLERK_PUBLISHABLE_KEY`
6. For webhook secret:
   - Go to **Webhooks** in the sidebar
   - Click **Add Endpoint**
   - URL: `http://your-backend-url/webhooks/clerk` (use ngrok for local testing)
   - Select events: `user.created` and `user.deleted`
   - Copy the **Signing Secret** → `CLERK_WEBHOOK_SECRET`

## Frontend Environment Variables

Location: `client/.env`

```env
# Clerk Publishable Key
# Get from: https://dashboard.clerk.com → Your App → API Keys → Publishable Key
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here

# Backend API URL
VITE_API_URL=http://localhost:3000

# ImageKit Configuration
# Same values as backend ImageKit credentials
VITE_IK_PUBLIC_KEY=your_imagekit_public_key
VITE_IK_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
```

### How to Get ImageKit Keys:
1. Go to https://imagekit.io/dashboard
2. Navigate to **Settings** → **Developer Options**
3. Copy the following:
   - **Public Key** → Use in both `.env` files
   - **Private Key** → Use in backend `.env` only
   - **URL Endpoint** → Use in both `.env` files

## MongoDB Setup

### Option 1: Local MongoDB
1. Install MongoDB Community Edition from https://www.mongodb.com/try/download/community
2. Start MongoDB service:
   - Windows: MongoDB should start automatically as a service
   - Mac/Linux: `brew services start mongodb-community` or `sudo systemctl start mongod`
3. Use connection string: `mongodb://localhost:27017/blogapp`

### Option 2: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Create a database user
4. Whitelist your IP address (or use `0.0.0.0/0` for development)
5. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/blogapp`

## Testing Your Setup

After updating the `.env` files:

1. **Start Backend:**
   ```bash
   cd backend
   npm run dev
   ```
   You should see: `Server is running!` and `MongoDB is connected`

2. **Start Frontend:**
   ```bash
   cd client
   npm run dev
   ```
   You should see: `Local: http://localhost:5173`

3. **Test the Application:**
   - Open http://localhost:5173 in your browser
   - You should see the blog homepage
   - Click "Login" to test Clerk authentication
   - If you see errors, check the browser console and terminal for details

## Common Issues

### "Missing Publishable Key" Error
- Make sure `VITE_CLERK_PUBLISHABLE_KEY` is set in `client/.env`
- Restart the frontend server after updating `.env`

### "MongoDB connection failed"
- Verify MongoDB is running
- Check connection string in `backend/.env`
- For Atlas: Ensure IP is whitelisted and credentials are correct

### "Clerk authentication not working"
- Verify `CLERK_SECRET_KEY` in backend `.env`
- Verify `VITE_CLERK_PUBLISHABLE_KEY` in frontend `.env`
- Make sure keys are from the same Clerk application

### "Image upload not working"
- Verify ImageKit credentials in both `.env` files
- Make sure `IK_PUBLIC_KEY` and `VITE_IK_PUBLIC_KEY` match
- Make sure `IK_URL_ENDPOINT` and `VITE_IK_URL_ENDPOINT` match

