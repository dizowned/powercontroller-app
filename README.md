# PowerController Client

An Angular 20 web application for managing and controlling power controller devices with multiple channels. Features a modern Material UI design with standalone components and signal-based state management.

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or higher
- npm 9.x or higher
- Backend server running at `http://localhost:3000` (optional - app works with local JSON only)

### Installation & Development Server

```bash
npm install
npm run start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## 🏗️ Architecture

Built with Angular 20 using standalone components (no NgModules), Material UI, and RxJS for reactive data management.

### Data Flow

The client fetches controller data from two sources:

1. Local JSON file (`public/assets/json/controller-list.json`)
2. Backend API (`http://localhost:3000/controllers`)

Both sources are merged using RxJS `combineLatest` to provide a unified list of available controllers.

## 📦 Project Structure

```text
src/
├── app/
│   ├── components/           # Reusable UI components
│   │   ├── channel/          # Individual channel toggle component
│   │   └── controller/       # Controller card with channel list
│   ├── models/               # TypeScript interfaces
│   │   ├── channel.ts
│   │   └── powercontroller.ts
│   ├── services/             # Angular services
│   │   └── powercontroller-service.ts
│   └── ui/                   # Page-level components
│       ├── main-page/        # Controller list view
│       └── config-page/      # Add new controller form
public/
└── assets/json/              # Local controller data
    └── controller-list.json
```

## 🧪 Development Commands

```bash
npm run start    # Start dev server (ng serve)
npm run build    # Build for production
npm run watch    # Build with watch mode
npm test         # Run unit tests (Karma + Jasmine)
ng generate component component-name  # Generate new component
```

## 🎨 Tech Stack

- **Framework**: Angular 20 (standalone components)
- **UI Library**: Angular Material
- **Styling**: Tailwind CSS + PostCSS
- **State Management**: RxJS Observables + Angular Signals
- **HTTP Client**: Angular HttpClient
- **Testing**: Karma + Jasmine
- **Build Tool**: Angular CLI

## 📊 Data Models

### PowerController Interface

```typescript
interface PowerController {
  id: number;
  name: string;
  url: string;
  channels: Channel[];
}
```

### Channel Interface

```typescript
interface channel {
  name: string;
  state: boolean;
  number: number;  // 1-indexed channel number
}
```

## 🔧 Configuration

### Backend API URL

To change the backend server URL, edit `src/app/services/powercontroller-service.ts`:

```typescript
private serverControllerUrl = 'http://localhost:3000/controllers'
```

### Local Data

To modify the local controller data, edit `public/assets/json/controller-list.json`

## 🎯 Features

- ✅ View all power controllers with their channels
- ✅ Toggle channel states (on/off)
- ✅ Add new controllers via configuration page
- ✅ Dual-source data loading (local + remote)
- ✅ Responsive Material UI design
- ✅ Real-time channel state management
- ✅ Error handling with fallback to empty arrays

## 🛠️ Development Notes

### Signals & Observables

The client uses Angular's modern signal-based reactive system alongside traditional RxJS observables:

- Signals for local component state (`signal()`, `model()`)
- Observables for HTTP requests and async data streams

### Standalone Components

All Angular components are standalone (no `NgModule`). Material UI modules are imported directly in component metadata.

### Error Handling

Both HTTP sources (local JSON and server API) have error handling that returns empty arrays on failure, ensuring the UI always has valid data to render.

## 📝 Version

v0.3.0

## 📄 License

GPL

## 👤 Author

Brian Rice

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
