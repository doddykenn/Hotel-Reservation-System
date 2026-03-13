# Hotel Reservation System

[![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A modern, full-featured Vue 3 application for managing hotel reservations with role-based access control, built with security and accessibility in mind.

## Table of Contents

- [Features](#-features)
- [Demo](#-demo)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Security](#-security)
- [Documentation](#-documentation)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [Contact & Support](#-contact--support)
- [License](#-license)

##  Features

-  Role-based authentication (Admin & Guest)
-  Interactive dashboard with real-time statistics
-  Full CRUD operations for reservations
-  Protected routes with navigation guards
-  Fully responsive design
-  Accessibility compliant (WCAG 2.1)
-  Modern and intuitive UI/UX
-  Fast performance with Vite


### Demo

| Role  | Username | Password   | Permissions           |
|-------|----------|------------|-----------------------|
| Admin | `admin`  | `admin123` | Full CRUD access      |
| Guest | `guest`  | `guest123` | View & Create only    |

>  **Note:** These are demo credentials for testing purposes only.

##  Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.x or higher) - [Download](https://nodejs.org/)
- **npm** (v8.x or higher) or **yarn** (v1.22.x or higher)
- A modern web browser (Chrome, Firefox, Safari, or Edge)

##  Quick Start

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   
   Navigate to `http://localhost:5173/`

### Production Build

```bash
npm run build
npm run preview
```

##  Tech Stack

- Vue 3 (Composition API)
- Vue Router 4
- Pinia 2
- Vite 5

### Available Commands

| Command           | Description                      |
|-------------------|----------------------------------|
| `npm run dev`     | Start development server         |
| `npm run build`   | Build for production             |
| `npm run preview` | Preview production build locally |

##  Project Structure

```
src/
├── components/      # Navbar, ReservationForm, ReservationTable
├── views/           # LoginView, AdminDashboard, GuestDashboard
├── router/          # Routes with guards
├── stores/          # auth.js, reservations.js
├── composables/     # Reusable logic
├── utils/           # Helper functions
└── assets/          # Styles and images
```

##  Security

- XSS Prevention (Vue auto-escaping)
- Route guards for authentication
- Input validation
- No sensitive data in storage

##  Documentation

- `SECURITY.md` - Threat modeling
- `USER_PERSONAS.md` - Design decisions
- `DIAGRAMS.md` - Architecture diagrams

##  Troubleshooting

### Common Issues

**Dependencies installation fails**
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Build errors**
```bash
# Ensure you're using the correct Node.js version
node --version  # Should be v16.x or higher
```

For more issues, please check our [Issues page](https://github.com/doddykenn/Hotel-Reservation-System/issues).

##  Contact & Support

###  Development Team

| Name | Role | Contact |
|------|------|----------|
| **Kenny Doddy** | Lead Developer | [GitHub](https://github.com/doddyken) • [Email](mailto:doddykenny540@gmail.com) |
| **Manzi Tony** | Developer | [GitHub](https://github.com/manziton) • [Email](mailto:manziton24@gmail.com) |

###  Project Links

- **Repository**: [Hotel Reservation System](https://github.com/doddykenn/Hotel-Reservation-System)

###  Resources

- [Vue.js Documentation](https://vuejs.org/)
- [Vue Router Documentation](https://router.vuejs.org/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built using Vue 3 for Web Tech**