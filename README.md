🧾 AI-Powered Complaint Management System
<p align="center"> <b>Smart Complaint Handling with AI Assistance & Admin Workflow</b> </p>
🧠 Overview

A full-stack web application that allows users to submit complaints and interact with an AI assistant for guidance.
The system leverages AI to automatically categorize complaints and generate draft responses, while maintaining an admin-controlled approval workflow with email notifications.

🚀 Live Demo
🌐 Frontend:
https://wabi-user-management.netlify.app/
⚙️ Backend API:
(Add your Render/Server link here)
✨ Key Features
🤖 AI Capabilities
AI-powered chatbot for user support and guidance
Automatic complaint categorization
AI-generated draft responses
👤 User Features
Submit complaints without registration
Track complaint status
Interact with AI assistant
👨‍💼 Admin Features
Secure admin-only access
Review and manage complaints
Edit and approve AI-generated responses
Send final responses via email
Dashboard for monitoring complaints
📧 Notification System
Email notifications sent after admin approval
🛠️ Tech Stack
Category	Technology
Frontend	React, Tailwind CSS, JavaScript
Backend	Node.js, Express.js
Database	MySQL
Other Tools	AI API, Nodemailer, Axios, dotenv, CORS
⚙️ Local Development Setup
1️⃣ Clone Repository
git clone https://github.com/Heydaraa/Complaint-Support.git
cd Complaint-Support
2️⃣ Backend Setup
cd backend
npm install

Create a .env file inside backend/:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_database_name
DB_PORT=3306

PORT=5000
JWT_SECRET=your_secret_key

# AI API
AI_API_KEY=your_api_key

# Email Configuration
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password

Run backend:

npm start
3️⃣ Database Setup (MySQL)
Start MySQL (XAMPP or Workbench)
Create database:
CREATE DATABASE your_database_name;
Import or create required tables
4️⃣ Frontend Setup
cd ../frontend
npm install
npm run dev
▶️ Running the Application
Start MySQL server
Start backend server
Start frontend development server
Open browser:

👉 http://localhost:5173

🔄 System Workflow
User → Submit Complaint / Chat with AI
        ↓
AI → Categorize + Generate Draft
        ↓
Admin → Review & Approve
        ↓
System → Send Email Response
📁 Project Structure
Complaint-Support/
│── frontend/     # React client
│── backend/      # Node.js + Express API
📌 Notes
Ensure environment variables are correctly configured
Email service requires valid credentials
AI features depend on API availability
📄 License

This project is developed for educational and internship purposes.
