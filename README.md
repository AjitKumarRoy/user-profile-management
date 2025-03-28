# User Profile Management API

A RESTful API for managing user profiles with local authentication and Google OAuth. This project is built with Node.js, Express, and MongoDB (using Mongoose).

# POSTMAN Documentation 
Link:-  https://documenter.getpostman.com/view/40524812/2sB2cPiQqu
## Table of Contents

- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [Authentication Endpoints](#authentication-endpoints)
  - [Profile Endpoints](#profile-endpoints)
- [Postman Documentation](#postman-documentation)

## Features

- **Local Authentication:** Signup, login, and password hashing with bcrypt.
- **Google OAuth:** Sign in using Google with OAuth2.
- **JWT Token Authentication:** Secure endpoints using JWT tokens stored in HTTP-only cookies.
- **Profile Management:** View and update user profiles.

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AjitKumarRoy/user-profile-management.git
   cd user-profile-management
2. **Install dependencies:**
    ```bash
    npm install
3. **Configure Environment Variables:** Create a .env file in the root directory and add the following keys:
    ```bash
    PORT=3000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    GOOGLE_REDIRECT_URL=your_google_redirect_url

4. **Start the Server:**
    ```bash
    npm start 

## Environment Variables
        PORT=3000
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret_key
        GOOGLE_CLIENT_ID=your_google_client_id
        GOOGLE_CLIENT_SECRET=your_google_client_secret
        GOOGLE_REDIRECT_URL=your_google_redirect_url

## API Endpoints
### Authentication Endpoints
#### 1. POST /api/auth/signup

- **Description:** Register a new user.
- **Body:**

  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "123456",
    "address": "Guwahati, Assam",
    "bio": "I'm Ajit, a Computer Science & Engineering student at Central Institute of Technology Kokrajhar and a passionate full-stack developer.",
    "profilePicture": "https://shorturl.at/O1PCT"
  }
#### 2. POST  /api/auth/login

- **Description:** Authenticate an existing user.
- **Body:**

  ```json
  {
    "email": "john@example.com",
    "password": "123456"
  }
- **Response:**  Redirects to the User's Profile page.

#### 3. GET /api/auth/google

- **Description:**  Initiates the Google OAuth flow.
- **Response:**  Redirects to the Google sign-in page

#### 4. GET /api/auth/google/callback

- **Description:**  Callback endpoint for Google OAuth.
- **Response:**  After successful authentication, creates the user and redirects to the profile page.

### Profile Endpoints
(These endpoints require authentication via a JWT token (set as an HTTP-only cookie or via the Authorization header).
#### 1. GET /api/profile/

- **Description:** Update the authenticated user’s profile.
- **Response:**  Get's the user profile page.

#### 2. PUT  /api/profile/

- **Description:** Update the authenticated user’s profile.
- **Body:**  Include the fields to update. For example:

  ```json
  {
    "name": "Tony Stark",
    "bio": "I am Iron Man",
    "password": "newpassword"
  }
#### 3. POST /api/profile/logout

- **Description:**  Logs out the user by clearing the token cookie.
- **Response:**  Returns a message confirming logout.






