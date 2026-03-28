
CREATE DATABASE IF NOT EXISTS complaint_system;
USE complaint_system;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin') DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, email, password)
VALUES 
('admin1', 'admin@test.com', '11223344');


CREATE TABLE complaints (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255),
    contact VARCHAR(255) NOT NULL,
    issue VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('pending','open','resolved','closed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP NULL
);

INSERT INTO complaints (customer_name, contact, issue, message, status)
VALUES
('Abdela', 'abdela@email.com', 'Order Delay',
'My order has not arrived after 10 days.',
'resolved');

CREATE TABLE ai_analysis (
    id INT AUTO_INCREMENT PRIMARY KEY,
    complaint_id INT NOT NULL,
    category VARCHAR(100) DEFAULT 'general',
    urgency ENUM('low','medium','high','critical') DEFAULT 'low',
    confidence INT DEFAULT 0,
    summary TEXT,
    draft_response TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (complaint_id) 
    REFERENCES complaints(id) 
    ON DELETE CASCADE
);

INSERT INTO ai_analysis 
(complaint_id, category, urgency, confidence, summary)
VALUES
(1, 'Delivery', 'medium', 95,
'Customer reports delayed order delivery.');


CREATE TABLE ai_chat_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_type ENUM('customer','admin') NOT NULL,
    user_identifier VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO ai_chat_sessions (user_type, user_identifier)
VALUES ('admin', '1');


CREATE TABLE ai_chat_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_id INT NOT NULL,
    sender ENUM('customer','admin','ai') NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (session_id) 
    REFERENCES ai_chat_sessions(id) 
    ON DELETE CASCADE
);

INSERT INTO ai_chat_messages (session_id, sender, message)
VALUES 
(1, 'admin', 'Hello'),
(1, 'ai', 'How can I assist you today?');


CREATE TABLE settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(255),
    address VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    logo VARCHAR(255)
);

INSERT INTO settings (company_name, email)
VALUES ('WabiSkills', 'admin@wabiskills.com');


