# MediPipeline – Webhook Processing System

A webhook-driven task processing system that receives external events, processes them through pipelines, and delivers results to subscribers.

Think of it as a simplified version of Zapier focused on healthcare use cases.

---

##  Features

- Receive events via Webhooks
- Process events using Pipelines (Actions)
- Deliver results to multiple Subscribers
- Retry logic for failed deliveries
- Job tracking (status, attempts, history)
- Authentication using JWT
- Dockerized setup
- Simple Dashboard UI

---

##  How It Works

1. External system sends a webhook
2. A Job is created
3. Worker picks the job
4. Executes the Pipeline Action
5. Sends result to all Subscribers
6. Retries on failure (up to 3 times)

---

##  Tech Stack

- Node.js (TypeScript)
- PostgreSQL
- Drizzle ORM
- Docker & Docker Compose
- Vitest (Testing)

---

##  Project Structure

### API Layer (`src/api`)
- Receives incoming webhooks
- Exposes REST APIs for Pipelines, Jobs, and Subscribers
- Handles authentication using JWT
- Validates requests and creates jobs

### Job & Data Layer (`src/db`, `drizzle`)
- PostgreSQL database
- Stores jobs, pipelines, subscribers, retries, and history
- Uses Drizzle ORM for type-safe queries

### Worker Layer (`src/workers`)
- Background worker process
- Polls for pending jobs
- Executes pipeline actions
- Handles retry logic
- Updates job status

### Actions Layer (`src/actions`)
- Isolated and reusable pipeline actions
- Examples:
  - alertHighVitals
  - medicationReminderHandler
  - labResultReceived

### Frontend / Dashboard (`public`)
- Simple HTML/CSS dashboard
- Pages: Login, Jobs, Pipelines, Subscribers
- Communicates with backend via REST APIs

### Middleware & Utilities
- `src/middleware` – Authentication
- `src/utils` – Shared helpers

---

##  Setup

### Run with Docker
```bash
docker compose up --build
```

### API runs on
```
http://localhost:8080
```

---

##  Authentication

All requests require a JWT token in headers:

```
Authorization: Bearer <token>
```

---

##  API Endpoints

### Webhooks
- POST `/webhooks/:pipelineId`

### Pipelines
- GET `/pipelines`
- POST `/pipelines`
- PUT `/pipelines/:id`
- DELETE `/pipelines/:id`

### Jobs
- GET `/jobs`
- GET `/jobs/:id`
- GET `/jobs/:id/deliveries`

### Subscribers
- GET `/subscribers`
- POST `/subscribers`
- DELETE `/subscribers/:id`

---

##  Actions

### 1. alertHighVitals
Detects abnormal patient vitals.

**Input**
```json
{
  "event": "vitals_recorded",
  "patientName": "Ahmad",
  "heartRate": 130,
  "bloodPressure": 180
}
```

**Output**
```json
{
  "patient": "Ahmad",
  "alerts": ["High heart rate", "High blood pressure"],
  "status": "critical"
}
```

---

### 2. medicationReminderHandler
Creates a medication reminder.

**Input**
```json
{
  "event": "medication_time",
  "patientName": "majd",
  "medication": "Insulin",
  "time": "08:00"
}
```

**Output**
```json
{
  "type": "medication_reminder",
  "message": "Reminder: majd should take Insulin at 08:00",
  "patient": "majd",
  "medication": "Insulin",
  "scheduledTime": "08:00",
  "createdAt": "2026-03-23T18:19:49.444Z"
}
```

---

### 3. labResultReceived
Creates a report when lab results are received.

**Input**
```json
{
  "event": "lab_result_ready",
  "patientName": "Ahmad",
  "test": "Glucose",
  "value": 250,
  "unit": "mg/dL"
}
```

---

##  Retry Logic
- Each subscriber is retried up to 3 times
- If all retries fail → job marked as failed
- If all succeed → job marked as completed

---

##  Job Lifecycle
```
pending → processing → completed / failed
```

---

##  Running Tests
```bash
npm run test
```

---

##  Author

Majd Marabe

