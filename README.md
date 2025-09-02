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

2. **Open `index.html`** in any modern web browser

3. **Start using**:
   - Click "Add New Person" to register someone
   - Fill in the debt description and amount
   - Use action buttons to edit, duplicate or remove debts
   - Drag the ⋮⋮ icon to reorder people or debts
   - Click the moon/sun icon to toggle dark mode

## 📁 Project Structure

```
debt-manager/
├── index.html          # Main page
├── css/
│   └── styles.css      # Application styles with dark mode support
├── js/
│   ├── app.js          # Application entry point
│   ├── modules/
│   │   ├── DebtManager.js    # Main application logic
│   │   ├── UIComponents.js   # UI components and modals
│   │   ├── DragAndDrop.js    # Drag and drop functionality
│   ├── utils/
│   │   └── utils.js          # Utility functions
├── package.json        # Project metadata and scripts
├── .eslintrc.json      # ESLint configuration
├── LICENSE             # MIT License
├── .gitignore          # Git ignore rules
└── README.md           # Documentation
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

- **HTML5**: Semantic structure with meta tags
- **CSS3**: Modern styling with CSS variables, flexbox, grid, and animations
- **JavaScript ES6+**: Application logic with classes and modern syntax
- **ES Modules**: Modular JavaScript for better organization
- **LocalStorage**: Data persistence in the browser

## 📱 Responsive Design

The application is fully responsive and adapts to different screen sizes:
- **Desktop**: Full layout with all features
- **Tablet**: Adapted controls and tables
- **Mobile**: Touch-optimized interface with larger buttons

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