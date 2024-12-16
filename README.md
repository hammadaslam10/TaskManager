# Task Management System

This project is a **Task Management System** that allows users to create, read, update, and delete (CRUD) tasks. The system includes both **backend** and **frontend** components. The backend is built using **Node.js, Express.js, and MongoDB**, while the frontend is built with **Next.js 14.1**.

## 📋 **Table of Contents**
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Backend](#backend)
  - [Endpoints](#endpoints)
  - [How to Run](#how-to-run-backend)
  - [Seed Data](#seed-data)
- [Frontend](#frontend)
  - [Features](#features)
  - [How to Run](#how-to-run-frontend)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)

---

## 📌 **Project Overview**
The Task Management System allows users to:
- **Create Tasks**: Users can create new tasks by specifying the title, description, status, and due date.
- **View Tasks**: All tasks are displayed in a table with filtering, sorting, and pagination options.
- **Edit Tasks**: Users can update task details.
- **Delete Tasks**: Users can delete tasks, with a confirmation dialog before deletion.
- **Status Filter and Search**: Filter tasks by status and search tasks by title or description.

---

## 🛠️ **Technologies Used**

**Backend**
- Node.js
- Express.js
- MongoDB (with Mongoose ORM)

**Frontend**
- Next.js 14
- Redux Toolkit for state management
- Ant Design (UI components)
- Lottie animations for loading indicators

---

## 📁 **Project Structure**
```
project-root/
├── src
│   ├── app
│   │   └── tasks
│   │       ├── create
│   │       │    └── page.js
│   │       ├── [id]
│   │       │    └── edit
│   │       │        └── page.js
│   ├── components
│   │   ├── EditTaskForm.js
│   │   ├── TaskForm.js
│   │   └── TaskList.js
│   └── redux
│       └── features
│           └── taskmanagementApi.js
├── public
│   └── lottie
│       └── loader.json
├── utils
│   └── seed.js
├── models
│   └── taskschema.js
├── controllers
│   └── taskcontroller.js
├── routes
│   └── taskroute.js
├── server.js
└── README.md
```

---

## 🔥 **Backend**

### 📚 **Endpoints**
| **Method** | **Endpoint**       | **Description**           |
|------------|-------------------|--------------------------|
| **GET**    | `/api/tasks`       | Get all tasks             |
| **POST**   | `/api/tasks`       | Create a new task         |
| **PUT**    | `/api/tasks/:id`   | Update a task by ID       |
| **DELETE** | `/api/tasks/:id`   | Delete a task by ID       |

### 🏃 **How to Run (Backend)**
1. **Install Dependencies**
   ```bash
   npm install
   ```
2. **Set Up Environment Variables**
   Create a `.env` file in the root of the project with the following:
   ```env
  PORT=4000
  
  DB_URI=mongodb://localhost:27017/MyCo
   ```
3. **Run the Backend Server**
   ```bash
   npm run dev
   ```
   The backend will be available at **http://localhost:4000**.

### 📦 **Seed Data**
To seed the database with sample tasks, use the following command:
```bash
node utils/seed.js
```
This will create **40 sample tasks** in the MongoDB database.

---

## 💻 **Frontend**

### 🚀 **Features**
- **Task List**: View, search, filter, and sort tasks.
- **Create Task**: Form to create a new task.
- **Edit Task**: Form to edit an existing task.
- **Delete Task**: Delete a task with a confirmation dialog.
- **Lottie Loader**: Lottie animations for loading state on list, create, and edit pages.

### 🏃 **How to Run (Frontend)**
1. **Install Dependencies**
   ```bash
   npm install
   ```
2. **Set Up Environment Variables**
   Create a `.env.local` file in the root of the **src** directory with the following:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:4000
   ```
3. **Run the Frontend Server**
   ```bash
   npm run dev
   ```
   The frontend will be available at **http://localhost:3000**.

---

## 🔐 **Environment Variables**
The following environment variables are required:

| **Variable**       | **Description**                           |
|-------------------|-------------------------------------------|
| `PORT`             | Port for the backend server (default 5000)|
| `DB_URI`           | MongoDB connection string                 |
| `NEXT_PUBLIC_API_URL` | The URL of the backend API             |

---

## 📜 **Scripts**
| **Script**         | **Command**           | **Description**           |
|-------------------|---------------------|--------------------------|
| **Run Backend**    | `npm run server`      | Runs the backend server   |
| **Run Frontend**   | `npm run dev`         | Runs the Next.js frontend |
| **Run Seed Script**| `node utils/seed.js`  | Seeds the database        |

---

## ✨ **Example Usage**
**1. Create a Task**
```json
POST /api/tasks
{
  "title": "Design Landing Page",
  "description": "Create a beautiful landing page for the app.",
  "status": "pending",
  "dueDate": "2024-12-31"
}
```
**2. Update a Task**
```json
PUT /api/tasks/:id
{
  "title": "Update API Endpoints",
  "description": "Add new endpoints for user management.",
  "status": "in-progress",
  "dueDate": "2024-12-25"
}
```
**3. Delete a Task**
```http
DELETE /api/tasks/:id
```





