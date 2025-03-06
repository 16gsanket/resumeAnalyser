# Resume Review Agent 📄✨

A web application that analyzes resumes using AWS Textract and Google Gemini AI to provide structured career feedback. Built with a modular, agent-based architecture for scalability and maintainability.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Node Version](https://img.shields.io/badge/Node.js-v14%2B-green)
![React](https://img.shields.io/badge/React-TailwindCSS-blue)

## Features 🚀
- 📤 Resume text extraction using AWS Textract
- 🧠 AI-powered career feedback via Google Gemini
- 🔐 Secure authentication (JWT + Google OAuth)
- 📱 Responsive React frontend
- 🧩 Modular backend architecture

## Architecture Overview 🏗️
![System Architecture Diagram](https://via.placeholder.com/800x400.png?text=Architecture+Diagram+Placeholder)

### Core Components
- **Frontend**: React + Tailwind CSS
- **Backend**: Node.js/Express
- **AI Service**: Google Gemini API
- **Database**: MongoDB
- **Text Extraction**: AWS Textract

## Getting Started

### Prerequisites
- Node.js v14+
- MongoDB instance
- AWS Account (Textract access)
- Google Cloud Account (Gemini API + OAuth)

### Installation

1.⿻Clone the repository:
```bash
git clone https://github.com/your-username/resume-review-agent.git
cd resume-review-agent

```

2.🛠️Installing Dependencies:
 a)frontend
   ```bash
    cd frontend
    npm i
  ```
 a)backend
   ```bash
    cd backend
    npm i
  ```
3.Setting Environment Variables:
<br>
  a.)💻FRONTEND (.env)
  <br>
    ```bash
    VITE_GEMMINI_API_KEY =
    VITE_SERVER_URL =
    ```
  a.)🗄️BACKEND (.env)
  <br>
    ```bash
    PORT = 
    CORS_ORIGIN = *
    MONGODB_URI = mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.p2bcy.mongodb.net/<CLUSTER_NAME>?    
    retryWrites=true&w=majority&appName=Cluster0
    JWT_SECRET = 
    AWS_ACCESS_KEY_ID=
    AWS_SECRET_ACCESS_KEY=
    AWS_REGION=
    AWS_BUCKET_NAME=
GEMMINI_API_KEY =
SESSION_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
CLIENT_URL = 
SERVER_URL = 
    ```
<br>
3.Run Application
<br>
   a)frontend
   <br>
   ```bash
    cd frontend
    npm run dev
  ```
<br>
 a)backend
 <br>
   ```bash
    cd backend
    npm run dev
  ```
  <br>


  **NOTE : This Application is not based on Microservice Architecture, under load it might break⛓️‍💥**


