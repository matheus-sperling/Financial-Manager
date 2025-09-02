/**
 * State Management Pattern
 * Centralized state management for the application
 */
export class StateManager {
    constructor(initialState = {}) {
        this.state = { ...initialState };
        this.listeners = new Set();
        this.history = [{ ...initialState }];
        this.historyIndex = 0;
        this.maxHistorySize = 50;
    }

    /**
     * Get the current state
     * @returns {Object} Current state
     */
    getState() {
        return { ...this.state };
    }

    /**
     * Update the state
     * @param {Object|Function} updates - Object with updates or updater function
     * @param {boolean} saveToHistory - Whether to save to history (default: true)
     */
    setState(updates, saveToHistory = true) {
        const prevState = { ...this.state };
        
        if (typeof updates === 'function') {
            this.state = { ...this.state, ...updates(this.state) };
        } else {
            this.state = { ...this.state, ...updates };
        }

        if (saveToHistory) {
            this.saveToHistory();
        }

        // Notify all listeners
        this.notifyListeners(prevState, this.state);
    }

    /**
     * Subscribe to state changes
     * @param {Function} listener - Callback function
     * @returns {Function} Unsubscribe function
     */
    subscribe(listener) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }

    /**
     * Notify all listeners of state changes
     * @param {Object} prevState - Previous state
     * @param {Object} newState - New state
     */
    notifyListeners(prevState, newState) {
        this.listeners.forEach(listener => {
            try {
                listener(newState, prevState);
            } catch (error) {
                console.error('Error in state listener:', error);
            }
        });
    }

    /**
     * Save current state to history
     */
    saveToHistory() {
        // Remove any history after current index (for undo/redo functionality)
        this.history = this.history.slice(0, this.historyIndex + 1);
        
        // Add new state to history
        this.history.push({ ...this.state });
        
        // Limit history size
        if (this.history.length > this.maxHistorySize) {
            this.history = this.history.slice(-this.maxHistorySize);
        }
        
        this.historyIndex = this.history.length - 1;
    }

    /**
     * Undo the last state change
     * @returns {boolean} Whether undo was successful
     */
    undo() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            const prevState = { ...this.state };
            this.state = { ...this.history[this.historyIndex] };
            this.notifyListeners(prevState, this.state);
            return true;
        }
        return false;
    }

    /**
     * Redo the next state change
     * @returns {boolean} Whether redo was successful
     */
    redo() {
        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            const prevState = { ...this.state };
            this.state = { ...this.history[this.historyIndex] };
            this.notifyListeners(prevState, this.state);
            return true;
        }
        return false;
    }

    /**
     * Check if undo is available
     * @returns {boolean} Whether undo is available
     */
    canUndo() {
        return this.historyIndex > 0;
    }

    /**
     * Check if redo is available
     * @returns {boolean} Whether redo is available
     */
    canRedo() {
        return this.historyIndex < this.history.length - 1;
    }

    /**
     * Reset state to initial value
     * @param {Object} newInitialState - New initial state (optional)
     */
    reset(newInitialState = {}) {
        const prevState = { ...this.state };
        this.state = { ...newInitialState };
        this.history = [{ ...newInitialState }];
        this.historyIndex = 0;
        this.notifyListeners(prevState, this.state);
    }

    /**
     * Get a specific property from state with optional default value
     * @param {string} path - Property path (dot notation supported)
     * @param {*} defaultValue - Default value if property doesn't exist
     * @returns {*} Property value
     */
    get(path, defaultValue = undefined) {
        const keys = path.split('.');
        let current = this.state;
        
        for (const key of keys) {
            if (current === null || current === undefined || !(key in current)) {
                return defaultValue;
            }
            current = current[key];
        }
        
        return current;
    }

    /**
     * Set a specific property in state using dot notation
     * @param {string} path - Property path (dot notation)
     * @param {*} value - Value to set
     */
    set(path, value) {
        const keys = path.split('.');
        const lastKey = keys.pop();
        
        const updates = { ...this.state };
        let current = updates;
        
        for (const key of keys) {
            if (!(key in current) || typeof current[key] !== 'object') {
                current[key] = {};
            }
            current = current[key];
        }
        
        current[lastKey] = value;
        this.setState(updates);
    }

    /**
     * Create a computed property that updates when dependencies change
     * @param {Function} computeFn - Function that computes the value
     * @param {string[]} dependencies - Array of state paths this computation depends on
     * @returns {Function} Function to get the computed value
     */
    createComputed(computeFn, dependencies = []) {
        let cachedValue;
        let lastDependencyValues = [];
        
        return () => {
            const currentDependencyValues = dependencies.map(dep => this.get(dep));
            const hasChanged = currentDependencyValues.some((val, index) => 
                val !== lastDependencyValues[index]);
            
            if (hasChanged || cachedValue === undefined) {
                cachedValue = computeFn(this.state);
                lastDependencyValues = currentDependencyValues;
            }
            
            return cachedValue;
        };
    }
}