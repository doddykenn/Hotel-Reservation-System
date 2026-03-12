# 🏨 Hotel Reservation Web App

A Vue 3 application for managing hotel reservations with role-based access control.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:5173/`

## 🔑 Demo Credentials

**Admin:** `admin` / `admin123` (Full CRUD access)  
**Guest:** `guest` / `guest123` (View & Create only)

## ✨ Features

- 🔐 Role-based authentication (Admin & Guest)
- 📊 Dashboard with statistics
- ✏️ CRUD operations for reservations
- 🛣️ Protected routes with navigation guards
- 📱 Responsive design
- ♿ Accessibility compliant (WCAG 2.1)

## 🛠️ Tech Stack

- Vue 3 (Composition API)
- Vue Router 4
- Pinia 2
- Vite 5

## 📁 Project Structure

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

## 👥 User Roles

| Feature | Admin | Guest |
|---------|-------|-------|
| View Reservations | ✅ | ✅ |
| Create Reservation | ✅ | ✅ |
| Edit Reservation | ✅ | ❌ |
| Delete Reservation | ✅ | ❌ |
| View Statistics | ✅ | ❌ |

## 🔒 Security

- XSS Prevention (Vue auto-escaping)
- Route guards for authentication
- Input validation
- No sensitive data in storage

## 📚 Documentation

- `SECURITY.md` - Threat modeling
- `USER_PERSONAS.md` - Design decisions
- `DIAGRAMS.md` - Architecture diagrams

## 📝 Available Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 📞 Contact & Support

### 👨‍💻 Development Team

**Kenny Doddy**
- 📧 Email: [doddykenny540@gmail.com](mailto:doddykenny540@gmail.com)
- 🐙 GitHub: [@doddyken](https://github.com/doddyken)

**Manzi Tony**

### 🔗 Project Links

- 📦 **Repository**: [Hotel Reservation System](https://github.com/doddykenn/Hotel-Reservation-System)
- 🐛 **Issues**: [Report a Bug](https://github.com/doddykenn/Hotel-Reservation-System/issues)
- 💡 **Discussions**: [Ask Questions](https://github.com/doddykenn/Hotel-Reservation-System/discussions)

### 📖 Resources

- [Vue.js Documentation](https://vuejs.org/)
- [Vue Router Documentation](https://router.vuejs.org/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)

---

## 📄 License

MIT

---

**Built with Vue 3 for Web Technologies Course**
