
# Task Management Application

## 📌 Short Description
A simple and efficient **Task Management Application** where users can create, edit, delete, and reorder tasks using drag-and-drop. Tasks are categorized into **To-Do, In Progress, and Done**, and changes are instantly saved in the database. The app ensures real-time synchronization across all devices.

## 🚀 Live Demo
🔗 [Live Application](#) *(Update with actual deployment link)*

## 📦 Dependencies
This project uses the following dependencies:

```
@tanstack/react-query: ^5.66.9
axios: ^1.7.9
firebase: ^11.3.1
lightningcss: ^1.29.1
localforage: ^1.10.0
match-sorter: ^8.0.0
react: ^19.0.0
react-dom: ^19.0.0
react-icons: ^5.5.0
react-router-dom: ^7.2.0
react-toastify: ^11.0.3
sort-by: ^1.2.0
sweetalert2: ^11.17.2
```

## 🛠️ Installation Steps

Follow these steps to set up the project locally:

```sh
# Clone the repository
git clone https://github.com/your-username/task-management-app.git
cd task-management-app

# Install dependencies
npm install

# Set up Firebase Authentication
# Create a .env file and add your Firebase credentials
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id

# Start the development server
npm run dev
```

## 🛠️ Technologies Used

This project is built using:

- **Frontend:** React, React Router, TailwindCSS, DaisyUI, React Icons
- **State Management:** React Query
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Express.js API)
- **Authentication:** Firebase Authentication (Google Sign-In)
- **Real-Time Updates:** WebSockets / MongoDB Change Streams
- **UI Notifications:** React Toastify, SweetAlert2

## 📜 Features

✅ **Google Authentication** - Secure sign-in with Firebase.
✅ **Task CRUD Operations** - Add, edit, delete, and reorder tasks.
✅ **Drag & Drop** - Easily move tasks between categories.
✅ **Real-Time Sync** - Automatic updates across devices.
✅ **Responsive UI** - Works seamlessly on mobile & desktop.

---




