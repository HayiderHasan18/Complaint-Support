🧾 AI-Powered Complaint Management System

A full-stack web application that enables users to submit complaints and interact with an AI assistant for guidance. The system includes intelligent complaint categorization, draft response generation, and an admin-controlled workflow with email notifications upon approval.

🚀 Features
🤖 AI-powered chatbot for user queries and complaint assistance
📝 Users can submit complaints without registration
🧠 AI automatically categorizes complaints
✍️ AI-generated draft responses for complaints
👨‍💼 Admin-only access for managing complaints
✅ Admin approval workflow before sending responses
📧 Email notifications sent to users after admin approval
📊 Admin dashboard for managing and tracking complaints
🔍 Complaint status tracking and management
⚡ RESTful API built with Node.js & Express
🗄️ MySQL database integration
🛠️ Tech Stack

Frontend:

React / HTML / Tailwind CSS / JavaScript

Backend:

Node.js
Express.js

Database:

MySQL

Other:

AI API integration
Nodemailer (email service)
Axios
dotenv
CORS
⚙️ Local Setup Instructions
1. Clone the repository
git clone https://github.com/HayiderHasan18/Complaint-Support.git
cd your-repo-name
2. Backend Setup
cd backend
npm install

Create a .env file in the backend folder:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_database_name
DB_PORT=3306

PORT=5000
JWT_SECRET=your_secret_key

# AI API (if used)
AI_API_KEY=your_api_key

# Email configuration
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password

Run the backend:

npm start
3. Database Setup (MySQL)
Start MySQL using XAMPP or MySQL Workbench
Create database:
CREATE DATABASE your_database_name;
Import or create required tables based on your schema
4. Frontend Setup
cd ../frontend
npm install
npm run dev
▶️ Running the Application
Start MySQL server
Start backend server
Start frontend application
Open browser:
http://localhost:5173
📌 System Workflow
Users can:
Ask questions via AI chat
Submit complaints
AI system:
Categorizes complaints
Generates draft responses
Admin:
Reviews complaints
Edits/approves responses
Sends final response via email
📄 License

This project is developed for educational and internship purposes.
