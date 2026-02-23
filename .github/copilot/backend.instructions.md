# Backend Instructions

Stack:

- Node.js
- TypeScript
- Express
- Prisma ORM
- Jest

## Architecture

Follow layered architecture:

- controllers/
- services/
- repositories/
- middlewares/
- utils/

## Rules

- Controllers must only handle request/response.
- Services must contain business logic.
- Repositories must handle database access.
- Never access ORM directly from controller.
- Always create DTOs.
- Always write unit tests for services.

## Security

- Always validate input.
- Use middleware for authentication.
- Never expose internal errors.
