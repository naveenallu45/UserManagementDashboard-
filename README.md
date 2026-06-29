# User Management Dashboard

A production-ready admin dashboard for managing organization users. Built with React, Vite, and Tailwind CSS — designed to feel like an internal tool you'd find at Stripe, Linear, or Notion.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)

## Overview

This dashboard provides a complete user management interface with search, filtering, sorting, pagination, and full CRUD operations. Data is fetched from the [JSONPlaceholder Users API](https://jsonplaceholder.typicode.com/users) and enriched locally with department assignments and status labels.

The UI follows a corporate design system — minimal, professional, and responsive across desktop, tablet, and mobile viewports.

## Features

- **Responsive layout** — Collapsible sidebar, sticky navbar, table on desktop, cards on mobile
- **Analytics cards** — Total users plus department breakdowns with trend badges
- **Real-time search** — Debounced search across name, email, and department
- **Advanced filtering** — Modal-based filters with apply, reset, and cancel
- **Column sorting** — Ascending/descending sort on all key fields
- **Pagination** — Configurable page sizes (10, 25, 50, 100)
- **CRUD operations** — Add, view, edit, and delete users with API integration
- **Toast notifications** — Success and error feedback with auto-dismiss
- **Loading states** — Skeleton loaders instead of plain text spinners
- **Empty states** — Clear messaging when filters return no results
- **Error handling** — Graceful API failure recovery with retry option
- **Accessibility** — Semantic HTML, ARIA labels, keyboard navigation, focus states

## Architecture

The app follows a layered structure that keeps UI, business logic, and data access separate:

```
┌─────────────────────────────────────────┐
│              App.jsx                    │
│  (state orchestration, useMemo chains)  │
├─────────────────────────────────────────┤
│           Components Layer              │
│  layout / dashboard / users / shared    │
├─────────────────────────────────────────┤
│            Hooks Layer                  │
│              useUsers()                 │
├─────────────────────────────────────────┤
│             API Layer                   │
│           userService.js                │
├─────────────────────────────────────────┤
│            Utils Layer                  │
│   helpers / validators / constants      │
└─────────────────────────────────────────┘
```

Business logic for filtering, sorting, and pagination lives in pure utility functions. The `useUsers` hook encapsulates all API interactions and local state mutations. Components remain focused on rendering and user interaction.

## Folder Structure

```
src/
├── api/
│   └── userService.js          # Axios API client
├── hooks/
│   └── useUsers.js             # User data hook
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx
│   │   ├── Navbar.jsx
│   │   └── Header.jsx
│   ├── dashboard/
│   │   ├── StatsCards.jsx
│   │   └── Toolbar.jsx
│   ├── users/
│   │   ├── UserTable.jsx
│   │   ├── UserRow.jsx
│   │   ├── UserCard.jsx
│   │   ├── UserFormModal.jsx
│   │   ├── DeleteConfirmationModal.jsx
│   │   └── FilterModal.jsx
│   └── shared/
│       ├── Loader.jsx
│       ├── EmptyState.jsx
│       ├── ErrorAlert.jsx
│       ├── Pagination.jsx
│       └── Toast.jsx
├── utils/
│   ├── constants.js
│   ├── helpers.js
│   └── validators.js
├── tests/
│   ├── setup.js
│   ├── helpers.test.js
│   └── validators.test.js
├── App.jsx
├── main.jsx
└── index.css
```

## Installation

**Prerequisites:** Node.js 18+ and npm

```bash
# Clone the repository
git clone <repository-url>
cd usermanagementdashboard

# Install dependencies
npm install
```

## Running the Project

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

The dev server starts at `http://localhost:5173` by default.

## Assumptions

- **JSONPlaceholder limitations** — The API doesn't persist data. POST, PUT, and DELETE requests succeed but don't actually modify server-side records. Local state is updated optimistically after each operation.
- **Department field** — Not provided by the API. Departments are assigned deterministically based on user ID from a predefined list.
- **User status** — Active/Inactive status is assigned locally since the API doesn't expose this field.
- **Name parsing** — The API returns a single `name` field which is split into `firstName` and `lastName`.
- **Export button** — UI-only placeholder; no actual export functionality is implemented.

## Challenges

The trickiest part was making JSONPlaceholder feel like a real backend. Since it doesn't return departments or status fields, I had to normalize the data on the client side without making it obvious to the user that the data is synthetic. The department assignment uses a simple modulo approach so it's consistent across page loads.

Pagination combined with search and filters required careful state management — resetting to page 1 whenever any filter changes, while keeping the memoization chain efficient. I went back and forth on whether to debounce search or not; ended up adding a 300ms debounce to avoid re-filtering on every keystroke when the user list grows.

The responsive table-to-card transition was another consideration. On tablet, the table scrolls horizontally. On mobile, rows become individual cards. Getting the action buttons to feel touch-friendly without cluttering the card layout took a few iterations.

Modal accessibility (ESC to close, focus trapping, backdrop click) needed to be handled consistently across four different modals without over-abstracting into a generic modal component — kept each one self-contained since the requirements were slightly different per modal.

## Future Improvements

- Connect to a real backend with persistent storage
- Add role-based access control and authentication
- Implement actual CSV/Excel export
- Add bulk actions (select multiple users, bulk delete/update)
- User profile detail page with activity history
- Dark mode support
- Integration tests with React Testing Library
- Keyboard shortcut for search (⌘K hint is already in the navbar)

## Testing

Unit tests cover the core utility functions:

- `splitName` — Name parsing edge cases
- `filterUsers` — Search and filter combinations
- `sortUsers` — Ascending/descending sort
- `validateUserForm` — Form validation rules

```bash
npm test
```

## Deployment

### Vercel (recommended)

```bash
npm run build
npx vercel --prod
```

### Netlify

```bash
npm run build
# Deploy the dist/ folder
```

### Static hosting

```bash
npm run build
# Upload contents of dist/ to any static host (S3, GitHub Pages, etc.)
```

Build output goes to the `dist/` directory. No environment variables are required since the API endpoint is public.


