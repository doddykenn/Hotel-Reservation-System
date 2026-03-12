# System Diagrams
## Hotel Reservation Web App

---

## 1. System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser (Client)                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                    Vue 3 App                          │  │
│  │                                                        │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │  │
│  │  │   Router     │  │    Pinia     │  │ Components │ │  │
│  │  │  (Vue Router)│  │   (State)    │  │   (Views)  │ │  │
│  │  └──────┬───────┘  └──────┬───────┘  └─────┬──────┘ │  │
│  │         │                  │                 │        │  │
│  │         └──────────────────┴─────────────────┘        │  │
│  │                           │                            │  │
│  │         ┌─────────────────┴─────────────────┐         │  │
│  │         │                                     │         │  │
│  │    ┌────▼─────┐                      ┌───────▼────┐   │  │
│  │    │  Auth    │                      │Reservations│   │  │
│  │    │  Store   │                      │   Store    │   │  │
│  │    └──────────┘                      └────────────┘   │  │
│  │                                                        │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                               │
└───────────────────────────────────────────────────────────────┘

Components:
- Vue Router: Navigation and route guards
- Pinia Stores: Centralized state management
- Auth Store: User authentication and role management
- Reservations Store: CRUD operations for bookings
- Views: LoginView, AdminDashboard, GuestDashboard
- Components: Navbar, ReservationTable, ReservationForm
```

---

## 2. User Flow Diagram

### Admin User Flow:
```
     START
       │
       ▼
  ┌─────────┐
  │  Login  │
  │  Page   │
  └────┬────┘
       │
       ▼
  Enter Credentials
  (admin/admin123)
       │
       ▼
   ┌─────────┐
   │ Validate│
   └────┬────┘
        │
    ┌───┴───┐
    │Valid? │
    └───┬───┘
        │
    ┌───┴────┐
   NO│       │YES
    │        │
    ▼        ▼
  Error   Admin
  Message Dashboard
           │
    ┌──────┴──────┐
    │             │
    ▼             ▼
View Stats    View Table
    │             │
    │      ┌──────┴──────┬──────────┐
    │      │             │          │
    │      ▼             ▼          ▼
    │   Create        Edit      Delete
    │   Booking     Booking    Booking
    │      │            │          │
    │      ▼            ▼          ▼
    │   Fill Form   Modify    Confirm
    │      │         Form        │
    │      ▼            │         │
    │   Submit      Update       │
    │      │            │         │
    │      └────────────┴─────────┘
    │                   │
    └───────────────────┘
                        │
                        ▼
                    Logout
                        │
                        ▼
                      END
```

### Guest User Flow:
```
     START
       │
       ▼
  ┌─────────┐
  │  Login  │
  │  Page   │
  └────┬────┘
       │
       ▼
  Enter Credentials
  (guest/guest123)
       │
       ▼
   ┌─────────┐
   │ Validate│
   └────┬────┘
        │
    ┌───┴───┐
    │Valid? │
    └───┬───┘
        │
    ┌───┴────┐
   NO│       │YES
    │        │
    ▼        ▼
  Error    Guest
  Message Dashboard
           │
    ┌──────┴──────┐
    │             │
    ▼             ▼
View Info    View My
Message   Reservations
    │             │
    └──────┬──────┘
           │
           ▼
      Book Room
           │
           ▼
      Fill Form
      (Name, Room,
       Dates)
           │
           ▼
       Validate
           │
      ┌────┴────┐
      │  Valid? │
      └────┬────┘
           │
      ┌────┴────┐
     NO│        │YES
       │        │
       ▼        ▼
    Error    Submit
    Message     │
       │        │
       └────────┘
                │
                ▼
          See Booking
          in Table
                │
                ▼
             Logout
                │
                ▼
              END
