# 📝 Task Manager Web Application

Full-stack task manager app using **Angular + Bootstrap** for frontend and **Spring Boot + MySQL + JWT** for backend.

### 🔗 Project Links
- 🔥 Frontend: [GitHub - Frontend](https://github.com/JananiUpeksha/Task-Manager-Frontend)
- 🚀 Backend: [GitHub - Backend](https://github.com/JananiUpeksha/Task-Manager)

---
## ✨ Features

- ✅ Create, view, update, delete tasks
- 🔍 Filter by task status (TO_DO, IN_PROGRESS, DONE)
- 🔐 JWT-based authentication with login/register
- 💾 MySQL database integration
- 🎨 Responsive UI with Bootstrap
---

## ⚙️ Technologies

- **Frontend**: Angular, Bootstrap, RxJS
- **Backend**: Spring Boot, Spring Security, JWT, MySQL
- **Dev Tools**: Maven
---

## 🚀 Getting Started

### 🔙 Backend

1. Update `application.properties` with your DB credentials.
2. Run with Maven:

```bash
cd backend
./mvnw spring-boot:run
```

### 🔜 Frontend

```bash
cd frontend
npm install
ng serve
```

Visit: `http://localhost:4200`
---

## 🔐 Auth Overview

- `POST /task/api/v1/user/signup` → Register new user
- `POST /task/api/v1/user/signin` → Returns JWT token
- Use token in headers:  
  `Authorization: Bearer <token>`
---



Runs backend, frontend, and MySQL in containers.
---

## 🧪 API Overview

- `GET /task/api/v1/task` – All tasks  
- `POST /task/api/v1/task` – Create task  
- `PUT /task/api/v1/task/{id}` – Update task  
- `DELETE /task/api/v1/task/{id}` – Delete task  
---
