# Job Portal Backend API

A RESTful Job Portal Backend API built using **Node.js, Express.js, and MongoDB Atlas**. This project provides backend functionality for user authentication, job posting management, and job applications.

## 🚀 Features

- User registration and login
- Secure password hashing
- JWT-based authentication
- Create and manage job postings
- Retrieve all available jobs
- Get job details by ID
- Update and delete job postings
- Retrieve jobs posted by the authenticated user
- Submit and manage job applications
- Protected routes using authentication middleware
- MongoDB Atlas database integration
- Environment variable configuration using dotenv

## 🛠️ Technologies Used

- **Node.js** – JavaScript runtime
- **Express.js** – Backend framework
- **MongoDB Atlas** – Cloud database
- **Mongoose** – MongoDB object modeling
- **JWT (JSON Web Token)** – Authentication
- **bcrypt / bcryptjs** – Password hashing
- **dotenv** – Environment variable management
- **Nodemon** – Development server

## 📁 Project Structure

```text
job-Portal/
│
├── controllers/
│   ├── user.js
│   ├── job.js
│   └── application.js
│
├── models/
│   ├── user.js
│   ├── job.js
│   └── application.js
│
├── routes/
│   ├── user.js
│   ├── job.js
│   └── application.js
│
├── middleware/
│   └── auth.js
│
├── .env
├── .gitignore
├── index.js
├── package.json
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the project folder

```bash
cd job-Portal
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the root directory:

```env
PORT=8000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret
```

Replace the placeholder values with your actual MongoDB Atlas connection string and JWT secret.

**Important:** Never upload your `.env` file or expose database credentials and secret keys on GitHub.

### 5. Run the application

Start the development server:

```bash
npm run dev
```

Alternatively, run the application directly:

```bash
node index.js
```

If the server starts successfully and the database connects, the API will be ready to receive requests.

## 🌐 API Base URL

For local development:

```text
http://localhost:8000
```

## 📌 API Endpoints

The following endpoints are illustrative. Confirm the exact paths and HTTP methods against your route files.

### User Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/user/register` | Register a new user |
| POST | `/api/user/login` | Log in a user |

### Job Management

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/jobs` | Retrieve all jobs |
| GET | `/api/jobs/:id` | Retrieve a job by ID |
| POST | `/api/jobs` | Create a job posting |
| PUT | `/api/jobs/:id` | Update a job posting |
| DELETE | `/api/jobs/:id` | Delete a job posting |
| GET | `/api/jobs/my-jobs` | Retrieve the authenticated user's jobs |

### Job Applications

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/applications` | Apply for a job |
| GET | `/api/applications` | Retrieve applications |
| GET | `/api/applications/:id` | Retrieve an application by ID |
| PUT | `/api/applications/:id` | Update an application |
| DELETE | `/api/applications/:id` | Delete an application |

*Note: The application endpoints and route prefixes above may differ from your implementation. Use your actual routes as the source of truth.*

## 🔐 Authentication

The API uses JSON Web Tokens (JWT) to authenticate users.

For protected endpoints, include your token in the request headers:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

The authentication middleware verifies the token and identifies the authenticated user before granting access to protected routes.

## 🧪 Testing the API

You can test the endpoints using Postman or another REST API client.

Recommended testing workflow:

1. Register a new user.
2. Log in and obtain the authentication token.
3. Send the token in the authorization header.
4. Create a job posting.
5. Retrieve all jobs and individual job details.
6. Update or delete a job posting.
7. Submit a job application.
8. Test protected endpoints with and without a valid token.

## ☁️ Deployment

The application can be deployed to a hosting platform such as Vercel.

Before deploying:

- Push the latest code to GitHub.
- Configure your MongoDB Atlas database.
- Add the required environment variables to the hosting platform.
- Ensure the Express application is configured for the selected hosting platform.
- Test the deployed API endpoints.

## 🔒 Security Practices

- Hash passwords before storing them.
- Store secrets in environment variables.
- Never commit `.env` to GitHub.
- Validate incoming request data.
- Protect private routes using authentication middleware.
- Apply authorization checks to job and application operations.

## 👨‍💻 Author

**Muhammad Maaz Bin Aamir**

BS Computer Science Student  
Backend Development | Node.js | Express.js | MongoDB

GitHub: [maazmuhammad5678](https://github.com/maazmuhammad5678)

## 📄 License

This project is intended for educational and learning purposes. Add a license file if you wish to distribute it under a specific open-source license.
