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
DATABASE_URL="postgresql://neondb_owner:npg_tMZJl3V0Ehqc@ep-falling-lake-adieem2k-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
DIRECT_URL="postgresql://neondb_owner:npg_tMZJl3V0Ehqc@ep-falling-lake-adieem2k.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

GITHUB_ID="Ov23liZxCHE8ORqoFjt7"
GITHUB_SECRET="5ca3ae6a2f59696fb06cb299b48513459b61a87d"

NEXTAUTH_SECRET=Ssp@1501
NEXTAUTH_URL=http://localhost:3000

EMAIL_USER=srutiwork8@gmail.com
EMAIL_PASS=bhtt zlko caur gkxg

CRON_SECRET=InterviewTracker2026

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
