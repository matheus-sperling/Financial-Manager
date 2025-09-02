/**
 * Factory Pattern Implementation
 * Creates different types of UI components and validation rules
 */

/**
 * Factory for creating different types of validation rules
 */
export class ValidatorFactory {
    static createValidator(type, options = {}) {
        const validators = {
            required: (value) => {
                const isValid = value !== null && value !== undefined && value.toString().trim() !== '';
                return { isValid, message: options.message || 'This field is required' };
            },

            number: (value) => {
                const numValue = parseFloat(value);
                const isValid = !isNaN(numValue) && isFinite(numValue);
                return { isValid, message: options.message || 'Please enter a valid number' };
            },

            positiveNumber: (value) => {
                const numValue = parseFloat(value);
                const isValid = !isNaN(numValue) && isFinite(numValue) && numValue > 0;
                return { isValid, message: options.message || 'Please enter a number greater than zero' };
            },

            minLength: (value) => {
                const minLength = options.length || 1;
                const isValid = value && value.toString().trim().length >= minLength;
                return { 
                    isValid, 
                    message: options.message || `Must be at least ${minLength} characters long` 
                };
            },

            maxLength: (value) => {
                const maxLength = options.length || 100;
                const isValid = !value || value.toString().length <= maxLength;
                return { 
                    isValid, 
                    message: options.message || `Must be no more than ${maxLength} characters long` 
                };
            },

            unique: (value, existingValues = []) => {
                const isValid = !existingValues.includes(value);
                return { 
                    isValid, 
                    message: options.message || 'This value already exists' 
                };
            }
        };

        return validators[type] || (() => ({ isValid: true, message: '' }));
    }

    /**
     * Create a composite validator from multiple validation rules
     * @param {Array} validatorConfigs - Array of {type, options} objects
     * @returns {Function} Composite validator function
     */
    static createCompositeValidator(validatorConfigs) {
        return (value, context = {}) => {
            for (const config of validatorConfigs) {
                const validator = this.createValidator(config.type, config.options);
                const result = validator(value, context.existingValues);
                if (!result.isValid) {
                    return result;
                }
            }
            return { isValid: true, message: '' };
        };
    }
}

/**
 * Factory for creating UI components
 */
export class ComponentFactory {
    /**
     * Create different types of input components
     * @param {string} type - Type of input (text, number, etc.)
     * @param {Object} config - Configuration object
     * @returns {HTMLElement} Created input element
     */
    static createInput(type, config = {}) {
        const input = document.createElement('input');
        input.type = type;
        
        if (config.id) input.id = config.id;
        if (config.className) input.className = config.className;
        if (config.placeholder) input.placeholder = config.placeholder;
        if (config.value !== undefined) input.value = config.value;
        if (config.min !== undefined) input.min = config.min;
        if (config.max !== undefined) input.max = config.max;
        if (config.required) input.required = config.required;
        
        return input;
    }

    /**
     * Create different types of button components
     * @param {string} variant - Button variant (primary, secondary, danger, etc.)
     * @param {Object} config - Configuration object
     * @returns {HTMLElement} Created button element
     */
    static createButton(variant, config = {}) {
        const button = document.createElement('button');
        
        const variants = {
            primary: 'btn btn-primary',
            secondary: 'btn btn-secondary',
            danger: 'btn btn-remove',
            warning: 'btn btn-repeat',
            edit: 'btn btn-edit',
            toggle: 'btn btn-toggle'
        };
        
        button.className = variants[variant] || 'btn';
        
        if (config.id) button.id = config.id;
        if (config.text) button.textContent = config.text;
        if (config.title) button.title = config.title;
        if (config.onclick) button.onclick = config.onclick;
        if (config.disabled) button.disabled = config.disabled;
        
        return button;
    }

    /**
     * Create a modal dialog
     * @param {Object} config - Modal configuration
     * @returns {Object} Modal object with show/hide methods
     */
    static createModal(config = {}) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = config.id || 'modal';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        
        const title = document.createElement('div');
        title.className = 'modal-title';
        title.textContent = config.title || '';
        
        const message = document.createElement('div');
        message.className = 'modal-message';
        message.textContent = config.message || '';
        
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'modal-buttons';
        
        modalContent.appendChild(title);
        modalContent.appendChild(message);
        modalContent.appendChild(buttonContainer);
        modal.appendChild(modalContent);
        
        return {
            element: modal,
            show: () => modal.classList.add('show'),
            hide: () => modal.classList.remove('show'),
            setTitle: (newTitle) => title.textContent = newTitle,
            setMessage: (newMessage) => message.textContent = newMessage,
            addButton: (button) => buttonContainer.appendChild(button)
        };
    }
}

/**
 * Factory for creating formatters
 */
export class FormatterFactory {
    static createFormatter(type, options = {}) {
        const formatters = {
            currency: (value) => {
                const locale = options.locale || 'en-US';
                const currency = options.currency || 'USD';
                return new Intl.NumberFormat(locale, {
                    style: 'currency',
                    currency: currency
                }).format(value);
            },

            number: (value) => {
                const locale = options.locale || 'en-US';
                return new Intl.NumberFormat(locale, {
                    minimumFractionDigits: options.minimumFractionDigits || 0,
                    maximumFractionDigits: options.maximumFractionDigits || 2
                }).format(value);
            },

            date: (value) => {
                const locale = options.locale || 'en-US';
                const date = new Date(value);
                return date.toLocaleDateString(locale, options.dateOptions || {});
            },

            percentage: (value) => {
                const locale = options.locale || 'en-US';
                return new Intl.NumberFormat(locale, {
                    style: 'percent',
                    minimumFractionDigits: options.minimumFractionDigits || 0,
                    maximumFractionDigits: options.maximumFractionDigits || 2
                }).format(value);
            }
        };

        return formatters[type] || ((value) => value.toString());
    }
}