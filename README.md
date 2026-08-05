# Interview Tracker

A full-stack web application that helps job seekers manage and track their job applications, interview schedules, and hiring progress through a Kanban-style workflow.

## Live Demo

(Add your deployed Vercel URL here)

## Project Overview

Interview Tracker allows users to organize their job search process by tracking applications across different stages:

- Applied
- Interview
- Offer
- Rejected

The application provides a centralized dashboard to manage job applications, schedule interviews, view progress, and receive email reminders.

---

## Features

### Authentication

- User registration and login
- Secure user-specific application management

### Job Application Management

- Add new job applications
- Update application details
- Change application status
- Delete applications
- Track company, role, and application progress

### Kanban Board

- Visualize job applications using a Kanban workflow
- Manage applications based on hiring stages

### Interview Calendar

- View scheduled interviews
- Manage interview timelines

### Email Reminders

- Send interview reminder emails
- Nodemailer integration with Gmail SMTP

### Dashboard

- View application statistics
- Track recent job applications

---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend

- Next.js API Routes
- Node.js

### Database

- Prisma ORM
- PostgreSQL

### Authentication

- NextAuth.js

### Additional Libraries

- Nodemailer
- React Big Calendar
- Git and GitHub

---

## Installation and Setup

````

Navigate to the project folder:

```bash
cd interview-tracker
````

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

````env
DATABASE_URL=""
DIRECT_URL=""

GITHUB_ID=""
GITHUB_SECRET=""

NEXTAUTH_SECRET=
NEXTAUTH_URL=

EMAIL_USER=
EMAIL_PASS=

CRON_SECRET=

### Database Setup

Generate Prisma client:

```bash
npx prisma generate
````

Run database migrations:

```bash
npx prisma migrate dev
```

### Run the Application

Start the development server:

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

## Deployment

The application can be deployed using:

- Frontend: Vercel
- Database: PostgreSQL
- Email Service: Gmail SMTP

---

## Future Improvements

- AI-based resume and job description matching
- Automatic job application tracking
- Interview preparation dashboard
- Job analytics and insights
- Browser extension for saving job applications

---

## Author

Sruti Sudha Pradhan
