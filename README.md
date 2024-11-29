# Ayush Healthcare Dashboard

A comprehensive healthcare dashboard application with Go backend and React Native frontend.

## Features

- Secure patient data management
- Health metrics tracking
- Appointment scheduling
- Medical records access

## Prerequisites

- Go 1.19 or later
- Node.js 16 or later
- SQLite (included)

## Setup

### Backend
1. Navigate to backend directory:
   ```bash
   cd backend
   ```
2. Install Go dependencies:
   ```bash
   go mod tidy
   ```
3. Run the backend server:
   ```bash
   go run main.go
   ```
   Server will start on http://localhost:8080

### Frontend
1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
   Frontend will be available at http://localhost:3000

## API Documentation

The backend provides the following endpoints:

- `GET /patient/:id` - Get patient details
- `POST /patient/:id/health-metrics` - Add new health metrics
- `POST /patient/:id/appointments` - Schedule new appointment

All endpoints require Authorization header with a valid token.
