# 💰 Debt Manager

A simple and intuitive web application to manage your personal debts with other people.

## ✨ Features

- **People Management**: Add and remove people you owe money to
- **Debt Control**: Add, edit, remove and duplicate debts easily
- **Hidden Debts**: Mark debts as hidden to exclude from total calculation (useful for paid debts or disputes)
- **Select-and-Move Reordering**: Mobile-friendly reordering system that works on all devices
- **Financial Summary**: View total amounts, registered people, and hidden debt values
- **Auto Save**: All data is automatically saved to localStorage
- **Currency Support**: Toggle between USD ($) and BRL (R$) with automatic formatting
- **Internationalization**: English/Portuguese with browser language detection and flag toggles
- **Dark Mode**: Toggle between light and dark themes with automatic persistence
- **Responsive Design**: Mobile-first approach optimized for all device sizes
- **Safety Confirmations**: Confirmation modal for destructive actions

## 🚀 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/matheus-sperling/Financial-Manager.git
   cd Financial-Manager
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** to `http://localhost:3000`

5. **Start using**:
   - Click "Add New Person" to register someone
   - Fill in the debt description and amount
   - Use action buttons to edit, duplicate or remove debts
   - Use the select-and-move system to reorder people or debts
   - Click the moon/sun icon to toggle between light and dark themes
   - Toggle language with the flag button (EN/PT)
   - Switch currency with the dollar/real button (USD/BRL)

## 🚢 Deployment to GitHub Pages

This project is pre-configured for easy deployment to GitHub Pages.

1.  **Deploy the application**:
    ```bash
    npm run deploy
    ```
    This command will automatically build the project and push the contents of the `dist` folder to the `gh-pages` branch on your repository. Your site will be available at the URL specified in your repository's settings.

2.  **For Forks**: If you have forked this repository, you need to update two files before deploying:
    *   In `package.json`, change the `homepage` value to your GitHub Pages URL (e.g., `https://<your-username>.github.io/<your-repo-name>/`).
    *   In `next.config.js`, change the `basePath` and `assetPrefix` values to your repository name (e.g., `basePath: '/<your-repo-name>', assetPrefix: '/<your-repo-name>/'`).

    **Current configuration**: This repository is configured for `matheus-sperling/Financial-Manager` and deploys to `https://matheus-sperling.github.io/Financial-Manager/`

## 📁 Project Structure

```
Financial-Manager/
├── app/
│   ├── layout.tsx              # Next.js root layout with metadata
│   ├── page.tsx                # Next.js page component (entry point)
│   └── globals.css             # Global styles
├── src/
│   ├── components/
│   │   ├── ui/                 # shadcn/ui base components
│   │   ├── AppContent.tsx      # Main application logic
│   │   ├── DebtSummary.tsx     # Financial summary cards
│   │   ├── DebtTable.tsx       # Responsive debt management
│   │   └── ReorderButton.tsx   # Mobile-friendly reordering
│   ├── hooks/
│   │   ├── useDebtManager.ts   # State management hook
│   │   └── useClientStorage.ts # SSR-compatible localStorage
│   ├── lib/
│   │   └── utils.ts            # Utility functions
│   ├── types/
│   │   └── debt.ts             # TypeScript definitions
│   └── index.css               # Tailwind imports and styles
├── next.config.js              # Next.js configuration
├── package.json                # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── tailwind.config.js         # Tailwind CSS configuration
└── README.md                  # Documentation
```

## 💡 Detailed Features

### Debt Management
- **Add**: Fill description and amount, click "Add Debt"
- **Edit**: Click "Edit" button to modify description and amount
- **Duplicate**: Duplicate an existing debt with one click
- **Remove**: Delete debts with safety confirmation
- **Hide**: Mark as hidden to keep in history but exclude from calculations

### Organization
- **Select-and-Move**: Mobile-friendly reordering system
- **People**: Select a person and move up/down in the list
- **Debts**: Select a debt and move up/down within each person

### Financial Summary
- **Total to Pay**: Sum of all visible debts
- **Total People**: Number of registered people  
- **Hidden Debts**: Total value of debts marked as hidden

### Theme Support
- **Light Mode**: Clean, bright interface
- **Dark Mode**: Easy on the eyes for low-light usage
- **Persistence**: Theme preference saved automatically
- **Smooth Transitions**: Animated theme switching

## 🔧 Technologies Used

- **React 19**: Latest React with modern hooks and concurrent features
- **Next.js 15**: App Router with static export for GitHub Pages
- **TypeScript**: Type-safe development with excellent developer experience
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **shadcn/ui**: Beautiful, accessible, and customizable component library
- **Lucide React**: Modern icon library with consistent design
- **ESLint**: Code linting and quality enforcement
- **LocalStorage**: Client-side data persistence with SSR compatibility

## 📱 Responsive Design

The application features excellent responsiveness across all devices:
- **Desktop**: Full-featured table layout with hover effects
- **Tablet**: Adapted layout with optimized touch targets
- **Mobile**: Card-based layout for easy thumb navigation
- **Touch-Optimized**: 44px minimum touch targets following accessibility guidelines
- **Mobile-First**: Designed mobile-first with progressive enhancement

## 🔒 Privacy

- **Local Data**: All data stays saved only in your browser
- **No Server**: No information sent to external servers
- **Full Control**: You have complete control over your data

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## 🐛 Report Issues

Found a bug or have a suggestion? [Open an issue](https://github.com/matheus-sperling/Financial-Manager/issues)


**Developed with ❤️ to help with personal financial control**