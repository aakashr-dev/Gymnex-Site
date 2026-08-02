# GYMNEX — Enterprise Gym Management SaaS & Performance Hub

GYMNEX is a multi-role, high-performance gym management platform built with React, Vite, Tailwind CSS, Framer Motion, and Recharts.

---

## 📁 Repository Structure

The project is structured as a monorepo layout:

```
GYMNEX/
├── frontend/             # Production React + Vite SaaS application
│   ├── src/              # Application components, layouts, pages, & services
│   ├── index.html        # HTML entry point
│   ├── package.json      # Dependencies and scripts
│   ├── vite.config.js    # Vite configuration
│   └── tailwind.config.js# Design system tokens
├── backend/              # Placeholder for future backend API service
└── README.md             # Project documentation
```

---

## 🚀 Running the Frontend

All frontend commands must be executed from inside the `frontend/` directory:

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the local development server
npm run dev

# Build for production
npm run build
```

---

## 🎨 Feature Overview

- **Visual Identity**: Premium dark aesthetic with crimson (`#DC143C`) accents, atmospheric smoke textures, and editorial display typography (`Oswald` + `Inter`).
- **Public Marketing Site**: 13 standalone marketing pages (Home, Programs, Trainers, Membership, Classes, Branches, Facilities, Gallery, Events, Reviews, About, Corporate, Contact).
- **3 Role Dashboards**: Full interactive consoles for **Admin**, **Trainer**, and **Member** roles.
- **Interactive Role Switcher**: Floating toolbar for instant switching between user roles and public views during review.
