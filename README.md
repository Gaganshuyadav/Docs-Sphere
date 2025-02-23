# Docs Sphere Backend

## Overview

This project is a backend server built with Node.js and Express, designed to handle user authentication, document management, document edit with multiple users in real-time, public and private documents,and email verification. It utilizes TypeScript for type safety and Sequelize as an ORM for database interactions. The server is structured to handle asynchronous operations gracefully, ensuring a smooth user experience.

## Features

- User registration and email verification
- User login and token-based authentication
- Password reset functionality
- Document creation, retrieval, updating, and deletion
- Error handling with async/await
- Input validation using express-validator
- Email notifications using Nodemailer
- realtime document edit functionality
- users have public and private documents
- multiusers can edit same document

## Technologies Used

- **Node.js**: JavaScript runtime for building the server
- **Express**: Web framework for Node.js
- **TypeScript**: Superset of JavaScript for type safety
- **Sequelize**: ORM for PostgreSQL database
- **PostgreSQL**: Database for storing user and document data
- **JWT (JSON Web Tokens)**: For secure authentication
- **Nodemailer**: For sending emails
- **dotenv**: For environment variable management
- **bcrypt**: For password hashing
- **express-validator**: For input validation
- **cors**: For enabling Cross-Origin Resource Sharing
- **socket.io** for realtime communication