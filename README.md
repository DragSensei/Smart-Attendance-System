# Wajha Attendance System — Feature-Based Architecture

This project implements a **Feature-Based Folder Structure**, categorizing code by the specific function or feature it serves rather than generic file types. This ensures high modularity, easy refactoring, testability, and clean dependency boundaries.

---

## The Core Architecture (One-Way Data Flow)

The codebase is divided into three primary categories:

```
                  ┌──────────────┐
                  │   App (Red)  │  ◄── Application Entry, Layouts & Routing
                  └──────┬───────┘
                         │
             ┌───────────┴───────────┐
             ▼                       ▼
   ┌───────────────────┐   ┌───────────────────┐
   │  Features (Green) │──►│   Shared (Blue)   │
   │  (Domain Modules) │   │ (Global Utilities)│
   └───────────────────┘   └───────────────────┘
```

1. **Shared (`src/shared`)**:
   - Contains global, utility-level code used across the entire application (e.g. `components`, `drizzle`, `hooks`, `lib`, `server`, `data`).
   - **Rule**: Shared code can **only** import from other shared files or external packages. It **cannot** import from Features or App.

2. **Features (`src/features`)**:
   - Contains self-contained business logic folders (e.g. `attendance`, `users`, `auth`).
   - Replicates relevant subdirectories:
     - `components/`: UI specific to that feature
     - `schemas/`: Data validation or shape definitions
     - `server/`: Backend logic or database interactions exclusive to that feature
     - `hooks/`: Feature-specific hooks
   - **Rule**: Each feature can import from `Shared`, or from within its own folder. It **cannot** import from other features or from `App`.

3. **App (`src/app`)**:
   - The application's entry point (e.g. pages, routing, layouts).
   - Acts as the glue importing from both `Shared` and `Features` to assemble the UI.

---

## Directory Tree

```
src/
├── app/                                # App Layer (Red)
│   ├── attendance/
│   │   └── page.tsx                    # Attendance dashboard page
│   ├── layout.tsx                      # Root layout
│   └── page.tsx                        # Home page
│
├── features/                           # Features Layer (Green)
│   ├── attendance/
│   │   ├── components/
│   │   │   ├── AttendanceTable.tsx
│   │   │   └── CheckInButton.tsx
│   │   ├── hooks/
│   │   │   └── useAttendance.ts
│   │   ├── schemas/
│   │   │   └── attendance.schema.ts
│   │   ├── server/
│   │   │   └── attendance.service.ts
│   │   └── index.ts
│   │
│   ├── auth/
│   │   ├── components/
│   │   │   └── LoginForm.tsx
│   │   ├── schemas/
│   │   │   └── auth.schema.ts
│   │   ├── server/
│   │   │   └── auth.service.ts
│   │   └── index.ts
│   │
│   └── users/
│       ├── components/
│       │   └── UserCard.tsx
│       ├── hooks/
│       │   └── useUser.ts
│       ├── schemas/
│       │   └── user.schema.ts
│       ├── server/
│       │   └── user.service.ts
│       └── index.ts
│
└── shared/                             # Shared Layer (Blue)
    ├── components/
    │   └── Button.tsx
    ├── data/
    │   └── constants.ts
    ├── drizzle/
    │   └── db.ts
    ├── hooks/
    │   └── useDebounce.ts
    ├── lib/
    │   └── utils.ts
    ├── server/
    │   └── api.ts
    └── index.ts
```

---

## Boundary Enforcement via ESLint

Architecture boundaries are strictly enforced using [`eslint-plugin-boundaries`](https://github.com/javierbrea/eslint-plugin-boundaries) in `eslint.config.mjs`:

- **Elements Configured**:
  - `shared`: `src/shared/**`
  - `feature`: `src/features/*/**` (captures feature name)
  - `app`: `src/app/**`
- **Rules Enforced**:
  - `shared` $\rightarrow$ `shared` only
  - `feature` $\rightarrow$ `shared` + `same feature` only
  - `app` $\rightarrow$ `shared` + `features`

### Checking Boundaries
To run the linter and enforce boundary rules across the codebase:

```bash
npm run lint
```

If an unauthorized import is introduced (e.g. `shared` importing a feature, or a feature importing another feature), ESLint will immediately flag it with a compile-time boundary error.
