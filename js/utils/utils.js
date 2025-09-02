// Utility functions for the Debt Manager application

/**
 * Format currency based on locale and currency code
 * @param {number} value - The numeric value to format
 * @param {string} locale - The locale code (e.g., 'en-US', 'pt-BR')
 * @param {string} currency - The currency code (e.g., 'USD', 'BRL')
 * @returns {string} Formatted currency string
 */
export function formatCurrency(value, locale, currency) {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency
    }).format(value);
}

/**
 * Get browser language preference
 * @returns {string} Detected language code
 */
export function getBrowserLanguage() {
    const browserLanguage = navigator.language || navigator.userLanguage;
    const isPortuguese = browserLanguage.toLowerCase().startsWith('pt');
    return isPortuguese ? 'pt-BR' : 'en';
}

/**
 * Save data to localStorage
 * @param {string} key - The key to save data under
 * @param {any} data - The data to save
 */
export function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

/**
 * Load data from localStorage
 * @param {string} key - The key to load data from
 * @param {any} defaultValue - Default value if key doesn't exist
 * @returns {any} The loaded data or default value
 */
export function loadFromLocalStorage(key, defaultValue = null) {
    const savedData = localStorage.getItem(key);
    if (savedData) {
        try {
            return JSON.parse(savedData);
        } catch (e) {
            console.error(`Error loading saved data for key ${key}:`, e);
        }
    }
    return defaultValue;
}

/**
 * Show temporary notification
 * @param {string} elementId - The ID of the element to show
 * @param {number} duration - Duration in milliseconds (default: 2000)
 */
export function showNotification(elementId, duration = 2000) {
    const indicator = document.getElementById(elementId);
    if (indicator) {
        indicator.classList.add('show');
        setTimeout(() => {
            indicator.classList.remove('show');
        }, duration);
    }
}

/**
 * Create and dispatch a custom event
 * @param {string} eventName - Name of the event
 * @param {object} detail - Event details
 */
export function dispatchCustomEvent(eventName, detail = {}) {
    const event = new CustomEvent(eventName, { detail });
    document.dispatchEvent(event);
}