# Tutor Solution

## Project Overview
Tutor Solution is a responsive web platform that connects students with tutors. It allows users to register, log in (including Google authentication), search for tutors, add and manage tutorials, and book tutoring sessions. The app features a clean UI with light/dark mode toggle, mobile-friendly navigation, and secure authentication powered by Firebase. User data is stored in MongoDB for personalized and persistent experiences.

## Screenshot
![Tutor Solution Screenshot](./screenshot.png)  
*Replace the above path with your actual screenshot file path.*

## Technologies Used
- **Frontend:** React, React Router, Tailwind CSS, React Icons  
- **Backend:** Node.js, Express.js (API server)  
- **Authentication:** Firebase Authentication (Email/Password & Google OAuth)  
- **Database:** MongoDB  
- **State Management:** React Context API  

## Core Features
- User registration and login with Firebase  
- Google OAuth sign-in integration  
- Find and book tutors easily  
- Add, edit, and manage tutorials  
- Responsive design with mobile-friendly navigation  
- Light/Dark theme toggle  
- Secure and persistent user data storage with MongoDB  

## Dependencies
- react  
- react-router-dom  
- firebase  
- tailwindcss  
- react-icons  

## Getting Started

### Prerequisites
- Node.js installed  
- npm or yarn package manager  
- Firebase project setup with Authentication enabled  
- MongoDB database access  

### Installation

1. Clone the repository:  
   git clone https://github.com/your-username/tutor-solution.git
   cd tutor-solution
2. Install dependencies:
- npm install

4. Create a .env file in the root with your Firebase and MongoDB config:

REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_MONGODB_URI=your_mongodb_connection_string
5. Start the development server:
- npm start
6. Open your browser and navigate to http://localhost:3000

✔️✔️Live Project
https://tutor-book-server-site.vercel.app
