// UI Components and DOM manipulation functions

/**
 * Modal component for displaying confirmation dialogs
 */
export class Modal {
    /**
     * Show confirmation modal
     * @param {object} options - Modal options
     * @param {string} options.title - Modal title
     * @param {string} options.message - Modal message
     * @param {Function} options.onConfirm - Confirm callback
     * @param {Function} options.onCancel - Cancel callback
     * @param {object} translations - Translation object
     * @param {string} currentLanguage - Current language code
     */
    static showConfirm(options, translations, currentLanguage) {
        const modal = document.getElementById('confirmModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalMessage = document.getElementById('modalMessage');
        const modalConfirmBtn = document.getElementById('modalConfirm');
        const modalCancelBtn = document.getElementById('modalCancel');

        modalTitle.textContent = options.title || translations[currentLanguage]['confirm_action'];
        modalMessage.textContent = options.message || translations[currentLanguage]['default_action_confirm'];
        
        modalConfirmBtn.textContent = translations[currentLanguage]['confirm'];
        modalCancelBtn.textContent = translations[currentLanguage]['cancel'];
        
        modal.classList.add('show');
        
        // Remove existing event listeners by cloning
        modalConfirmBtn.replaceWith(modalConfirmBtn.cloneNode(true));
        modalCancelBtn.replaceWith(modalCancelBtn.cloneNode(true));
        
        const newConfirmBtn = document.getElementById('modalConfirm');
        const newCancelBtn = document.getElementById('modalCancel');
        
        newConfirmBtn.textContent = translations[currentLanguage]['confirm'];
        newCancelBtn.textContent = translations[currentLanguage]['cancel'];
        
        newConfirmBtn.onclick = () => {
            modal.classList.remove('show');
            if (options.onConfirm) options.onConfirm();
        };
        
        newCancelBtn.onclick = () => {
            modal.classList.remove('show');
            if (options.onCancel) options.onCancel();
        };
        
        modal.onclick = (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
                if (options.onCancel) options.onCancel();
            }
        };
    }
}

/**
 * Add Person Modal component
 */
export class AddPersonModal {
    /**
     * Setup the add person modal
     * @param {Function} onAddPerson - Callback when person is added
     * @param {object} translations - Translation object
     * @param {string} currentLanguage - Current language code
     */
    static setup(onAddPerson) {
        const addPersonModal = document.getElementById('addPersonModal');
        const addPersonConfirm = document.getElementById('addPersonConfirm');
        const addPersonCancel = document.getElementById('addPersonCancel');
        const personNameInput = document.getElementById('personNameInput');

        const addPerson = () => {
            const personName = personNameInput.value.trim();
            if (onAddPerson(personName)) {
                addPersonModal.classList.remove('show');
                personNameInput.value = '';
            }
        };

        addPersonConfirm.onclick = addPerson;

        addPersonCancel.onclick = () => {
            addPersonModal.classList.remove('show');
            personNameInput.value = '';
        };

        addPersonModal.onclick = (e) => {
            if (e.target === addPersonModal) {
                addPersonModal.classList.remove('show');
                personNameInput.value = '';
            }
        };

        personNameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addPerson();
            }
        });
    }

    /**
     * Show the add person modal
     */
    static show() {
        const addPersonModal = document.getElementById('addPersonModal');
        const personNameInput = document.getElementById('personNameInput');
        addPersonModal.classList.add('show');
        setTimeout(() => personNameInput.focus(), 100);
    }
}

/**
 * Theme toggle component
 */
export class ThemeToggle {
    /**
     * Apply theme to document
     * @param {string} theme - Theme to apply ('light' or 'dark')
     */
    static applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }

    /**
     * Toggle between light and dark themes
     * @param {string} currentTheme - Current theme
     * @param {Function} onSaveTheme - Callback to save theme preference
     */
    static toggle(currentTheme, onSaveTheme) {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
        if (onSaveTheme) onSaveTheme(newTheme);
    }
}

/**
 * Language toggle component
 */
export class LanguageToggle {
    /**
     * Apply language to UI elements
     * @param {string} language - Language code
     */
    static applyLanguage(language) {
        document.documentElement.lang = language;
        const languageFlag = document.getElementById('languageFlag');
        if (languageFlag) {
            languageFlag.textContent = language === 'pt-BR' ? '🇧🇷' : '🇺🇸';
        }
    }

    /**
     * Toggle between languages
     * @param {string} currentLanguage - Current language
     * @param {Function} onSaveLanguage - Callback to save language preference
     */
    static toggle(currentLanguage, onSaveLanguage) {
        const newLanguage = currentLanguage === 'pt-BR' ? 'en' : 'pt-BR';
        this.applyLanguage(newLanguage);
        if (onSaveLanguage) onSaveLanguage(newLanguage);
    }
}