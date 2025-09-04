# Financial Manager (Debt Manager)
Financial Manager is a client-side only HTML5, CSS3, and JavaScript ES6+ web application for tracking personal debts with other people. It uses localStorage for data persistence and supports dark/light themes with English/Portuguese internationalization.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively
- **Install dependencies**: `npm install` -- completes in < 1 second.
- **Lint the code**: `npm run lint` -- completes in < 1 second. ALWAYS run before committing changes.
- **Start development server**: `npm run dev` -- starts live-server with hot reload on http://127.0.0.1:8080 in < 10 seconds.
- **Start production-like server**: `npm run start` -- starts static server on http://localhost:3000 in < 5 seconds.
- **Run tests**: `npm test` -- no tests configured, just echoes a message.

## Validation
- **CRITICAL**: ALWAYS manually validate changes by running the application in a browser after making any modifications.
- **Manual Testing Scenarios**:
  - Add a new person using "Add New Person" button and verify they appear in the list.
  - Add a debt to a person with description and amount, verify it appears in their table.
  - Test Edit functionality by clicking "Edit" on any debt and modifying values.
  - Test Hide/Show functionality by checking/unchecking the "Hidden" checkbox.
  - Test theme toggle by clicking the moon/sun button in the header.
  - Test drag and drop by dragging the ⋮⋮ icons to reorder people or debts.
  - Verify data persists by refreshing the page.
  - Test Clear All Debts functionality.
- **Always run `npm run lint` before committing** or ESLint errors will fail CI validation.
- **Browser Testing**: Open application in browser and interact with all modified features.
- **LocalStorage**: Data automatically saves to browser localStorage - refresh page to verify persistence.

## Common Tasks
The application has NO build process - it runs directly in the browser. Changes to HTML/CSS/JS files are immediately visible when the page is refreshed (or automatically with `npm run dev`).

### Development Workflow
1. `npm install` (if dependencies changed)
2. `npm run dev` (start development server with hot reload)
3. Make changes to source files
4. Changes reflect immediately in browser (live-server auto-refreshes)
5. `npm run lint` (validate code quality)
6. Manual testing in browser
7. Commit changes

### Key Project Structure
```
Financial-Manager/
├── index.html              # Main application page
├── package.json            # Dependencies and npm scripts
├── eslint.config.js        # ESLint configuration (modern)
├── .eslintrc.json          # ESLint configuration (legacy backup)
├── css/                    # Styles organized by purpose
│   ├── components/         # UI component styles (buttons, modals, forms)
│   ├── layout/             # Layout styles (header, base, responsive)
│   └── themes/             # Theme variables and dark mode styles
├── js/                     # JavaScript modules
│   ├── app.js              # Application entry point
│   ├── modules/            # Core application modules
│   │   ├── DebtManager.js  # Main application logic and state
│   │   ├── UIComponents.js # UI interaction handlers
│   │   └── DragAndDrop.js  # Drag and drop functionality
│   ├── patterns/           # Design pattern implementations
│   │   ├── Factory.js      # Factory patterns for validation/components
│   │   ├── Observer.js     # Observer pattern for events
│   │   └── State.js        # State management utilities
│   └── utils/              # Utility functions
│       └── utils.js        # Currency formatting, localStorage, etc.
```

### Frequently Modified Files
- **`js/modules/DebtManager.js`**: Core application logic, add/edit/remove functionality
- **`js/modules/UIComponents.js`**: Modal handling, UI interactions
- **`css/components/`**: When changing UI component styling
- **`css/themes/`**: When modifying dark mode or theme variables
- **`index.html`**: When adding new UI elements or changing structure

### Key Application Features
- **Person Management**: Add, edit, remove people who owe you money
- **Debt Tracking**: Add, edit, duplicate, remove individual debts per person
- **Hidden Debts**: Mark debts as hidden to exclude from total calculations
- **Drag and Drop**: Reorder people and debts using ⋮⋮ handles
- **Themes**: Light/dark mode toggle with ☀️/🌙 button
- **Internationalization**: English/Portuguese with automatic browser language detection
- **Data Persistence**: All data automatically saved to localStorage
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### Application Architecture
- **No Backend**: Pure frontend application, no server-side logic
- **ES6 Modules**: Uses modern JavaScript module system
- **Event-Driven**: Uses custom events and observer patterns
- **Component-Based**: Modular CSS and JavaScript organization
- **Pattern Implementation**: Factory, Observer, and State management patterns

### Testing Notes
- **No Unit Tests**: Application doesn't have a test framework configured
- **Manual Testing Required**: Always test UI functionality after changes
- **Browser Compatibility**: Modern browsers only (ES6+ support required)
- **Data Testing**: Use browser dev tools to inspect localStorage for data persistence

### Common Commands Reference
```bash
# Quick setup
npm install                 # < 1 second

# Development
npm run dev                 # Live server with hot reload (port 8080)
npm run start              # Static server (port 3000)

# Code Quality
npm run lint               # < 1 second - NEVER SKIP
npm run lint:fix           # Auto-fix linting issues

# File sizes (reference)
# 9 JavaScript files (excluding node_modules)
# 13 CSS files
# 1 HTML file
```

This is a straightforward client-side application with no complex build processes or long-running operations. All commands complete in seconds, making it ideal for rapid development and testing.