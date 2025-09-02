// Main application entry point
import DebtManager from './modules/DebtManager.js';

// Initialize the main debt manager instance
const debtManager = new DebtManager();

// Global function to show add person modal
function addNewPerson() {
    debtManager.showAddPersonModal();
}

// Global function to clear all debts
function clearAllDebts() {
    debtManager.clearAllDebts();
}

// Make functions available globally
window.debtManager = debtManager;
window.addNewPerson = addNewPerson;
window.clearAllDebts = clearAllDebts;