# 💰 Debt Manager

A simple and intuitive web application to manage your personal debts with other people.

## ✨ Features

- **People Management**: Add and remove people you owe money to
- **Debt Control**: Add, edit, remove and duplicate debts easily
- **Hidden Debts**: Mark debts as hidden to exclude from total calculation (useful for paid debts or disputes)
- **Drag & Drop**: Reorder people and debts with drag & drop functionality
- **Financial Summary**: View total amounts, registered people, and hidden debt values
- **Auto Save**: All data is automatically saved to localStorage
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Optimized interface for desktop and mobile
- **Safety Confirmations**: Confirmation modal for destructive actions

## 🚀 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/debt-manager.git
   cd debt-manager
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** to `http://localhost:5173`

5. **Start using**:
   - Click "Add New Person" to register someone
   - Fill in the debt description and amount
   - Use action buttons to edit, duplicate or remove debts
   - Drag the ⋮⋮ icon to reorder people or debts
   - Click the moon/sun icon to toggle dark mode
   - Toggle language with the flag button

## 🚢 Deployment to GitHub Pages

This project is pre-configured for easy deployment to GitHub Pages.

1.  **Deploy the application**:
    ```bash
    npm run deploy
    ```
    This command will automatically build the project and push the contents of the `dist` folder to the `gh-pages` branch on your repository. Your site will be available at the URL specified in your repository's settings.

2.  **For Forks**: If you have forked this repository, you need to update two files before deploying:
    *   In `package.json`, change the `homepage` value to your GitHub Pages URL (e.g., `https://<your-username>.github.io/<your-repo-name>/`).
    *   In `vite.config.ts`, change the `base` value to your repository name (e.g., `base: '/<your-repo-name>/'`).

## 📁 Project Structure

```
debt-manager/
├── src/
│   ├── components/
│   │   ├── ui/                 # shadcn/ui base components
│   │   ├── DebtSummary.tsx     # Financial summary cards
│   │   └── DebtTable.tsx       # Responsive debt management
│   ├── hooks/
│   │   └── useDebtManager.ts   # State management hook
│   ├── lib/
│   │   └── utils.ts            # Utility functions
│   ├── types/
│   │   └── debt.ts             # TypeScript definitions
│   ├── App.tsx                 # Main application
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
├── index.html                  # HTML template
├── package.json                # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── vite.config.ts             # Vite build configuration
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
- **Drag & Drop**: Use the ⋮⋮ icon to drag and reorder
- **People**: Reorder the people list
- **Debts**: Reorder debts within each person

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
- **TypeScript**: Type-safe development with excellent developer experience
- **Vite**: Lightning-fast build tool with Hot Module Replacement
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **shadcn/ui**: Beautiful, accessible, and customizable component library
- **Lucide React**: Modern icon library with consistent design
- **ESLint**: Code linting and quality enforcement
- **LocalStorage**: Client-side data persistence

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

Found a bug or have a suggestion? [Open an issue](https://github.com/yourusername/debt-manager/issues)


**Developed with ❤️ to help with personal financial control**