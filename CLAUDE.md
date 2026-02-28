# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Chinese-language video streaming platform frontend built with Next.js 16, React 19, TypeScript, and a Clean Architecture approach. The app communicates with a GraphQL backend.

## Commands

```bash
# Development
npm run dev              # Start dev server (localhost:3000)
npm run build            # Production build
npm run lint             # ESLint (flat config, ESLint 9)

# Testing
npm run test             # Run all tests (vitest run)
npm run test:watch       # Watch mode (vitest)
npm run test:coverage    # Coverage report (80% threshold)
npx vitest run src/path/to/file.test.ts   # Run a single test file

# GraphQL Code Generation
npm run codegen          # Generate types from schema + operations
npm run codegen:watch    # Watch mode for codegen
```

## Architecture

The codebase follows **Clean Architecture** with strict layer separation:

```
UI (React Components / Pages)
  ↓ observes
Stores (MobX — reactive state)
  ↓ calls
Domain Repositories (abstract interfaces)
  ↓ implemented by
Data Layer (GraphQL via Apollo Client)
  ↓ fetches
Backend API
```

### Layer Details

**`src/domain/`** — Pure business logic, no framework dependencies
- `entities/` — Readonly TypeScript interfaces (Movie, User, Episode, etc.)
- `repositories/` — Abstract repository interfaces (e.g. `IMovieRepository`)

**`src/data/`** — Data access implementations
- `repositories/` — Concrete implementations of domain repository interfaces using Apollo Client
- `mappers/` — Transform GraphQL responses into domain entities
- `graphql/schema.graphql` — Backend schema (source of truth for codegen)
- `graphql/operations/` — `.graphql` query/mutation files
- `graphql/__generated__/` — Auto-generated types (do not edit)

**`src/stores/`** — MobX state management
- Global stores (singletons): `UserStore`, `HomeStore`, `AdStore`, `AppConfigStore`
- Page-level stores (factories): `FilterStore`, `DiscoverStore`, `MovieDetailStore`, etc.
- All stores use `makeAutoObservable()` and are accessed via React Context hooks

**`src/core/`** — Infrastructure and cross-cutting concerns
- `di/` — Dependency injection container (service locator pattern with `DI_KEYS`)
- `apollo/` — Apollo Client setup with auth link and error link
- `errors/` — `Result<T>` monad for error handling + typed `Failure` subclasses
- `storage/` — LocalStorage abstraction (tokens, user cache, search history)
- `utils/` — Date formatting, number formatting, HTML stripping

**`src/components/`** — Reusable UI
- `common/` — Generic components (cards, buttons, loading states, infinite scroll)
- `feature/` — Feature-specific components (banner carousel, search bar, comments)

**`src/app/`** — Next.js App Router
- `(tabs)/` — Tab-based layout with `BottomTabBar`
- `client-providers.tsx` — Root client providers (Apollo, DI, MobX store context)
- 30+ page routes

### Key Patterns

- **Result monad**: All repository methods return `Result<T>`. Use `result.fold(onError, onSuccess)` to handle both cases.
- **DI Container**: Dependencies registered in `src/core/di/register.ts`, accessed via `container.get<T>(DI_KEYS.XxxRepository)`. Global stores are singletons; page stores use factory registration.
- **Immutable entities**: All domain entities are `readonly` interfaces — never mutate, always create new objects.
- **Observer pattern**: Page components use MobX `observer()` wrapper for reactivity.
- **GraphQL codegen**: After modifying `.graphql` files in `src/data/graphql/operations/`, run `npm run codegen` to regenerate types.

## Path Alias

`@/*` maps to `./src/*` (configured in tsconfig.json).

## Testing

- Tests live in colocated `__tests__/` directories
- Test file pattern: `src/**/__tests__/**/*.test.{ts,tsx}`
- Coverage required on: `domain/**`, `core/**`, `data/mappers/**`, `data/repositories/**`, `stores/**`, `app/**/client-providers.tsx`
- Environment: jsdom (vitest + @testing-library/react)

## Styling

Tailwind CSS v4 with PostCSS. Design tokens defined as CSS custom properties in `src/app/globals.css`:
- Dark theme (scaffold: `#0D0C0B`, card: `#1F1F1F`)
- Primary: `#2196F3`, Secondary/accent: `#F84048`
- Button gradient: `#F9315C → #F64E36`

## Environment

GraphQL endpoint configured via `NEXT_PUBLIC_GRAPHQL_ENDPOINT` in `.env.local`.
