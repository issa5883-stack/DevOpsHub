# DevOpsHub – Redis Message Collection System

## 📌 Project Overview

DevOpsHub is a Dockerized web application system designed to collect user messages and track website visits using Redis.

The system consists of two web applications (App 1 and App 2) that share a single Redis database. All services are managed and connected using Docker Compose.

## 🎯 Project Objectives

- Collect messages from users through a web application.
- Store submitted messages in Redis.
- Track the total number of visits to App 1.
- Display statistics through a dashboard in App 2.
- Containerize both applications using Docker.
- Manage all services using Docker Compose.
- Use Redis as a shared database between applications.

## 🏗️ System Architecture

The system consists of three main services:

| Service | Role | Description |
|---|---|---|
| App 1 | Message Collector | Collects user messages and tracks website visits. |
| App 2 | Dashboard | Displays the total number of messages and visits. |
| Redis | Database | Stores messages and visit counters. |

### How It Works

1. A user opens App 1 (Message Collector).
2. App 1 increments the visit counter in Redis.
3. The user submits a message through the application.
4. App 1 stores the submitted message in a Redis List.
5. App 2 retrieves the total number of messages and visits from Redis.
6. The dashboard displays the updated statistics.

## 🛠️ Technologies Used

- JavaScript (Node.js)
- Docker
- Docker Compose
- Redis
- HTML
- CSS
- Git
- GitHub

## 📂 Project Structure

```text
DevOpsHub/
│
├── app1/
│   ├── app.js
│   ├── Dockerfile
│   └── package.json
│
├── app2/
│   ├── app.js
│   ├── Dockerfile
│   ├── package.json
│   └── .dockerignore
│
├── docker-compose.yml
└── README.md
```

## ⚙️ Prerequisites

Before running the project, make sure you have installed:

- Docker Desktop
- Git
- A web browser

## 🚀 How to Run the Project

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_LINK
```

### 2. Navigate to the Project Directory

```bash
cd DevOpsHub
```

### 3. Build and Start All Services

```bash
docker compose up --build -d
```

### 4. Check Running Containers

```bash
docker compose ps
```

### 5. View Container Logs (Optional)

```bash
docker compose logs
```

## 🌐 Application Access

After successfully starting all services, open your browser and access:

| Application | URL |
|---|---|
| App 1 – Message Collector | http://localhost:3000 |
| App 2 – Dashboard | http://localhost:3001 |

## 💾 Data Persistence

Redis uses a Docker volume for persistent data storage.

This ensures that collected messages and visit counters remain available even after containers are restarted or removed, as long as the Docker volume is not deleted.

## 🛑 Stopping the Project

To stop and remove the running containers and network:

```bash
docker compose down
```

To remove the containers, network, and associated volumes:

```bash
docker compose down -v
```

**Warning:** The `-v` option deletes the Redis persistent data stored in the Docker volume.

## 👨‍💻 Project Information

- **Course:** Cloud Computing and DevOps Engineering
- **Project:** Midterm Project – Message Queue and Visit Counter with Redis
- **Instructor:** M.Sc. Abdelhakim Rashid
- **Students:** issa 5883,muad 3719.

---

**DevOpsHub – Redis Message Collection System**