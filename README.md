# DevOpsHub – Redis Message Collection System

## 📌 Project Overview

DevOpsHub is a Dockerized web application system designed to collect user messages and track website visits using Redis.

The project consists of two web applications that share a single Redis database, managed and connected using Docker Compose.

## 🎯 Project Objectives

- Collect messages from users through a web form.
- Store submitted messages in Redis.
- Track the total number of page visits.
- Display statistics through a dashboard.
- Use Docker to containerize both applications.
- Use Docker Compose to manage all services.

## 🏗️ System Architecture

The system consists of three services:

| Service | Role | Description |
|---|---|---|
| App 1 | Message Collector | Collects messages and tracks page visits. |
| App 2 | Dashboard | Displays total messages and visit counts. |
| Redis | Database | Stores messages and visit counters. |

### How It Works

1. A user opens App 1.
2. App 1 increments the visit counter in Redis.
3. The user submits a message.
4. App 1 stores the message in a Redis List.
5. App 2 retrieves the total number of messages and visits from Redis.
6. The dashboard displays the updated statistics.

## 🛠️ Technologies Used

- Docker
- Docker Compose
- Redis
- Python / Flask (if used)
- HTML
- CSS
- JavaScript
- Git & GitHub

## 📂 Project Structure

```text
DevOpsHub/
│
├── app1/
│   ├── Dockerfile
│   └── Application Files
│
├── app2/
│   ├── Dockerfile
│   └── Application Files
│
├── docker-compose.yml
├── README.md
└── .gitignore
```

## ⚙️ Prerequisites

Before running the project, make sure you have installed:

- Docker Desktop
- Git
- A web browser

## 🚀 How to Run the Project

1. Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_LINK
```

2. Navigate to the project directory:

```bash
cd DevOpsHub
```

3. Build and start all services:

```bash
docker compose up --build -d
```

4. Check the running services:

```bash
docker compose ps
```

## 🌐 Application Access

- App 1 – Message Collector: http://localhost:3000
- App 2 – Dashboard: http://localhost:3001

## 💾 Data Persistence

Redis uses persistent storage through a Docker volume to ensure that collected messages and visit counts remain available even after containers are restarted or removed.

## 👨‍💻 Project Information

**Course:** Cloud Computing and DevOps Engineering

**Project:** Midterm Project – Message Queue + Visit Counter with Redis

**Instructor:** M.Sc. Abdelhakim Rashid

**Students:** Add your name and ID here.