```

---

## 3. Threat Model Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    THREAT MODEL                              │
└─────────────────────────────────────────────────────────────┘

ASSETS:                    THREATS:                MITIGATIONS:
┌──────────────┐          ┌──────────────┐       ┌──────────────┐
│ User         │◄─────────┤ XSS Attack   │       │ Vue Auto     │
│ Credentials  │          │              │──────►│ Escaping     │
└──────────────┘          └──────────────┘       └──────────────┘
                                                  
┌──────────────┐          ┌──────────────┐       ┌──────────────┐
│ Reservation  │◄─────────┤ Unauthorized │       │ Router       │
│ Data         │          │ Access       │──────►│ Guards       │
└──────────────┘          └──────────────┘       └──────────────┘
                                                  
┌──────────────┐          ┌──────────────┐       ┌──────────────┐
│ Session      │◄─────────┤ Session      │       │ Memory-only  │
│ State        │          │ Hijacking    │──────►│ Storage      │
└──────────────┘          └──────────────┘       └──────────────┘
                                                  
┌──────────────┐          ┌──────────────┐       ┌──────────────┐
│ Application  │◄─────────┤ Privilege    │       │ Role-Based   │
│ Logic        │          │ Escalation   │──────►│ Access       │
└──────────────┘          └──────────────┘       └──────────────┘

ATTACK VECTORS:
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│  1. Form Inputs ──────► XSS Injection                        │
│     Mitigation: Vue template escaping, no v-html             │
│                                                               │
│  2. URL Manipulation ──► Unauthorized Access                 │
│     Mitigation: Navigation guards, role checking             │
│                                                               │
│  3. Direct API Access ──► Data Breach                        │
│     Mitigation: Authentication checks, RBAC                  │
│                                                               │
│  4. Malicious Input ──► Injection Attacks                    │
│     Mitigation: Input validation, sanitization               │
│                                                               │
└─────────────────────────────────────────────────────────────┘

SECURITY LAYERS:
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│  Layer 1: Router Guards (Authentication Check)               │
│           ↓                                                   │
│  Layer 2: Role Verification (Authorization)                  │
│           ↓                                                   │
│  Layer 3: Input Validation (Data Integrity)                  │
│           ↓                                                   │
│  Layer 4: Vue Security (XSS Prevention)                      │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Component Structure Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         App.vue                              │
│                    (Root Component)                          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
                  ┌─────────────┐
                  │ Router View │
                  └──────┬──────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
    ┌─────────┐   ┌──────────┐   ┌──────────┐
    │ Login   │   │  Admin   │   │  Guest   │
    │ View    │   │Dashboard │   │Dashboard │
    └─────────┘   └────┬─────┘   └────┬─────┘
                       │               │
         ┌─────────────┼───────────────┤
         │             │               │
         ▼             ▼               ▼
    ┌─────────┐   ┌─────────┐   ┌─────────┐
    │ Navbar  │   │ Navbar  │   │ Navbar  │
    └─────────┘   └─────────┘   └─────────┘
                       │               │
         ┌─────────────┼───────────────┤
         │             │               │
         ▼             ▼               ▼
    ┌──────────────────────┐   ┌──────────────────────┐
    │ ReservationTable     │   │ ReservationTable     │
    │ (with edit/delete)   │   │ (read-only)          │
    └──────────┬───────────┘   └──────────────────────┘
               │
               ▼
    ┌──────────────────────┐
    │  ReservationForm     │
    │  (Modal)             │
    └──────────────────────┘

PROPS & EMITS:

Navbar:
  Props: title, username
  Emits: (none - uses store directly)

ReservationTable:
  Props: reservations, canEdit, canDelete
  Emits: edit, delete

ReservationForm:
  Props: reservation, isEdit
  Emits: close, submit

STORES:

┌──────────────┐         ┌──────────────────┐
│  Auth Store  │         │ Reservations     │
│              │         │ Store            │
│ - user       │         │                  │
│ - login()    │         │ - reservations   │
│ - logout()   │         │ - add()          │
│              │         │ - update()       │
│              │         │ - delete()       │
└──────────────┘         └──────────────────┘
```

---

## 5. Data Flow Diagram

