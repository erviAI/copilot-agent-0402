# Todo App

A modern, TypeScript-based Todo application built with Vite. This project demonstrates clean architecture principles with a layered structure including repositories, services, and components.

## Features

- ✅ Create, toggle, and delete todos
- 💾 Persistent storage using LocalStorage
- 🎨 Clean and responsive UI
- 🏗️ Clean architecture with repository pattern
- 📝 Fully typed with TypeScript

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/erviAI/copilot-agent.git
   cd copilot-agent
   ```

2. Navigate to the frontend directory and install dependencies:
   ```bash
   cd frontend
   npm install
   ```

### Running the App

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Building for Production

```bash
npm run build
```

The built files will be in the `frontend/dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Documentation

- [Architecture Overview](docs/architecture.md) - Learn about the project structure and design patterns
- [Roadmap](docs/roadmap.md) - Planned features and enhancements

## Tech Stack

- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **LocalStorage** - Browser-based persistence