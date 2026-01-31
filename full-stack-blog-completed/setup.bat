@echo off
echo ====================================
echo Birthday Website Setup
echo ====================================
echo.

echo [1/3] Installing dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: npm install failed!
    pause
    exit /b 1
)

echo.
echo [2/3] Creating environment file...
if not exist .env.local (
    copy .env.example .env.local >nul
    echo Created .env.local file
    echo IMPORTANT: Please edit .env.local and set your birthday date and password!
) else (
    echo .env.local already exists, skipping...
)

echo.
echo [3/3] Setup complete!
echo.
echo Next steps:
echo 1. Edit .env.local and set your birthday date and password
echo 2. Add music tracks to public/music/ folder
echo 3. Run: npm run dev
echo 4. Open http://localhost:3000 in your browser
echo.
pause

