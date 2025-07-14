# CyberVista Dashboard

A full-stack cyber threat visualization dashboard built to demonstrate real-time data rendering, modern UI practices, and clean architectural separation using MVC. Developed using React, TypeScript, Node.js, SQL, and Express.

**Live Demo**: [CyberVista Dashboard](https://cybervista-dashboard.onrender.com/)

---

## About the Project

The CyberVista Dashboard was created as part of a front-end evaluation to showcase real-time threat data in a visually appealing and technically sound manner. It combines SQL data with animated, interactive front-end components to deliver an immersive user experience.

---

## System Architecture Overview

### 1. MVC Architecture

- **Model**: SQL-based schema including tables for device threats, MFA stats, and email attack logs.
- **View**: Modular React components built with Tailwind CSS and TypeScript.
- **Controller**: Express.js API routes fetching and transforming database records to serve JSON.

### 2. Routing & Data Flow

- Backend provides RESTful APIs (`/api/email-threats`, `/api/mfa-stats`, `/api/general`).
- Frontend uses `useFetcher()` to retrieve data dynamically and render respective charts.

### 3. Component-Based Development

- Organized by `pages/`, `components/ui/`, and `lib/` folders.
- Used custom hooks, animated tabs, type-safe props.
- Segmented UIs for Email, MFA, Malware, Firewall, and General insights.

### 4. UI Creativity and Animation

#### UI/UX Principles

- Dark and Light Modes for accessibility.
- Typography, icons, and spacing tailored for clarity and engagement.
- Color palettes ensure visual consistency.

#### Animations

- Motion One-powered transitions and hover effects.
- 3D animated card used in General Dashboard section.
- Interactive attacker avatars animate across countries in global map.

#### Data Visualization

- Charts used: Area, Radar, Bar, Heatmap, and Interactive Global Map.
- SVG arcs connect attackers to target zones in real-time.
- Labels show hours/days in simplified layout without visual clutter.

---

## Tech Stack

### Backend

- **Node.js + Express** – RESTful API serving SQL-based threat data
- **MySQL** – Hosted on AWS RDS for cloud-based data persistence
- **CORS + JSON Middleware** – Ensures secure and efficient API handling

### Frontend

- **React + Vite + TypeScript** – Modern, lightweight development stack
- **Tailwind CSS** – Utility-first CSS framework for responsive and consistent styling
- **Lucide Icons** – Clean, modern SVG icon set for visual clarity
- **Motion One** – Elegant animation library for declarative transitions
- **Dotted Map + Motion v12** – Used to render and animate an interactive global map showing real-time attack paths and geolocation overlays

---

## Tools Overview

| Technology                                                                                                            | Description            |
| --------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| ![React](https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61DAFB)                   | UI development         |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)     | Static typing          |
| ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) | Utility CSS            |
| ![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)           | Backend API            |
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)              | Runtime environment    |
| ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)                    | Relational database    |
| ![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=000)                   | App deployment         |
| ![Motion One](https://img.shields.io/badge/Motion_One-EF6C00?style=for-the-badge&logo=figma&logoColor=white)          | Declarative animations |
| ![Lucide](https://img.shields.io/badge/Lucide-000000?style=for-the-badge&logo=lucide&logoColor=white)                 | Icon system            |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)                       | Fast bundler           |

---

## Notable Features

### Interactive Global Map

- Animated attack lines and geolocation overlays.
- Country locations marked with attacker data and live paths.
- Avatar positioned on Texas to indicate origin, with arcs showing attackers’ travel routes.

### MFA Insights

- Dynamic area chart with dropdown for timeframe selection.
- Transitions rendered with smooth interpolation.

### Email Threat Visualization

- Data-driven pie chart with tooltip overlays.
- Cleanly segmented by malware, phishing, spam.

### Login Failure Analytics

- Interactive table with conditional color matrix.
- Complemented by a radar chart for monthly login trends.

### General Dashboard Overview

- 3D animated summary card for firewall blocks, login counts, patch statuses.
- Mobile-first and accessible layout.

---

## Design Highlights

- **Dark/Light Mode** for accessibility.
- **Grid System** enables clarity and responsiveness.
- **Whitespace Management** only SQL-backed data is visualized—no filler content.
- **Animations** enhance interactivity while maintaining performance.
- **Fully Responsive Design** ensures seamless experience across all devices, from desktops to mobile screens.

---

## Folder Structure

```
CyberVista_Dashboard
├── backend
│   └── index.js (Express server with DB connection and routes)
├── cyber-vista-ts
│   ├── src/
│   │   ├── components/ui/
│   │   ├── pages/
│   │   ├── lib/
│   │   └── App.tsx
│   └── tailwind.config.js
└── sql-dump.sql (MySQL schema/data)
```

---

## Deployment

- Frontend and backend are deployed using Render.
- SQL database hosted via AWS RDS.
- `.env` variables manage secrets for API keys and DB credentials.

---

## Running Locally

### Backend

cd backend
npm install
node server.js

### Frontend

cd cyber-vista-ts
npm install
npm run dev

- Ensure .env is properly configured with your AWS RDS MySQL credentials before starting the server.

## Contact

© 2025 - Cyber Vista | Built with ❤️ by [Kamal Ramesh]

- [GitHub](https://github.com/kamallakshmi)
- [LinkedIn](https://www.linkedin.com/in/kamal-ramesh/)
- [Medium](https://medium.com/@Kamalramesh)
