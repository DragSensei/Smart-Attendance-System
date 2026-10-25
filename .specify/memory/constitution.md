<!--
SYNC IMPACT REPORT
==================
Version Change: 0.0.0 (Template) → 1.0.0 (Ratified)
Modified Principles:
  - [PRINCIPLE_1_NAME] → I. Financial Data Integrity & Transactional Atomicity
  - [PRINCIPLE_2_NAME] → II. Exact Precision Monetary Arithmetic (EGP)
  - [PRINCIPLE_3_NAME] → III. Strict Role-Based Access Control (RBAC)
  - [PRINCIPLE_4_NAME] → IV. Cryptographic Unguessable Attendance Tokens
  - [PRINCIPLE_5_NAME] → V. Time-Windowed Attendance & Single Check-In Boundary Verification
Added Principles / Sections:
  - VI. Feature-Based Architecture & Import Boundaries
  - Core Quality & Security Standards
  - Development & Verification Workflow
Templates Requiring Updates:
  - ✅ .specify/templates/plan-template.md (Constitution Check gates aligned)
  - ✅ .specify/templates/spec-template.md (Security and boundary edge case alignment)
  - ✅ .specify/templates/tasks-template.md (Task categories include financial audit & boundary tests)
Follow-up TODOs:
  - None; all template placeholders resolved.
-->

# Wajha Attendance System Constitution

## Core Principles

### I. Financial Data Integrity & Transactional Atomicity
All wallet-affecting operations—including student/tutor deposits, balance adjustments, session-charge deductions, and refunds—MUST execute as atomic transactions. Partial balance deductions, uncommitted state mutations, or detached ledger writes are strictly prohibited; either the complete operation succeeds or the entire transaction rolls back. Every balance modification MUST produce an immutable, append-only audit trail record capturing user ID, balance before, delta, balance after, actor ID, transaction timestamp, operation category, and reference session/payment receipt ID.
*Rationale*: Financial balance corruption destroys user trust and creates irrecoverable accounting discrepancies. Atomicity and full audit trails guarantee non-repudiation and financial consistency.

### II. Exact Precision Monetary Arithmetic (EGP)
All monetary values in Egyptian Pounds (EGP) MUST be represented and calculated using exact integer precision (e.g., in piasters / cents where 1 EGP = 100 piasters) or dedicated arbitrary-precision decimal representations. Floating-point numbers (`number` with IEEE-754 binary floating-point representation) MUST NEVER be used for currency storage, accounting balances, or fee calculations. Conversion to decimal string representations (e.g., `150.50 EGP`) MUST occur strictly at the presentation boundary for user display.
*Rationale*: IEEE-754 floating-point arithmetic introduces cumulative binary precision drift and rounding anomalies that corrupt account ledgers over time.

### III. Strict Role-Based Access Control (RBAC)
The system MUST enforce rigid role-based access control across `Admin`, `Tutor`, and `Student` actors. Access permissions MUST be verified on the server/API layer for every data query, action, and route mutation; client-side UI visibility toggles are cosmetic and NEVER constitute a security control. Each role MUST strictly view and manipulate only authorized domain data:
- **Students**: May only inspect their own attendance history, personal wallet balance, and self check-in status.
- **Tutors**: May only manage their assigned sessions, view attendee rosters for their sessions, and inspect relevant session logs.
- **Admins**: Maintain organizational configuration, system-wide user rosters, global audit trails, and financial reconciliation tools.
*Rationale*: Inadequate role boundaries risk privilege escalation, privacy violations, and unauthorized data tampering across institutional user tiers.

### IV. Cryptographic Unguessable Attendance Tokens
Every attendance session MUST utilize high-entropy, cryptographically secure random tokens (e.g., crypto-grade random bytes or UUIDv4 with $\ge 128$ bits of entropy). Tokens MUST be strictly bound to a single specific session instance. Reusing, predicting, or transferring tokens across sessions or student accounts is strictly blocked. Token verification algorithms MUST validate session binding, active session status, and non-revocation before processing any check-in.
*Rationale*: Predictable or reusable attendance tokens permit proxy check-ins and attendance forgery, invalidating institutional academic tracking.

### V. Time-Windowed Attendance & Single Check-In Boundary Verification
Attendance check-in operations MUST strictly enforce a 4-hour temporal window from session start and an absolute single-check-in-per-student invariant:
- Check-ins attempted outside the 4-hour window ($t \ge \text{expiry}$) MUST be rejected with a descriptive error.
- Check-in attempts for a student who has already recorded attendance for that session MUST be rejected idempotently without multiple charges or duplicate records.
- Comprehensive automated test suites MUST cover all critical boundary conditions: check-in at valid window edge ($t = \text{expiry} - 1\text{s}$), check-in at exact expiry ($t = \text{expiry}$), expired check-in ($t = \text{expiry} + 1\text{s}$), and duplicate/concurrent check-in submissions.
*Rationale*: The 4-hour attendance window and single-check-in rule are critical business constraints; boundary glitches directly lead to double billing or invalid academic records.

### VI. Feature-Based Architecture & Import Boundaries
The codebase MUST strictly adhere to the feature-based folder hierarchy (`src/app/`, `src/features/<feature>/`, `src/shared/`) and one-way architectural data flow:
- `shared`: Global primitives, UI components (`src/shared/components/ui/`), and utilities; may only import other `shared` modules or npm dependencies.
- `features`: Domain modules (`attendance`, `auth`, `users`, etc.) containing isolated schemas, server logic, hooks, and components; may import `shared` and intra-feature code, but NEVER another feature or `app`.
- `app`: Next.js App Router entry points; orchestrates features and shared primitives.
- Code quality gates MUST pass `npm run lint` (`eslint-plugin-boundaries`) and `npm run build` without type or boundary errors.
*Rationale*: Strict module boundaries prevent tangled dependency graphs, eliminate circular imports, and ensure maintainable, isolated feature development.

## Core Quality & Security Standards

- **Input Validation**: All incoming requests and payload inputs MUST be validated at runtime against strict Zod schemas before reaching business logic or database storage.
- **Idempotency**: All state-mutating requests (check-in, wallet deduction, balance adjustment) MUST support idempotency mechanisms to prevent duplicate side effects from retries or network drops.
- **Zero Secrets in Code**: Environment secrets, JWT keys, and database credentials MUST reside solely in environment variables and never be checked into version control.

## Development & Verification Workflow

- **Test-Driven Boundary Verification**: Financial calculations and attendance time-window boundaries MUST be guarded by automated unit and integration tests prior to deployment.
- **Static Quality Gates**: Pull requests MUST pass `npm run lint` and `npm run build` before merging.
- **No Unused Code**: Dead imports, unused parameters, or dangling routines MUST be cleaned or explicitly prefixed with `_`.

## Governance

- The Constitution is the supreme engineering policy document for the Wajha Attendance System and supersedes informal conventions.
- Any amendment requires explicit architectural review, updating of related `.specify/templates/`, documentation of rationale, and a semantic version increment.
- All specifications (`spec.md`), implementation plans (`plan.md`), and task breakdowns (`tasks.md`) MUST include a Constitution Check gate explicitly verifying compliance with each core principle.
- **Versioning Policy**:
  - **MAJOR**: Incompatible principle removal, structural governance redesign, or architectural deregulation.
  - **MINOR**: Addition of new principles, material expansion of quality/security mandates.
  - **PATCH**: Typo fixes, non-semantic clarifications, wording enhancements.

**Version**: 1.0.0 | **Ratified**: 2026-09-05 | **Last Amended**: 2026-09-05
