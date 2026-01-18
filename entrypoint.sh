#!/bin/bash

# Function to kill processes on exit
cleanup() {
  echo "Stopping services..."
  # Kill all child processes in the same process group
  kill -- -$$
  exit
}

# Trap SIGINT (Ctrl+C) and SIGTERM
trap cleanup SIGINT SIGTERM

echo "========================================"
echo "   Starting Project Setup & Launch"
echo "========================================"

# Backend
echo "--> Setting up Backend..."
cd backend
if [ ! -d "node_modules" ]; then
  echo "Installing backend dependencies..."
  npm install
fi
echo "Building backend..."
npm run build
echo "Starting backend..."
npm run start:prod &
cd ..

# Frontend
echo "--> Setting up Frontend..."
cd frontend
if [ ! -d "node_modules" ]; then
  echo "Installing frontend dependencies..."
  npm install
fi
echo "Building frontend..."
npm run build
echo "Starting frontend..."
# Using --host to ensure it's accessible if needed, though default is fine.
# npm run preview usually runs on 4173 by default.
npm run preview &
cd ..

echo "========================================"
echo "   All services are up and running!"
echo "   Backend running in background"
echo "   Frontend running in background"
echo "   Press Ctrl+C to stop all services"
echo "========================================"

# Wait for any process to exit
wait
