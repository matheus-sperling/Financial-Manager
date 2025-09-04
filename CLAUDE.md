# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Setup
npm install

# Development server with hot reload on http://localhost:5173
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Code quality - ALWAYS run before committing
npm run lint
npm run lint:fix  # Auto-fix linting issues

# Tests (no tests configured)
npm test
```

## Project Architecture

This is a modern React application built with TypeScript, Vite, Tailwind CSS, and shadcn/ui components. It features excellent mobile responsiveness and follows modern web development best practices.

### Key Architecture Patterns
- **React 19**: Latest React with modern hooks and state management
- **TypeScript**: Type-safe development with excellent IntelliSense
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **shadcn/ui**: Beautifully designed, accessible, and customizable components
- **Vite**: Lightning-fast build tool with HMR
- **Mobile-First Design**: Responsive design optimized for all device sizes
- **Data Persistence**: All data automatically saved to browser localStorage

### Core Application Structure

```
src/
├── components/
│   ├── ui/                 # shadcn/ui base components (Button, Card, Dialog, etc.)
│   ├── DebtSummary.tsx     # Financial summary cards component
│   └── DebtTable.tsx       # Responsive debt table/card component
├── hooks/
│   └── useDebtManager.ts   # Custom hook for state management
├── lib/
│   └── utils.ts            # Utility functions and helpers
├── types/
│   └── debt.ts             # TypeScript type definitions
├── App.tsx                 # Main application component
├── main.tsx                # Application entry point
└── index.css               # Global styles and Tailwind imports

```

### Key Application Features
- **Person & Debt Management**: Add/edit/remove people and their associated debts
- **Hidden Debts**: Mark debts as hidden to exclude from total calculations
- **Drag & Drop**: Reorder people and debts using ⋮⋮ handles (DragAndDrop.js)
- **Themes**: Light/dark mode toggle with automatic persistence
- **Internationalization**: English/Portuguese with browser language detection
- **Responsive Design**: Mobile-first approach with table scrolling on small screens

## Development Workflow

1. Make changes to HTML/CSS/JS files
2. Changes reflect immediately in browser (with `npm run dev` for auto-refresh)
3. **CRITICAL**: Always run `npm run lint` before committing
4. **Manual testing required**: Test all modified features in browser
5. Verify data persistence by refreshing the page

### Manual Testing Scenarios
Always test these scenarios after making changes:
- Add/edit/remove persons and debts
- Toggle hidden debts and verify total calculations
- Test drag and drop reordering
- Toggle theme and verify persistence
- Refresh page to verify localStorage data persistence

## Code Style & Patterns

- **ESLint Configuration**: Uses modern eslint.config.js with 4-space indentation, single quotes, semicolons required
- **ES6+ Features**: Classes, arrow functions, template literals, destructuring
- **Module System**: All JS files use ES6 import/export
- **Event System**: Custom events for inter-component communication via Observer pattern
- **CSS Variables**: Theme system uses CSS custom properties for consistent theming
- **Responsive Design**: Mobile-first CSS with flexbox/grid layouts

## Important Implementation Details

- **No Backend**: Pure frontend application, no server-side logic
- **Browser Compatibility**: Requires modern browser with ES6+ support
- **Data Storage**: Uses localStorage exclusively - inspect via browser dev tools
- **Theme System**: CSS custom properties in css/themes/variables.css with data-theme attribute switching
- **Internationalization**: Translation objects in DebtManager.js with automatic language detection
- **Drag & Drop**: Custom implementation in DragAndDrop.js using HTML5 drag API

## Frequently Modified Files

- **DebtManager.js**: Core logic, adding new features, theme/language management
- **UIComponents.js**: Modal behavior, form handling, UI interactions  
- **css/components/**: When changing component styling
- **css/themes/**: When modifying dark mode or theme variables
- **index.html**: When adding new UI elements or changing structure