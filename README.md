# CivicMesh Officer Portal

React TypeScript frontend for officer review and citation issuance.

**Status:** Phase 1 (Implementation begins Q3 2026)

## Directory Structure

```
civicmesh-frontend/
├── src/
│   ├── pages/
│   │   ├── ReviewQueue.tsx       # Queue summary, filtering by type (fast-track, manual, escalation)
│   │   ├── IncidentDetail.tsx    # Single incident detail with video player and metadata
│   │   ├── IssueCitation.tsx     # Citation workflow (confirm, sign, issue)
│   │   ├── Analytics.tsx         # Enforcement metrics, geographic heatmap, citation trends
│   │   └── Settings.tsx          # Officer account, device assignment, preferences
│   ├── components/
│   │   ├── VideoPlayer.tsx       # H.264 evidence clip playback with timeline
│   │   ├── IncidentCard.tsx      # Incident summary card (plate, type, location, confidence)
│   │   ├── CitationForm.tsx      # NOC form renderer (dynamic per violation type)
│   │   └── Layout.tsx            # Main layout, navigation, header, footer
│   ├── api/
│   │   └── client.ts             # Backend API client (Axios/fetch, auth, error handling)
│   ├── App.tsx                   # Router and main component
│   └── index.css                 # Design system, global styles
├── public/
│   └── index.html                # HTML entry point
├── tests/
│   └── unit/
│       ├── ReviewQueue.test.tsx   # Queue component tests
│       └── IncidentDetail.test.tsx # Incident detail tests
├── .github/workflows/
│   ├── ci.yml                    # Jest tests, ESLint, TypeScript check
│   └── docker-build.yml          # Build Nginx + React container, push to ghcr.io
├── package.json                  # React 18, React Router v6, TypeScript, Vite, Jest
├── tsconfig.json                 # TypeScript configuration
├── .gitignore                    # Node.js standard excludes
└── README.md                     # This file
```

## Features

### Review Queue Page
- List incidents by type: fast_track, manual_review, escalation
- Filter by:
  - Violation type (bus lane, red light, etc.)
  - Time range
  - Location
  - Officer assignment
- Real-time updates (WebSocket, Phase 2+)
- Bulk operations (assign to multiple officers, etc.)

### Incident Detail Page
- Metadata display:
  - License plate
  - Violation type
  - Location (map integration)
  - Timestamp
  - Confidence score
  - Vehicle information (if available)
- **Video Player:**
  - H.264 clip playback
  - Timeline scrubbing
  - Frame-by-frame review
  - Speed controls
- Quick actions:
  - Approve
  - Reject
  - Escalate

### Citation Issuance Workflow
1. **Review:** Confirm violation, check evidence
2. **Verify:** Validate plate against MTO registry
3. **Draft:** Generate NOC (Notice of Contravention)
4. **Sign:** Digital signature (officer badge + PIN)
5. **Issue:** Send citation to MTO system
6. **Confirm:** Receipt acknowledgment

### Analytics Dashboard
- Metrics:
  - Citations issued (by type, by officer, by day)
  - False positive rate
  - Processing time distribution
  - Queue backlog
- Visualizations:
  - Geographic heatmap (enforcement density)
  - Time series (citations over time)
  - Officer performance (citations/hour, accuracy)
  - Violation distribution (pie/bar charts)

### Officer Settings
- Account info (badge number, name, unit)
- Device assignments (which node cameras they monitor)
- Preferences:
  - Queue notifications
  - Default filters
  - Timezone
  - Language (EN/FR)

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **React Router v6** - Client-side routing
- **Vite** - Build tool (fast HMR, optimized bundles)
- **Axios/Fetch** - HTTP client (see `src/api/client.ts`)
- **Jest** - Unit testing
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Material-UI or Tailwind** - Component library (to be chosen in Phase 1)

## Quick Start

### Development

```bash
npm install
npm run dev
```

Opens http://localhost:5173 with hot module reloading.

### Testing

```bash
npm run test              # Run all tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report
```

### Linting & Format

```bash
npm run lint             # ESLint
npm run format           # Prettier
npm run type-check       # TypeScript
```

### Build for Production

```bash
npm run build
npm run preview          # Preview built version locally
```

## Component Architecture

### Page Components
- Container components for routes
- Handle data fetching
- Manage page-level state

### UI Components
- Reusable presentational components
- Minimal state (mostly props-driven)
- Testable in isolation

### API Client
```typescript
// src/api/client.ts
export const apiClient = {
  getQueue: async (filters?: QueueFilters) => fetch(...),
  getIncident: async (id: string) => fetch(...),
  approveIncident: async (id: string, data: ApprovalData) => fetch(...),
  rejectIncident: async (id: string, reason: string) => fetch(...),
  escalateIncident: async (id: string) => fetch(...),
  getAnalytics: async (range: DateRange) => fetch(...)
};
```

## Backend Integration

All API calls go to the backend at `https://api.civicmesh.local` (or `http://localhost:8000` for local dev).

**Key Endpoints:**
- `GET /portal/queue` - Queue summary
- `GET /portal/incidents/{id}` - Incident details
- `POST /portal/incidents/{id}/approve` - Approve
- `POST /portal/incidents/{id}/reject` - Reject
- `POST /portal/incidents/{id}/escalate` - Escalate

See [Backend API Spec](https://github.com/TrafficMesh/civicmesh-docs/blob/main/api/backend-api.md) for details.

## Deployment

### Local Development
```bash
npm run dev
```

### Docker Container
```bash
docker build -t civicmesh-frontend:latest .
docker run -p 3000:80 civicmesh-frontend:latest
```

### Production
- Built with Vite (optimized bundles)
- Served by Nginx (reverse proxy + static files)
- TLS termination (via Nginx)
- CDN for assets (optional)

See [Deployment Guide](https://github.com/TrafficMesh/civicmesh-docs/blob/main/deployment/DOCKER_SETUP.md) for full details.

## Testing Strategy

### Unit Tests
- Component tests (Jest + React Testing Library)
- Snapshot tests for complex components
- Coverage target: >80%

### Integration Tests
- API client tests (mock backend)
- Multi-component workflows

### E2E Tests (Phase 2+)
- Cypress or Playwright
- Full user workflows (review → approve → issue)

## Performance Targets

- **Initial Load:** <2s (with CDN)
- **Route Transition:** <300ms
- **Video Playback:** <1s startup
- **API Response:** <500ms (p95)

## Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- High contrast mode

## Documentation

- [API Specification](https://github.com/TrafficMesh/civicmesh-docs/blob/main/api/backend-api.md) - Backend endpoints
- [Deployment Guide](https://github.com/TrafficMesh/civicmesh-docs/blob/main/deployment/DOCKER_SETUP.md) - Local, production, scaling
- [Contributing Guide](https://github.com/TrafficMesh/civicmesh-docs/blob/main/community/CONTRIBUTING.md) - Code standards, workflow
- [Central Docs Hub](https://github.com/TrafficMesh/civicmesh-docs) - Architecture, compliance, roadmap

## Phase 0 vs Phase 1

**Phase 0 (Now):** Officer portal endpoints in backend (FastAPI)  
**Phase 1 (Q3 2026):** React frontend implementation

## Contributing

See [CONTRIBUTING.md](https://github.com/TrafficMesh/civicmesh-docs/blob/main/community/CONTRIBUTING.md) in the docs repository.

Code Style:
```bash
npm run lint    # ESLint
npm run format  # Prettier
```

## Team

- **Owner:** @TrafficMesh/frontend-team
- **Backend Integration:** civicmesh-backend team

## License

Dual license: AGPL (open source) + BSL (commercial)
