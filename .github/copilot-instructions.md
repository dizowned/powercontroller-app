# PowerController Codebase Guide for AI Agents

## Architecture Overview

PowerController is a **dual-package monorepo** with a decoupled client-server architecture:

- **Client** (`powercontroller-client/`): Angular 20 standalone components with Material UI, RxJS observables
- **Server** (`powercontroller-server/`): Express.js REST API serving power controller metadata
- **Data Flow**: Client fetches from two sources—local JSON (`assets/json/controller-list.json`) and backend API (`http://localhost:3000/controllers`)—merging results via RxJS `combineLatest`

## Data Models

### PowerController Interface
```typescript
interface PowerController {
  id: number;
  name: string;
  url: string;
  channels: Channel[]
}
```

### Channel Interface
```typescript
interface channel {
  name: string;
  state: boolean;
  number: number; // channel number (1-indexed)
}
```

**Note**: Type naming is inconsistent—`channel` is lowercase in imports but uppercase in some definitions. Standardize when refactoring.

## Key Development Workflows

### Client Development
```bash
# Start dev server (watches & hot-reloads)
npm run start        # Runs: ng serve

# Build production bundle
npm run build        # Runs: ng build

# Run tests
npm test            # Uses Karma + Jasmine
```

### Server Development
```bash
# Start server (runs TypeScript directly)
npm run start       # Runs: ts-node src/powercontroller-server-express.ts

# Compile to JavaScript
npm run build       # Runs: tsc
```

**Port Config**: Server runs on `http://localhost:3000`, client on `http://localhost:4200`. CORS is configured to allow cross-origin requests from localhost:4200.

## Critical Patterns

### 1. Service Data Fetching (PowerControllerService)
- **Two-source pattern**: Loads from local JSON AND remote API simultaneously
- Uses `Observable` properties with RxJS `combineLatest` to merge arrays
- Pushes all data to `localStorage['ControllerList']` after loading
- **Issue**: Eager subscription pattern (in constructor) means data loads immediately on service instantiation

**Pattern Example** (`src/app/services/powercontroller-service.ts`):
```typescript
this.allControllersList$ = combineLatest([
  this.savedControllerList$,
  this.serverControllerList$
]).pipe(
  map(([saved, server]) => [...saved, ...server])
);
```

### 2. Standalone Component Architecture
All components are **standalone** with explicit `imports` array. No `NgModules`. 
- Inject Material modules directly in component
- Example: `ChannelComponent` uses `model<T>()` signals for two-way binding instead of `@Input`/@Output`

### 3. Signal-Based State Management
Client uses Angular's new `signal()` API:
```typescript
isExpanded = signal(true);  // App.ts
channelEnabled = model<boolean>();  // Channel component
```

Signals replace traditional @Input/@Output in standalone components.

### 4. Server Data Persistence
- Server loads from `data/controller-list.json` on startup
- In-memory array (`controllers`) is source of truth during runtime
- **No database**: JSON file written directly via `fs.writeFileSync()` on add/delete/update operations
- Endpoints: `GET /controllers`, `GET /channels/:controllerid`, `POST /addchannel`, `POST /deletechannel/:controllerid/:channelName`

## Common Modifications

### Adding a New API Endpoint
1. Add route in `powercontroller-server/src/powercontroller-server-express.ts`
2. Follow pattern: parse params → find in `controllers` array → return/modify → write to file if mutating
3. Update CORS origin if adding new client subdomain

### Adding a New Channel Feature
1. Update `Channel` interface in both `powercontroller-client/src/app/models/channel.ts` AND `powercontroller-server/src/types/controller.ts` (must stay in sync)
2. Update channel JSON structure in `public/assets/json/controller-list.json` and `powercontroller-server/data/controller-list.json`
3. Bind new property in `ChannelComponent` using `model<T>()`

### Adding Client Pages
1. Create new component in `src/app/ui/`
2. Add route in `src/app/app.routes.ts`
3. Import Material modules explicitly in standalone component's `imports` array

## Codebase Conventions

- **Naming**: camelCase for properties/methods, PascalCase for classes/components
- **Logging**: Verbose `console.log()` throughout—include service name for tracing (e.g., `console.log(this.servicename + " - message")`)
- **Component Structure**: Template in `.html`, styles in `.css`, logic in `.ts`
- **Material Components**: Most UI uses Angular Material; check `@angular/material` version in `package.json` (currently ^20.2.11)

## Build & Test

- **Tests**: Karma + Jasmine. Run `npm test` from client directory
- **Build Output**: `ng build` produces `dist/` directory ready for production
- **SSR Support**: Project has `@angular/ssr` configured; server-side rendering templates in `app.config.server.ts`, `app.routes.server.ts`

## External Integration Points

- **Backend dependency**: Client always expects server at `http://localhost:3000`—hardcoded in `PowerControllerService`
- **Static assets**: `public/assets/json/controller-list.json` is served by Angular development server and included in production builds
- **Tailwind CSS**: Configured via `@tailwindcss/postcss` (check `.postcssrc` for config)

## Known Issues & Technical Debt

1. **Type inconsistency**: `channel` interface uses lowercase; inconsistent export across files
2. **No error handling**: Service and server endpoints don't validate input rigorously before mutations
3. **No state sync**: If server data changes, client won't refresh—relies on page reload
4. **localStorage pollution**: All controller data stored in localStorage without cleanup mechanism
