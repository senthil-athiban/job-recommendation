# Job Recommendation System

This project is designed to recommend jobs based on the skills matched from your resume with the job posting. It leverages modern web technologies to provide a seamless experience for job seekers to find relevant job opportunities.

## Architecture


### Client Server Architecture
![Client Server Architecture](https://github.com/senthil-athiban/job-recommendation/raw/main/client/public/client_server_architecture.png)

### Server Architecture
![Server Architecture](https://github.com/senthil-athiban/job-recommendation/raw/main/client/public/server_architecture.png)

### Job System Architecture
![Job System Architecture](https://github.com/senthil-athiban/job-recommendation/raw/main/client/public/job_architecture.png)

## Demo

[Watch Demo Video](https://drive.google.com/file/d/1qtv4L6CGEw1sZQjFYH6UM6R6-EJ9IoCW/view?usp=sharing)


## Getting Started

### Frontend

First, install the dependencies:

```bash
cd client
npm install
```

Create a `.env` file in the client directory with the following:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```

Run the frontend development server:

```bash
npm run dev
```

The frontend will be available at [http://localhost:3000](http://localhost:3000).

### Backend

```bash
cd server
npm install
```

Create a `.env` file in the server directory with the following:

```bash
PORT=8080
MONGODB_URI=mongodb://localhost:27017/job-recommendation
JWT_SECRET=your_jwt_secret
SENDGRID_API_KEY=gmail
EMAIL_FROM=your_app_password
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
S3_BUCKET_NAME=your_s3_bucket
NODE_ENV=development
CLIENT_DOMAIN=http://localhost:3000
BACKEND_DOMAIN=http://localhost:8080
```

Run the backend server:

```bash
npm run dev
```

The API will be available at [http://localhost:8080](http://localhost:8080).

## Tech Stack

### Frontend
- **Next.js 14**: React framework for client-side application
- **TailwindCSS**: For styling and UI components
- **ShadcnUI**: For pre-built accessible components

### Backend
- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **TypeScript**: Type-safe JavaScript
- **MongoDB**: NoSQL database with Mongoose ODM
- **TensorFlow.js**: Machine learning for job recommendations
- **PDF Parser**: Extracting text from PDF resumes
- **Mammoth**: Parsing DOCX resume files
- **Multer**: File middleware
- **SendGrid**: Email Service

### Authentication & Authorization
- **JWT**: Token-based authentication (Access token)

### Deployment
- **Vercel**: Frontend hosting
- **AWS EC2**: Backend hosting

### CI/CD
- Uses **PM2** for backend process management
- **AWS EC2** as VM
- **Vercel** for frontend deployment

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Create a new user account
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/verify-email` - Verify user email

### User Profile
- `GET /api/v1/user/profile` - Get user profile
- `PUT /api/v1/user/profile` - Update user profile

### Resume
- `POST /api/v1/resume/upload` - Upload and parse resume
- `GET /api/v1/resume` - Get user resume

### Jobs
- `GET /api/v1/jobs` - Get all available jobs
- `GET /api/v1/jobs/matched` - Get jobs matched to the user's resume

## Architecture

The application follows a clean architecture pattern:
- **Routes**: Define API endpoints and apply middleware
- **Controllers**: Handle HTTP requests/responses and orchestrate service calls
- **Services**: Implement business logic and interact with data models
- **Models**: Define data structure and database schema

## Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy with the default settings

### Backend (AWS EC2)
1. Launch an EC2 instance
2. Install Node.js and PM2
3. Clone the repository and install dependencies
4. Configure environment variables
5. Use PM2 to run the application in production

