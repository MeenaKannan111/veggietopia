CREATE TABLE admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Example insert statement without hashed password (not recommended for production)
INSERT INTO admins (name, email, password) VALUES
('Admin User', 'admin@veggietopia.com', 'your_password_here');
