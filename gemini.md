# CoreMongo Project Instructions

Project identity: Full-stack admin dashboard. Monorepo with shared validation logic.
## 🏗️ Architecture & Conventions

### 📦 Monorepo Structure
 -`backend/`: Express 5 API.
- `frontend/`: React Router 7 (Remix) SPA.
- `shared/`: Source of truth for Zod schemas and TypeScript types.
- **Mandate:** Always export schemas/types from `shared/` and import via `@coremongo/shared`.
