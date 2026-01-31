#!/bin/bash

echo "🚀 PMI Pune Chapter Website Setup Script"
echo "========================================"

# Create project structure
echo "📁 Creating project structure..."
mkdir -p frontend backend cms

# Initialize Frontend
echo "⚛️  Setting up React frontend..."
cd frontend
npm create vite@latest . -- --template react-ts
npm install
npm install react-router-dom @reduxjs/toolkit react-redux @tanstack/react-query axios zod react-hook-form @hookform/resolvers recharts framer-motion lucide-react i18next react-i18next date-fns clsx tailwind-merge
npm install -D @types/react @types/react-dom @types/node tailwindcss autoprefixer postcss @vitejs/plugin-react eslint prettier

# Initialize Tailwind
npx tailwindcss init -p
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          navy: "#0F172A",
          blue: "#3B82F6",
          gold: "#F59E0B",
        },
        secondary: {
          green: "#10B981",
          orange: "#F97316",
          red: "#EF4444",
          blue: "#0EA5E9",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        "space-grotesk": ["Space Grotesk", "monospace"],
      },
    },
  },
  plugins: [],
}
EOF

cd ..

# Initialize Backend
echo "⚙️  Setting up Express backend..."
cd backend
npm init -y
npm install express cors helmet morgan dotenv bcryptjs jsonwebtoken zod razorpay redis ioredis multer nodemailer
npm install -D typescript @types/node @types/express @types/cors @types/bcryptjs @types/jsonwebtoken @types/multer tsx prisma @prisma/client

# Initialize TypeScript
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
EOF

cd ..

# Initialize Strapi CMS
echo "📝 Setting up Strapi CMS..."
cd cms
npx create-strapi-app@latest . --quickstart --no-run

cd ..

# Create Docker Compose
echo "🐳 Creating Docker configuration..."
cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: pmi_pune_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
  
  cms:
    build:
      context: ./cms
      dockerfile: Dockerfile.dev
    environment:
      DATABASE_CLIENT: postgres
      DATABASE_HOST: postgres
      DATABASE_NAME: pmi_pune_db
      DATABASE_USERNAME: postgres
      DATABASE_PASSWORD: postgres
      NODE_ENV: development
    ports:
      - "1337:1337"
    depends_on:
      - postgres
  
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.dev
    environment:
      DATABASE_URL: postgresql://postgres:postgres@postgres:5432/pmi_pune_db
      NODE_ENV: development
    ports:
      - "5000:5000"
    depends_on:
      - postgres
  
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    depends_on:
      - backend
      - cms

volumes:
  postgres_data:
EOF

# Create README
echo "📚 Creating project documentation..."
cat > README.md << 'EOF'
# PMI Pune Chapter Website

A professional-grade website for PMI Pune-Deccan India Chapter built with React, Express, and Strapi.

## Quick Start

1. **Clone and setup:**
   ```bash
   git clone <repository-url>
   cd pmi-pune-chapter-website
   chmod +x project-setup.sh
   ./project-setup.sh