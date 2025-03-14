# Docs Sphere Backend

## Overview

Welcome to **Docs-Sphere**, a collaborative document editing platform that empowers users to create, edit, and share documents in real-time. Whether you're working on a team project or drafting personal notes, Docs-Sphere provides a rich set of features to enhance your writing experience. it is designed to handle user authentication, document management, document edit with multiple users in real-time, public and private documents,and email verification. It utilizes TypeScript for type safety and Sequelize as an ORM for database interactions. The server is structured to handle asynchronous operations gracefully, ensuring a smooth user experience.

## Features- 

- Document creation, retrieval, updating, and deletion
- Document Editor For Text formating, text highlighting, image insertion, undo, redo, multi color text option, etc.
- realtime document edit functionality
- Error handling with async/await
- Input validation using express-validator
- Email notifications using Nodemailer
- users have public and private documents
- User registration and email verification
- User login and token-based authentication
- Password reset functionality
- multiusers can edit same document


## Technologies Used

# Backend

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
- **socket.io** for realtime communication


# Client

- **React**: JavaScript library for building user interfaces.
- **Vite**: Build tool that provides a fast development environment.
- **Redux**: State management library for managing application state.
- **Draft.js**: Rich text editor framework for React.
- **react-transition-group**: smooth transition and animations


## Getting Started

To get started with Docs-Sphere, follow these steps:

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (for the database)

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Gaganshuyadav/Docs-Sphere.git

2. **Install Dependencies**:

  # For the backend
  
  cd main-server

  npm install

  # For Client

  cd client

  npm install

3. **Set Up Environment Variables**: 

 To run the application, you need to set up environment variables for both the server and client. 
 
 Create a `.env` file in the `server` directory and add the following variables:

  ### Server Environment Variables

   NODE_ENV=development

   HOST=localhost

   PORT=3000

   DATABASE_URL=your_database_url
   
   USER=your_database_user
   
   DATABASE=your_database_name
   
   PASSWORD=your_database_password
   
   DB_HOST=your_database_host
   
   DB_PORT=your_database_port
   
   JWT_SECRET=your_jwt_secret
   
   VITE_SERVER=http://localhost:5173
   
   FROM_EMAIL=your_email@example.com
   
   PASSWORD_EMAIL=your_email_password
   

  ### Client Environment Variables

   VITE_SERVER = http://localhost:3000
   

## Acknowledgments

Thanks to all the contributors and libraries that made this project possible. We hope you enjoy using Docs-Sphere as much as we enjoyed building it!














