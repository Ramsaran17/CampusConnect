# CampusConnect

A campus community platform that helps students connect, share resources, exchange useful items, discover events, and communicate with each other in one place.

## Overview

CampusConnect is a full-stack MERN web application designed for a college campus community.

The platform brings several common student needs into one organized application. Students can exchange useful items, share academic resources, discover campus events, report lost or found belongings, and communicate with other students.

### What Students Can Do

- Buy, sell, or give away useful items through the Campus Marketplace
- Share and access academic resources
- Discover campus events
- Create Lost & Found posts
- Communicate with other students
- Save Marketplace listings and Academic Resources for later
- Upload images and file attachments where supported

---

## Features

### 🔐 Authentication

- User registration and login
- JWT-based authentication
- Password hashing using bcrypt
- Protected routes
- User profile management

### 🛍️ Campus Marketplace

Students can buy, sell, or give away useful items within the campus community.

- Create listings
- Upload item images
- Set a price or mark an item as free
- Specify category and condition
- Add item location
- View listing details
- Edit own listings
- Delete own listings
- Contact sellers through messaging
- Save listings for later

### 📚 Academic Resources

Students can share and access useful academic materials.

Supported resource types include:

- Previous Year Papers
- Notes
- Study Material
- Assignments
- Other academic resources

Users can:

- Upload academic resources
- View resource details
- Open shared resources
- Edit their own resources
- Delete their own resources
- Save useful resources for later

### 📅 Events

Students can create and discover campus events.

- Event title and description
- Organizer information
- Date and time
- Location
- Category
- Event image
- Registration link
- Edit own events
- Delete own events

### 🔎 Lost & Found

A dedicated section for reporting and finding lost belongings.

Users can:

- Create Lost or Found posts
- Add item details
- Specify location and date
- Add contact information
- Upload an image
- Edit their own posts
- Delete their own posts

### 💬 Messaging

Students can communicate directly with each other.

- Start conversations
- View conversations
- Send messages
- Send image attachments
- Send file attachments
- Access shared attachments

### 🔖 Saved Items

Users can save useful content for later.

Currently supported:

- Marketplace listings
- Academic Resources

Saved items can be:

- Viewed from the Saved Items page
- Opened directly from the saved list
- Removed from the saved list

### 🔒 Authorization & Validation

The backend verifies ownership before allowing users to modify or delete their content.

Protected operations include:

- Marketplace edit/delete
- Academic resource edit/delete
- Event edit/delete
- Lost & Found edit/delete

Major creation forms also include validation for required and invalid input.

### ☁️ Media Management

Cloudinary is used for media storage where required.

Supported media includes:

- Profile images
- Marketplace images
- Event images
- Lost & Found images
- Message attachments

### ❌ Error Handling

- API error handling
- Invalid form handling
- Resource-not-found handling
- Unauthorized operation handling
- Dedicated 404 page for unknown routes

---

## Tech Stack

### Frontend

- React
- React Router
- JavaScript
- CSS
- Vite

### Backend

- Node.js
- Express.js
- JavaScript

### Database

- MongoDB
- Mongoose

### Authentication & Security

- JWT
- bcrypt
- Environment variables

### Media Storage

- Cloudinary

---

## Architecture

```text
                    CampusConnect
                         │
                         ▼
                ┌─────────────────┐
                │ React Frontend  │
                │     + Vite      │
                └────────┬────────┘
                         │
                      REST API
                         │
                         ▼
                ┌─────────────────┐
                │ Node.js +       │
                │ Express.js      │
                └────────┬────────┘
                         │
              ┌──────────┴──────────┐
              ▼                     ▼
      ┌──────────────┐      ┌──────────────┐
      │   MongoDB    │      │  Cloudinary  │
      │   Database   │      │ Media Storage│
      └──────────────┘      └──────────────┘
```

---

## Project Structure

```text
dummy-project/
│
├── client/
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   │   ├── cloudinary.js
│   │   └── db.js
│   │
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   │
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
```

---

## Getting Started

### Prerequisites

Make sure the following are installed:

- Node.js
- npm
- MongoDB
- Git

You will also need a Cloudinary account for media uploads.

### 1. Clone the Repository

```bash
git clone https://github.com/Ramsaran17/dummy-project.git
cd dummy-project
```

### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

### 3. Install Backend Dependencies

Open another terminal and run:

```bash
cd server
npm install
```

---

## Environment Variables

Create a `.env` file inside the `server` directory.

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=8080
```

Never commit the `.env` file or expose your credentials publicly.

---

## Running the Application

### Start the Backend

From the `server` directory:

```bash
npm start
```

For development with automatic restart:

```bash
npm run dev
```

### Start the Frontend

Open another terminal:

```bash
cd client
npm run dev
```

The React frontend communicates with the Node.js/Express backend through REST APIs.

---

## Security

CampusConnect follows several security practices:

- Passwords are hashed using bcrypt
- Authentication uses JWT
- Protected backend routes verify the authenticated user
- Users can only modify or delete their own content
- Sensitive credentials are stored using environment variables
- `.env` files are excluded from Git
- MongoDB credentials are not hardcoded
- Cloudinary credentials are not hardcoded
- JWT secrets are not hardcoded

---

## Validation & Error Handling

The application handles common error scenarios including:

- Missing required fields
- Invalid form submissions
- Invalid Marketplace prices
- Unauthorized edit/delete requests
- Missing resources
- Failed API requests
- Invalid routes

A dedicated 404 page is displayed when users navigate to an unknown route.

---

## Project Highlights

CampusConnect demonstrates practical full-stack development concepts including:

- React component architecture
- REST API development
- MongoDB data modeling
- JWT authentication
- Backend authorization
- CRUD operations
- Cloud-based media storage
- File uploads
- User-to-user messaging
- Saved content
- Form validation
- Error handling
- Responsive UI development

---

## Future Scope

Possible future improvements include:

- Real-time notifications
- Advanced search and filtering
- Additional moderation tools
- Improved campus-wide discovery
- Production deployment and monitoring

---

## License

This project was developed as a college full-stack web development project.
