Resume Review Agent
The Resume Review Agent is a web application that enables users to upload their resumes, extract text using AWS Textract, and receive personalized, structured career feedback powered by generative AI (Google Gemini). The system leverages a modular, agent-based architecture where each component is responsible for a specific task, ensuring scalability, maintainability, and ease of integration.

Architecture Overview
The system is built using a modular, agent-based approach, comprising the following components:

Frontend (React + Tailwind CSS):
Provides a responsive and modern user interface for users to log in, upload resumes, and view AI-generated feedback. The UI also includes options for Google OAuth and email-based authentication.

Backend (Node.js + Express):
Handles user authentication (using Passport.js with JWT and Google OAuth), file upload endpoints, and acts as an intermediary between the frontend and external services (AWS Textract for resume extraction and Google Gemini for AI analysis).

AI Service (Google Gemini API):
An external generative AI service that analyzes the extracted resume text and returns structured career guidance feedback in JSON format.

Database (MongoDB):
Stores user details, including credentials for local sign-ups and Google OAuth information.

Rationale for Architectural Choices
Modular, Agent-based Architecture:
Each component acts as an autonomous agent (UI, backend, AI service) communicating via well-defined APIs. This design simplifies maintenance and scaling, as changes in one module don’t heavily impact others.

Modern Frontend with React:
Ensures a responsive, dynamic user interface that enhances user experience.

Node.js & Express:
Provides a lightweight and scalable backend that efficiently handles authentication, file uploads, and API routing.

Passport.js with JWT and Google OAuth:
Supports both local and third‑party authentication, allowing flexibility and secure stateless sessions using JWT.

AWS Textract:
Reliably extracts text from resumes in multiple formats, forming the basis for AI analysis.

Google Gemini API:
Leverages cutting-edge generative AI capabilities to provide high-quality, structured career guidance without the overhead of hosting large models.

Setup Instructions
Prerequisites
Node.js (v14+)
npm (or yarn)
MongoDB instance (local or cloud-based)
AWS account with Textract access
Google Cloud account with access to Google Gemini API and OAuth 2.0 credentials
Environment Variables
Create a .env file in the project root with the following variables:

env
Copy
Edit
PORT=8000
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_REGION=your_aws_region
Installation
Clone the repository:

bash
Copy
Edit
git clone https://github.com/your-username/resume-review-agent.git
cd resume-review-agent
Install Backend Dependencies:

bash
Copy
Edit
npm install
Install Frontend Dependencies:

Navigate to your frontend directory (if separate) and run:

bash
Copy
Edit
cd frontend
npm install
Start MongoDB:
Ensure your MongoDB instance is running locally or configure your cloud connection.

Running the Application
Backend:
From the project root, run:

bash
Copy
Edit
npm run dev
This starts your Node.js server on the port specified in .env (default: 8000).

Frontend:
In the frontend directory, run:

bash
Copy
Edit
npm start
Your React app should now run (e.g., on port 5173).

Google OAuth Setup in Google Cloud Console
Create a Project and Enable OAuth Consent Screen:

In Google Cloud Console, create a new project.
Go to APIs & Services > OAuth consent screen and set it up as “External.”
Create OAuth Credentials:

Navigate to APIs & Services > Credentials.
Click Create Credentials > OAuth 2.0 Client ID.
Choose Web application as the application type.
In Authorized redirect URIs, add:
bash
Copy
Edit
http://localhost:8000/api/v1/auth/google/callback
Update .env File:
Add your Google OAuth credentials to your .env file:

env
Copy
Edit
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
Usage Details
User Authentication:
Users can log in via email/password or through Google OAuth. After a successful Google sign-in, the backend generates a JWT and redirects the user to the frontend home page with the token in the URL.

Token Handling:
The frontend extracts the token from the URL (using React Router’s useSearchParams or similar) and stores it (e.g., in localStorage) to attach to subsequent API calls via the Authorization header.

Resume Upload and Analysis:
Authenticated users can upload a resume. The backend uses AWS Textract to extract text and then sends this text to the Google Gemini API for AI analysis. The resulting structured feedback is returned and displayed on the frontend.

Protected Routes:
Routes that require authentication are protected using a JWT strategy (via Passport.js). The JWT middleware validates the token and attaches the user object to the request.

File Structure Overview
go
Copy
Edit
/resume-review-agent
├── .env
├── package.json
├── app.js                   // Main Express server file
├── /models
│   └── User.js              // User schema
├── /middlewares
│   ├── passport-jwt.js      // JWT strategy configuration
│   ├── passport-google.js   // Google OAuth strategy configuration
│   └── authenticationMiddleware.middleware.js  // Middleware to check JWT
├── /routes
│   ├── authRoutes.js        // Routes for login, Google OAuth
│   ├── resumeRoute.js       // Protected route for resume uploads
│   └── healthCheckRoute.js  // Health check endpoint
├── /controllers
│   └── authController.controller.js  // Controller for login, logout, etc.
└── /frontend
    ├── package.json
    ├── /src
        ├── App.js           // Main React app
        ├── /components
        │   └── GoogleLoginButton.jsx  // Google sign-in button component
        └── /Feature
            └── Auth
                └── userSlice.js       // Redux slice for auth state
Contributing
Contributions are welcome! Feel free to open issues or submit pull requests for improvements.

License
This project is licensed under the MIT License.
