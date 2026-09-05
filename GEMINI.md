# Wajha Attendance System — AI Assistant & Developer Guidelines

Welcome to the **Wajha Attendance System** repository. This document defines the architectural rules, coding standards, and workflows for developers and AI assistants working in this codebase.

---

## 1. Project Overview

- **Project**: Wajha Attendance System (Smart Attendance Management)
- **Organization**: Wajha Technologies
- **Repository**: [DragSensei/Smart-Attendance-System](https://github.com/DragSensei/Smart-Attendance-System)

---

## 2. Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **UI & Runtime**: [React 19](https://react.dev/) & [Node.js](https://nodejs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Animation**: [Motion Dev](https://motion.dev/) (`motion/react`)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Architecture Enforcement**: [`eslint-plugin-boundaries`](https://github.com/javierbrea/eslint-plugin-boundaries)

---

## 3. Feature-Based Architecture & Import Boundaries

The repository strictly enforces a **Feature-Based Folder Structure** with a **one-way data flow**:

```
                  ┌──────────────┐
                  │   App (Red)  │  ◄── Pages, Routing & Layouts
                  └──────┬───────┘
                         │
             ┌───────────┴───────────┐
             ▼                       ▼
   ┌───────────────────┐   ┌───────────────────┐
   │  Features (Green) │──►│   Shared (Blue)   │
   │  (Domain Modules) │   │ (Global Utilities)│
   └───────────────────┘   └───────────────────┘
```

### Layer Responsibilities & Rules

1. **Shared Layer (`src/shared/`)**:
   - Contains global utilities, UI primitives, hooks, database clients, and constants.
   - Includes all **shadcn/ui primitives** under `src/shared/components/ui/` (`button.tsx`, `card.tsx`, `badge.tsx`, `input.tsx`).
   - **IMPORT RULE**: Can **ONLY** import from other `shared` files or external npm packages.
   - **FORBIDDEN**: Never import from `features` or `app`.

2. **Features Layer (`src/features/<feature-name>/`)**:
   - Contains self-contained business domain modules (e.g., `attendance`, `users`, `auth`).
   - Each feature encapsulates:
     - `components/`: Feature-specific UI
     - `schemas/`: Data validation and TypeScript interfaces
     - `server/`: Backend services, queries, and mutations
     - `hooks/`: Domain-specific React hooks
     - `index.ts`: Public API barrel export for the feature
   - **IMPORT RULE**: Can import from `shared` or within its **OWN** feature directory.
   - **FORBIDDEN**: Never import from other features (e.g., `attendance` cannot import from `users`) and never import from `app`.

3. **App Layer (`src/app/`)**:
   - Next.js App Router entry points (`page.tsx`, `layout.tsx`, subroutes like `attendance/page.tsx`, `globals.css`).
   - Composes UI by importing components and actions from both `shared` and `features`.
   - **IMPORT RULE**: Can import from `app`, `shared`, and any `feature`.

---

## 4. Path Aliases

Always use TypeScript path aliases configured in `tsconfig.json`:

- `@/app/*` $\rightarrow$ `src/app/*`
- `@/features/*` $\rightarrow$ `src/features/*`
- `@/shared/*` $\rightarrow$ `src/shared/*`
- `@/*` $\rightarrow$ `src/*`

---

## 5. UI & Animation Standards

1. **shadcn/ui Primitives**:
   - Place all reusable shadcn UI components in `src/shared/components/ui/`.
   - Always configure components via `components.json` with aliases pointing to `@/shared/*`.
2. **Motion Dev Animations**:
   - Use `motion` from `motion/react` for micro-interactions, page transitions, and interactive states (`whileHover`, `whileTap`, `initial`, `animate`).
   - Add `"use client"` directive when using interactive React hooks or Motion components.
3. **Typography & Styling**:
   - Use Tailwind CSS utility classes and CSS variables defined in `src/app/globals.css`.
   - Use `cn()` from `@/shared/lib/utils` for dynamic class merging (`clsx` + `tailwind-merge`).

---

## 6. Essential Commands

```bash
# Start development server
npm run dev

# Run ESLint boundary and code quality checks
npm run lint

# Compile and build Next.js production bundle
npm run build

# Start production server
npm run start
```

---

## 7. Developer & AI Assistant Checklist

Before committing or completing any task:
1. [ ] **Boundary Check**: Run `npm run lint` to guarantee that no cross-feature or reverse-layer imports were introduced.
2. [ ] **Type & Build Check**: Run `npm run build` to ensure TypeScript compilation, JSX validation, and Next.js page generation succeed.
3. [ ] **No Dead Code**: Avoid unused imports or variables; prefix intentionally unused variables with `_`.
