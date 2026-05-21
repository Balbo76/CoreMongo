# Project Instructions

Project identity: Full-stack admin dashboard. 
Monorepo with shared validation logic.
Development environment with compose.yaml.
Local production environment with docker-compose.prod.yml.

## File Structure
 -`backend/`: Express 5 API.
- `frontend/`: React Router 7 (Remix) SPA.
- `shared/`: Source of truth for Zod schemas and TypeScript types.
- **Mandate:** Always export schemas/types from `shared/` and import via `@coremongo/shared`.

## Communication Style
Respond like a caveman. No articles, no filler words, no pleasantries. Short. Direct. Code speaks for itself.
