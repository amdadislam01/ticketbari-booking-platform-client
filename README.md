# 🎫 TicketBari

## Online Ticket Booking Platform (Full Stack)


🔗 **Live Demo:**
[https://ticketbari-booking-platform-client.vercel.app/](https://ticketbari-booking-platform-client.vercel.app/)

---

## 📄 Project Summary

**TicketBari** is a full-stack **Online Ticket Booking Platform** built with the **MERN stack**. The platform allows users to discover, book, and manage travel tickets, including **Bus, Train, Launch, and Plane** services.

The system follows **role-based access control** and supports three distinct user roles:

* **User**
* **Vendor**
* **Admin**

Each role has its own dashboard and permissions, making the system scalable and production-ready.

---

## 🎯 Project Objectives

* Develop a real-world ticket booking system
* Implement secure authentication & authorization
* Apply modern UI/UX principles
* Integrate online payment gateway
* Maintain clean, modular, and scalable code architecture

---

## 👥 User Roles & Features

### 👤 User

* Secure authentication using Firebase
* Browse and search available tickets
* Filter tickets by category, date, and price
* Book tickets with Stripe payment
* View booking history
* Fully responsive design

### 🧑‍💼 Vendor

* Vendor authentication & authorization
* Add, update, and manage tickets
* View ticket sales overview
* Vendor dashboard analytics

### 🛡 Admin

* Admin authentication
* Manage users and vendors
* Approve or block vendors
* Monitor platform activity
* Revenue & booking analytics with charts

---

## 🛠 Technology Stack

### 🔹 Frontend (Client)

| Category         | Technology / Package      | Purpose                     |
| ---------------- | ------------------------- | --------------------------- |
| Framework        | React 19                  | Frontend UI development     |
| Routing          | React Router              | Client-side routing         |
| Styling          | Tailwind CSS              | Utility-first CSS framework |
| State Management | TanStack React Query      | Server-state management     |
| HTTP Client      | Axios                     | API communication           |
| Authentication   | Firebase                  | User authentication         |
| Animation        | Framer Motion             | Smooth UI animations        |
| Charts           | Recharts                  | Dashboard analytics         |
| Forms            | React Hook Form           | Form handling & validation  |
| Date Picker      | React Datepicker          | Date selection              |
| UI Components    | Swiper                    | Sliders & carousels         |
| Icons            | Lucide React, React Icons | Icon library                |
| Alerts           | SweetAlert2               | Alert modals                |
| Notifications    | React Toastify            | Toast notifications         |

---

### 📦 Frontend NPM Packages

| Package                | Version   |
| ---------------------- | --------- |
| react                  | ^19.2.0   |
| react-dom              | ^19.2.0   |
| react-router           | ^7.10.1   |
| @tanstack/react-query  | ^5.90.12  |
| axios                  | ^1.13.2   |
| firebase               | ^12.6.0   |
| tailwindcss            | ^4.1.17   |
| @tailwindcss/vite      | ^4.1.17   |
| motion (framer-motion) | ^12.23.25 |
| recharts               | ^3.5.1    |
| swiper                 | ^12.0.3   |
| react-hook-form        | ^7.68.0   |
| react-datepicker       | ^8.10.0   |
| lucide-react           | ^0.556.0  |
| react-icons            | ^5.5.0    |
| sweetalert2            | ^11.26.3  |
| react-toastify         | ^11.0.5   |

---

## 🖥 Backend (Server)

### 🔹 Backend Technology Stack

| Category       | Technology / Package | Purpose                |
| -------------- | -------------------- | ---------------------- |
| Runtime        | Node.js              | JavaScript runtime     |
| Framework      | Express.js           | REST API development   |
| Database       | MongoDB              | NoSQL database         |
| Authentication | Firebase Admin SDK   | Token verification     |
| Payment        | Stripe               | Online payment gateway |
| Security       | JWT                  | Route protection       |
| Environment    | dotenv               | Environment variables  |
| Middleware     | cors                 | Cross-origin access    |

---

### 📦 Backend NPM Packages

| Package        | Version |
| -------------- | ------- |
| express        | ^5.2.1  |
| mongodb        | ^7.0.0  |
| firebase-admin | ^13.6.0 |
| stripe         | ^20.0.0 |
| cors           | ^2.8.5  |
| dotenv         | ^17.2.3 |

---

## 🔐 Security & Authentication

* Firebase Authentication
* JWT-based route protection
* Role-based authorization
* Secure API endpoints
* Environment variable protection

---

## 💳 Payment Integration

* Stripe secure checkout
* Real-time payment validation
* Booking & payment history tracking

---

## 📊 Dashboard & Analytics

* Total revenue overview
* Tickets sold & added
* Vendor & user activity
* Interactive charts using Recharts

---

## 📁 Project Architecture

```
Client (React)
├── Components
├── Pages
├── Routes
├── Hooks
├── Context API
└── UI Modules

Server (Node + Express)
├── Routes
├── Controllers
├── Middleware
├── Database (MongoDB)
└── Utilities
```

---

## ⚙️ Installation Guide

### Client Setup

```bash
git clone <client-repository-url>
cd ticketbari-client
npm install
npm run dev
```

### Server Setup

```bash
git clone <server-repository-url>
cd ticketbari-server
npm install
npm run start
```

> ⚠️ Configure `.env` files with Firebase, MongoDB, and Stripe credentials.

---

## 🚀 Future Enhancements

* Seat selection system
* Ticket cancellation & refund
* Email ticket confirmation
* Multi-language support
* Mobile application version

---

## 👨‍💻 Developer

**MD. Amdad Islam**
🎓 Software Engineering Student
💻 MERN Stack Developer
📍 Dhaka, Bangladesh

