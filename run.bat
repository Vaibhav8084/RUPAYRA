@echo off
chcp 65001 >nul
title RUPAYRA — Real-Time Payment Intelligence Platform
color 0E

echo =====================================================================
echo   RUPAYRA - Real-Time Payment Intelligence Platform
echo   "Every payment tells a story."
echo =====================================================================
echo.

cd /d "%~dp0"

echo [*] Current working directory: %CD%
echo [*] Verifying Node.js environment...

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [!] Error: Node.js is not found in PATH!
    echo [!] Please install Node.js from https://nodejs.org/ and restart your terminal.
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%v in ('node -v 2^>nul') do set NODE_VER=%%v
echo [*] Node.js version %NODE_VER% detected.
echo.

if not exist "node_modules\" (
    echo [*] node_modules folder not found.
    echo [*] Installing required dependencies...
    call npm install
    if errorlevel 1 (
        echo [!] npm install encountered an error. Trying with npm.cmd...
        call npm.cmd install
    )
) else (
    echo [*] Dependencies already verified.
)

echo.
echo =====================================================================
echo   Starting RUPAYRA Live Interface...
echo   Local Address: http://localhost:5173/
echo =====================================================================
echo.

REM Open browser after 2 seconds using ping delay (works reliably on all Windows versions)
start "" cmd /c "ping 127.0.0.1 -n 3 >nul & start http://localhost:5173/"

REM Start the Vite development server
if exist "node_modules\.bin\vite.cmd" (
    call "node_modules\.bin\vite.cmd" --host --port 5173
) else (
    call npm.cmd run dev -- --host --port 5173
)

if %errorlevel% neq 0 (
    echo.
    echo [!] Vite server stopped with exit code %errorlevel%.
    pause
)
