# Architecture Overview

## Tech Stack

- React 19 + TypeScript
- TanStack Router (file-based routing)
- TanStack Query (data fetching + caching)
- MSW (mock API, dev + tests)
- Zod (schema validation)
- Tailwind v4 (design tokens via CSS variables)
- Vitest + Testing Library (unit + integration tests)

## App Structure

- `src/routes/`: Route files (`__root.tsx`, `index.tsx`, `login.tsx`, `dashboard.tsx`)
- `src/components/`: View components (`HomeView`, `LoginView`, `DashboardView`) and UI pure components
- `src/api/`: API client, endpoints, schemas, hooks, and query keys
- `src/domain/`: Pure selectors, models, and data transforms
- `src/libs/auth/`: Auth state, context, and helpers
- `src/mocks/`: MSW handlers + mock data
- `src/test/`: Test setup (MSW server + storage)

## Data Flow

- Routes handle orchestration and pass data into view components.
- API layer fetches and validates data via Zod.
- Domain selectors derive dashboard-ready data (allocations, table rows, history).
- UI is mostly presentational and theme-driven.

## Mock Data Deviations (OpenAPI)

- `Position.quantity` uses decimals to support fractional holdings.
- `Position.price` omitted to avoid duplicating `/prices` data; we resolve prices via `/prices` instead.

## Theming

- CSS variables in `src/index.css` control `--bg`, `--fg`, `--card`, `--border`, `--primary`.
- Theme toggle switches `data-theme` between `light` and `alt`.

## Testing

- Unit tests: domain selectors and date utilities.
- Integration tests: login + dashboard routes, backed by MSW server.
