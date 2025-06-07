# Team managenment Backend API

A robust REST API for team management platform built with Node.js, Express, and MongoDB.

## Features

- **User Authentication**: Register, login with JWT tokens
- **User Preferences**: Theme, dashbaord layout, notification settings
- **Dashboard Data**: Team stats, project, notifications, activity feed
- **Security**: Password hashing, JWT authentication, input validation
- **Error Handling**: Comprehensive error responses

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Environment**: dotenv

1. **Clone the repository**
```bash
git clone https://github.com/manishramanandi/team-management-backend

cd team-management-backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables Create a ***.env*** file in the root directory:

```env
PORT=5000

MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/team-management

JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=development
```

4. **Start the server**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Documentation

## Base URL
`http://localhost:5000/api`

### Authentication Endpoints

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
 "name": "manishramanandi",
 "email": "bairagimanish222@gmail.com",
 "password": "i use arch btw"
}
```

#### Login User

```http
POST /api/auth/login
Content-Type: application/json

{
"email": "bairagimanish222@gmail.com",
"password": "i use arch btw"
}
```

#### Get User Profile

```http
GET /api/auth/profile
Authorization: Bearer <jwt_token>
```

### Preferences Endpoints

### Get User Preferences

```http
GET /api/preferences
Authorization: Bearer <jwt_token>
```

### Update Preferences

```http
POST /API/preferences
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
    "theme": "dark",
    "dashboardLayout": "grid",
    "notifications": {
    "email": true,
    "push": false,
    "weekly_summary": true
    }
}
```

## Dashboard Endpoints

### Get Dashboar Summary

```http
GET /api/dashboard/summary
Authorization: Bearer <jwt_token>
```

### Get recent Activity

```http
GET /api/dashboard/activity
Authorization: Bearer <jwt_token>
```

## Environment Setup

### MongoDB Atlas Setup
1. Create account at MongoDB Atlas
2. Create a new Cluster
3. Get connection string
4. Add to **.env** file

`if you are using linux then you can probably face some issue with the IP address in mongoDB. `

## JWT secret

##### Generate a secure JWT secret:

```bash
node -e "console.log(require('crypt').randomBytes(64).toString('hex'))"
```

## Testing the API

### Use curl, insomnia or Thunder Client in vsCode:

```bash
# Register a new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get dashboard (replace TOKEN with actual JWT)
curl -X GET http://localhost:5000/api/dashboard/summary \
  -H "Authorization: Bearer TOKEN"
```
