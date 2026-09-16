# Huntrify Platform - Folder & File Structure

This document outlines the standard architecture and folder structure for the Huntrify Platform.

## Root Directory (`D:\huntrify-web-app`)
```text
huntrify-web-app/
├── docs/                   # All project documentation, architecture, and theme rules
│   ├── platform_overview.md
│   ├── structure.md
│   └── theme.md
├── frontend/               # React + Vite + Tailwind CSS Application (The Platform)
└── backend/                # Backend API, Database models, and Services
```

## Frontend Structure (`frontend/`)
```text
frontend/
├── public/                 # Static assets (images, icons, fonts)
├── src/
│   ├── assets/             # Internal static assets
│   ├── components/         # Reusable UI components
│   │   ├── common/         # Buttons, Inputs, Cards, Modals, Loader (Shared)
│   │   ├── layout/         # Sidebar, Topbar, Footer, Dashboard wrappers
│   │   └── specialized/    # AI Chat widget, Skill Matcher UI, Video Verification
│   ├── features/           # Feature-based architecture (Logic + Components)
│   │   ├── auth/           # Login, 4-Layer Verification, Signup
│   │   ├── freelancer/     # Freelancer dashboard, tools hub, portfolio
│   │   ├── client/         # Client project management, hiring
│   │   ├── matchmaking/    # AI Matching, compatibility scores
│   │   └── admin/          # 11 Admin modules, user management, logs
│   ├── pages/              # Route level components mapping directly to URLs
│   │   ├── auth/           # /login, /register, /verify
│   │   ├── freelancer/     # /freelancer/dashboard, /freelancer/jobs
│   │   ├── client/         # /client/dashboard, /client/projects
│   │   └── admin/          # /admin/dashboard, /admin/payments
│   ├── hooks/              # Custom React hooks (e.g., useAuth, useAI)
│   ├── services/           # API calls, WebSocket connections (Real-time notifications)
│   ├── store/              # State management (Zustand/Redux)
│   ├── utils/              # Helper functions, formatting, validation rules
│   ├── styles/             # Global CSS and modular theme architecture
│   │   ├── theme.css       # Tailwind v4 variables, color palette, fonts
│   │   ├── components.css  # Reusable UI component classes (buttons, cards, inputs)
│   │   └── responsiveness.css # Layout wrappers, max-widths, media queries
│   ├── App.jsx             # Main App component & routing setup
│   ├── main.jsx            # React DOM entry point
│   └── index.css           # Imports all files from styles/
├── package.json            # Frontend dependencies
└── vite.config.js          # Vite configuration
```

## Backend Structure (`backend/`) *(Planned)*
```text
backend/
├── src/
│   ├── config/             # DB, Environment variables, third-party keys
│   ├── controllers/        # Route handlers and business logic entry
│   ├── models/             # Database schemas (User, Job, Match, Payment)
│   ├── routes/             # API route definitions
│   ├── services/           # Core business logic, AI interactions, Verification logic
│   ├── middlewares/        # Auth guards, Error handling, Rate limiting
│   └── utils/              # Helpers
├── app.js / server.js      # Entry point
└── package.json
```