```
USER INTERACTION → COMPONENT → STORE → STATE UPDATE → UI UPDATE

Example: Creating a Reservation

┌──────────┐
│  User    │
│  Clicks  │
│ "Book"   │
└────┬─────┘
     │
     ▼
┌─────────────────┐
│ GuestDashboard  │
│ openCreateModal()│
└────┬────────────┘
     │
     ▼
┌──────────────────┐
│ ReservationForm  │
│ (Modal Opens)    │
└────┬─────────────┘
     │
     ▼
┌──────────────────┐
│ User Fills Form  │
│ - Guest Name     │
│ - Room Type      │
│ - Dates          │
└────┬─────────────┘
     │
     ▼
┌──────────────────┐
│ User Submits     │
│ @submit.prevent  │
└────┬─────────────┘
     │
     ▼
┌──────────────────┐
│ Validate Input   │
│ (Client-side)    │
└────┬─────────────┘
     │
  ┌──┴──┐
  │Valid?│
  └──┬──┘
     │
  ┌──┴───┐
 NO│     │YES
   │     │
   ▼     ▼
Error  Emit
Msg   'submit'
       │
       ▼
┌──────────────────┐
│ Dashboard        │
│ handleSubmit()   │
└────┬─────────────┘
     │
     ▼
┌──────────────────┐
│ Reservations     │
│ Store            │
│ addReservation() │
└────┬─────────────┘
     │
     ▼
┌──────────────────┐
│ State Updated    │
│ reservations[]   │
└────┬─────────────┘
     │
     ▼
┌──────────────────┐
│ Vue Reactivity   │
│ Triggers Re-render│
└────┬─────────────┘
     │
     ▼
┌──────────────────┐
│ Table Updates    │
│ New Row Appears  │
└──────────────────┘
```

---

## 6. Authentication Flow Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                    AUTHENTICATION FLOW                        │
└──────────────────────────────────────────────────────────────┘

User Enters Credentials
         │
         ▼
    ┌─────────┐
    │ Login   │
    │ Form    │
    └────┬────┘
         │
         ▼
    Validate Input
    (not empty)
         │
    ┌────┴────┐
    │  Valid? │
    └────┬────┘
         │
    ┌────┴────┐
   NO│        │YES
     │        │
     ▼        ▼
   Error   Auth Store
   Message  login()
              │
         ┌────┴────┐
         │ Check   │
         │Credentials│
         └────┬────┘
              │
         ┌────┴────┐
         │ Match?  │
         └────┬────┘
              │
         ┌────┴────┐
        NO│        │YES
          │        │
          ▼        ▼
       Return   Set User
       false    in Store
          │        │
          │        ▼
          │    Set Role
          │    (admin/guest)
          │        │
          ▼        ▼
       Error    Success
       Message    │
          │       ▼
          │   Router
          │   Navigate
          │       │
          │   ┌───┴───┐
          │   │ Role? │
          │   └───┬───┘
          │       │
          │   ┌───┴────┐
          │   │        │
          │   ▼        ▼
          │ /admin  /guest
          │   │        │
          └───┴────────┘
                  │
                  ▼
            Dashboard
            Rendered
```

---

## 7. Route Protection Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                   ROUTE GUARD LOGIC                           │
└──────────────────────────────────────────────────────────────┘

User Navigates to Route
         │
         ▼
  ┌──────────────┐
  │ beforeEach   │
  │ Guard        │
  └──────┬───────┘
         │
         ▼
  Get Auth Store
         │
         ▼
  ┌──────────────────┐
  │ Route requires   │
  │ authentication?  │
  └──────┬───────────┘
         │
    ┌────┴────┐
   NO│        │YES
     │        │
     │        ▼
     │   ┌────────────┐
     │   │Authenticated?│
     │   └────┬───────┘
     │        │
     │   ┌────┴────┐
     │  NO│       │YES
     │    │        │
     │    ▼        ▼
     │ Redirect  Check
     │ /login    Role
     │            │
     │       ┌────┴────┐
     │       │ Role    │
     │       │ Match?  │
     │       └────┬────┘
     │            │
     │       ┌────┴────┐
     │      NO│       │YES
     │        │        │
     │        ▼        ▼
     │    Redirect  Allow
     │      /      Access
     │              │
     └──────────────┘
                    │
                    ▼
              Render View
```
