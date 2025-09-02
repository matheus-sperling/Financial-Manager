// Main application class responsible for managing debts, themes, and languages
class DebtManager {
    // Constructor initializes the debt manager with saved data and settings
    constructor() {
        this.debts = this.loadData();
        this.draggedPersonElement = null;
        this.draggedDebtElement = null;
        this.currentTheme = this.loadTheme();
        this.currentLanguage = this.loadLanguage();
        this.translations = this.getTranslations();
        this.init();
    }

    // Initialize the application components and event listeners
    init() {
        this.applyTheme(this.currentTheme);
        this.applyLanguage(this.currentLanguage);
        this.setupAddPersonModal();
        this.renderDebts();
        window.addEventListener('beforeunload', () => this.saveData());
    }

    // Load theme preference from localStorage or default to light theme
    loadTheme() {
        return localStorage.getItem('theme') || 'light';
    }

    // Save current theme preference to localStorage
    saveTheme(theme) {
        localStorage.setItem('theme', theme);
    }

    // Apply the selected theme to the document and update theme icon
    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
        this.currentTheme = theme;
    }

    // Toggle between light and dark themes
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
        this.saveTheme(newTheme);
    }

    // Load language preference from localStorage or detect from browser locale
    loadLanguage() {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            return savedLanguage;
        }
        
        // Auto-detect language from browser locale
        const browserLanguage = navigator.language || navigator.userLanguage;
        const isPortuguese = browserLanguage.toLowerCase().startsWith('pt');
        return isPortuguese ? 'pt-BR' : 'en';
    }

    // Save current language preference to localStorage
    saveLanguage(language) {
        localStorage.setItem('language', language);
    }

    // Return translation object containing all text in Portuguese and English
    getTranslations() {
        return {
            'pt-BR': {
                title: '💰 Gerenciador de Dívidas',
                subtitle: 'Controle suas dívidas com outras pessoas',
                theme_toggle: 'Alternar modo escuro/claro',
                total_to_pay: 'Total a Pagar',
                total_people: 'Total de Pessoas',
                hidden_debts: 'Dívidas Ocultas',
                how_to_use: 'Como usar:',
                instructions: 'Adicione pessoas e suas respectivas dívidas. Use "Editar" para modificar descrição e valor. Use "Duplicar" para facilmente duplicar uma dívida. Marque "Ocultar" para excluir do cálculo total (útil para dívidas pagas ou em disputa).',
                drag_drop: 'Arrastar e soltar:',
                drag_instructions: 'Use o ícone ⋮⋮ para arrastar pessoas, ou arraste qualquer linha da tabela para reordenar as dívidas.',
                add_new_person: '➕ Adicionar Nova Pessoa',
                clear_all_debts: '🗑️ Limpar Todas as Dívidas',
                data_saved: '💾 Dados salvos automaticamente',
                confirm_action: '⚠️ Confirmar Ação',
                confirm: '✅ Confirmar',
                cancel: '❌ Cancelar',
                add_new_person_title: '👤 Adicionar Nova Pessoa',
                person_name_placeholder: 'Nome da pessoa',
                add: '➕ Adicionar',
                change_language: 'Alterar idioma',
                i_owe_to: 'Devo para:',
                description: 'Descrição',
                amount: 'Valor',
                hidden: 'Oculto',
                actions: 'Ações',
                visible: 'Visível',
                edit: '✏️ Editar',
                duplicate: '🔄 Duplicar',
                remove: '🗑️ Remover',
                debt_description_placeholder: 'Descrição da dívida',
                amount_placeholder: 'Valor (R$)',
                add_debt: 'Adicionar Dívida',
                remove_person: 'Remover',
                edit_debt_description: 'Editar descrição da dívida:',
                edit_debt_amount: 'Editar valor da dívida (R$):',
                edit_person_name: 'Editar nome da pessoa:',
                description_empty_error: 'A descrição não pode estar vazia.',
                person_name_empty_error: 'O nome da pessoa não pode estar vazio.',
                invalid_amount_error: 'Por favor, insira um valor válido maior que zero.',
                fill_fields_error: 'Por favor, preencha a descrição e um valor válido.',
                person_exists_error: 'Esta pessoa já existe!',
                remove_debt_confirm: '🗑️ Remover Dívida',
                remove_debt_message: 'Tem certeza de que deseja remover a dívida "{description}" no valor de {amount}?',
                remove_person_confirm: '🗑️ Remover Pessoa',
                remove_person_message: 'Tem certeza de que deseja remover {person} e todas as {count} dívidas (total: {total})?',
                clear_all_confirm: '🗑️ Limpar Todas as Dívidas',
                clear_all_message: 'Tem certeza de que deseja limpar TODAS as dívidas de {count} pessoas (total: {total})? Esta ação não pode ser desfeita.',
                new_person_name: 'Nome da nova pessoa:',
                default_action_confirm: 'Tem certeza de que deseja realizar esta ação?',
                ok: 'OK',
                information: 'ℹ️ Informação',
                input: '✏️ Entrada',
                enter_value: 'Por favor, insira um valor:'
            },
            'en': {
                title: '💰 Debt Manager',
                subtitle: 'Track your debts with other people',
                theme_toggle: 'Toggle dark/light mode',
                total_to_pay: 'Total to Pay',
                total_people: 'Total People',
                hidden_debts: 'Hidden Debts',
                how_to_use: 'How to use:',
                instructions: 'Add people and their respective debts. Use "Edit" to modify description and amount. Use "Duplicate" to easily duplicate a debt. Check "Hidden" to exclude from total calculation (useful for paid debts or disputes).',
                drag_drop: 'Drag and drop:',
                drag_instructions: 'Use the ⋮⋮ icon to drag people, or drag any table row to reorder debts.',
                add_new_person: '➕ Add New Person',
                clear_all_debts: '🗑️ Clear All Debts',
                data_saved: '💾 Data saved automatically',
                confirm_action: '⚠️ Confirm Action',
                confirm: '✅ Confirm',
                cancel: '❌ Cancel',
                add_new_person_title: '👤 Add New Person',
                person_name_placeholder: 'Person\'s name',
                add: '➕ Add',
                change_language: 'Change language',
                i_owe_to: 'I owe to:',
                description: 'Description',
                amount: 'Amount',
                hidden: 'Hidden',
                actions: 'Actions',
                visible: 'Visible',
                edit: '✏️ Edit',
                duplicate: '🔄 Duplicate',
                remove: '🗑️ Remove',
                debt_description_placeholder: 'Debt description',
                amount_placeholder: 'Amount ($)',
                add_debt: 'Add Debt',
                remove_person: 'Remove',
                edit_debt_description: 'Edit debt description:',
                edit_debt_amount: 'Edit debt amount ($):',
                edit_person_name: 'Edit person name:',
                description_empty_error: 'Description cannot be empty.',
                person_name_empty_error: 'Person name cannot be empty.',
                invalid_amount_error: 'Please enter a valid amount greater than zero.',
                fill_fields_error: 'Please fill in the description and a valid amount.',
                person_exists_error: 'This person already exists!',
                remove_debt_confirm: '🗑️ Remove Debt',
                remove_debt_message: 'Are you sure you want to remove the debt "{description}" valued at {amount}?',
                remove_person_confirm: '🗑️ Remove Person',
                remove_person_message: 'Are you sure you want to remove {person} and all {count} debts (total: {total})?',
                clear_all_confirm: '🗑️ Clear All Debts',
                clear_all_message: 'Are you sure you want to clear ALL debts from {count} people (total: {total})? This action cannot be undone.',
                new_person_name: 'Name of the new person:',
                default_action_confirm: 'Are you sure you want to perform this action?',
                ok: 'OK',
                information: 'ℹ️ Information',
                input: '✏️ Input',
                enter_value: 'Please enter a value:'
            }
        };
    }

    // Translate a text key to current language with optional parameter substitution
    translate(key, params = {}) {
        let text = this.translations[this.currentLanguage][key] || key;
        
        Object.keys(params).forEach(param => {
            text = text.replace(`{${param}}`, params[param]);
        });
        
        return text;
    }

    // Apply selected language to all UI elements and update flag
    applyLanguage(language) {
        this.currentLanguage = language;
        
        document.documentElement.lang = language;
        document.title = this.translate('title');
        
        const languageFlag = document.getElementById('languageFlag');
        if (languageFlag) {
            languageFlag.textContent = language === 'pt-BR' ? '🇧🇷' : '🇺🇸';
        }
        
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            element.textContent = this.translate(key);
        });
        
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            element.title = this.translate(key);
        });
        
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = this.translate(key);
        });
        
        this.updateSummary();
    }

    // Toggle between Portuguese and English languages
    toggleLanguage() {
        const newLanguage = this.currentLanguage === 'pt-BR' ? 'en' : 'pt-BR';
        this.applyLanguage(newLanguage);
        this.saveLanguage(newLanguage);
        
        // Translate existing default examples if present
        const wasTranslated = this.translateExistingData();
        if (wasTranslated) {
            this.saveData();
        }
        
        this.renderDebts();
    }

    // Setup event listeners and behavior for the add person modal
    setupAddPersonModal() {
        const addPersonModal = document.getElementById('addPersonModal');
        const addPersonConfirm = document.getElementById('addPersonConfirm');
        const addPersonCancel = document.getElementById('addPersonCancel');
        const personNameInput = document.getElementById('personNameInput');

        addPersonConfirm.onclick = () => {
            const personName = personNameInput.value.trim();
            if (personName && !this.debts[personName]) {
                this.debts[personName] = [];
                this.saveData();
                this.renderDebts();
                addPersonModal.classList.remove('show');
                personNameInput.value = '';
            } else if (this.debts[personName]) {
                this.showAlertModal(
                    this.translate('information'),
                    this.translate('person_exists_error')
                );
            }
        };

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
                addPersonConfirm.click();
            }
        });
    }

    // Display the add person modal and focus on input field
    showAddPersonModal() {
        const addPersonModal = document.getElementById('addPersonModal');
        const personNameInput = document.getElementById('personNameInput');
        addPersonModal.classList.add('show');
        setTimeout(() => personNameInput.focus(), 100);
    }

    // Load debt data from localStorage or return default data if none exists
    loadData() {
        const savedData = localStorage.getItem('debtManager');
        if (savedData) {
            try {
                return JSON.parse(savedData);
            } catch (e) {
                console.error('Error loading saved data:', e);
            }
        }
        return this.getDefaultData();
    }

    // Return sample default data for demonstration purposes based on current language
    getDefaultData() {
        if (this.currentLanguage === 'pt-BR') {
            return {
                'João': [
                    { description: 'Almoço no restaurante', value: 25.50, hidden: false },
                    { description: 'Lanchonete', value: 8.00, hidden: false }
                ],
                'Maria': [
                    { description: 'Ingressos do cinema', value: 15.00, hidden: false },
                    { description: 'Lanches', value: 12.50, hidden: false },
                    { description: 'Passagem de ônibus', value: 4.50, hidden: true }
                ]
            };
        } else {
            return {
                'John': [
                    { description: 'Restaurant lunch', value: 25.50, hidden: false },
                    { description: 'Coffee shop', value: 8.00, hidden: false }
                ],
                'Mary': [
                    { description: 'Movie tickets', value: 15.00, hidden: false },
                    { description: 'Snacks', value: 12.50, hidden: false },
                    { description: 'Bus fare', value: 4.50, hidden: true }
                ]
            };
        }
    }

    // Translate existing default data when language changes
    translateExistingData() {
        // Define translation mappings for default data
        const translations = {
            // English to Portuguese
            'en-to-pt': {
                names: { 'John': 'João', 'Mary': 'Maria' },
                descriptions: {
                    'Restaurant lunch': 'Almoço no restaurante',
                    'Coffee shop': 'Lanchonete',
                    'Movie tickets': 'Ingressos do cinema',
                    'Snacks': 'Lanches',
                    'Bus fare': 'Passagem de ônibus'
                }
            },
            // Portuguese to English
            'pt-to-en': {
                names: { 'João': 'John', 'Maria': 'Mary' },
                descriptions: {
                    'Almoço no restaurante': 'Restaurant lunch',
                    'Lanchonete': 'Coffee shop',
                    'Ingressos do cinema': 'Movie tickets',
                    'Lanches': 'Snacks',
                    'Passagem de ônibus': 'Bus fare'
                }
            }
        };

        const translationKey = this.currentLanguage === 'pt-BR' ? 'en-to-pt' : 'pt-to-en';
        const nameMap = translations[translationKey].names;
        const descMap = translations[translationKey].descriptions;
        
        // Check if current data contains default examples to translate
        const newDebts = {};
        let hasChanges = false;
        
        Object.keys(this.debts).forEach(person => {
            const newPersonName = nameMap[person] || person;
            if (newPersonName !== person) {
                hasChanges = true;
            }
            
            const translatedDebts = this.debts[person].map(debt => {
                const newDescription = descMap[debt.description] || debt.description;
                return {
                    ...debt,
                    description: newDescription
                };
            });
            
            newDebts[newPersonName] = translatedDebts;
        });
        
        // Only update if we found translations
        if (hasChanges) {
            this.debts = newDebts;
            return true;
        }
        
        return false;
    }

    // Save current debt data to localStorage and show save indicator
    saveData() {
        localStorage.setItem('debtManager', JSON.stringify(this.debts));
        this.showSaveIndicator();
    }

    // Display temporary save confirmation indicator
    showSaveIndicator() {
        const indicator = document.getElementById('saveIndicator');
        indicator.classList.add('show');
        setTimeout(() => {
            indicator.classList.remove('show');
        }, 2000);
    }

    // Display confirmation modal with custom title, message and callback
    showConfirmModal(title, message, onConfirm) {
        const modal = document.getElementById('confirmModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalMessage = document.getElementById('modalMessage');
        const modalConfirmBtn = document.getElementById('modalConfirm');
        const modalCancelBtn = document.getElementById('modalCancel');

        modalTitle.textContent = title || this.translate('confirm_action');
        modalMessage.textContent = message || this.translate('default_action_confirm');
        
        modalConfirmBtn.textContent = this.translate('confirm');
        modalCancelBtn.textContent = this.translate('cancel');
        
        modal.classList.add('show');
        
        modalConfirmBtn.replaceWith(modalConfirmBtn.cloneNode(true));
        modalCancelBtn.replaceWith(modalCancelBtn.cloneNode(true));
        
        const newConfirmBtn = document.getElementById('modalConfirm');
        const newCancelBtn = document.getElementById('modalCancel');
        
        newConfirmBtn.textContent = this.translate('confirm');
        newCancelBtn.textContent = this.translate('cancel');
        
        newConfirmBtn.onclick = () => {
            modal.classList.remove('show');
            onConfirm();
        };
        
        newCancelBtn.onclick = () => {
            modal.classList.remove('show');
        };
        
        modal.onclick = (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        };
    }

    // Display alert modal with custom title and message
    showAlertModal(title, message) {
        return new Promise((resolve) => {
            const modal = document.getElementById('alertModal');
            const modalTitle = document.getElementById('alertTitle');
            const modalMessage = document.getElementById('alertMessage');
            const modalOkBtn = document.getElementById('alertOk');

            modalTitle.textContent = title || this.translate('information');
            modalMessage.textContent = message || '';
            modalOkBtn.textContent = this.translate('ok') || 'OK';
            
            modal.classList.add('show');
            
            // Clone button to remove old event listeners
            modalOkBtn.replaceWith(modalOkBtn.cloneNode(true));
            const newOkBtn = document.getElementById('alertOk');
            newOkBtn.textContent = this.translate('ok') || 'OK';
            
            const closeModal = () => {
                modal.classList.remove('show');
                resolve();
            };
            
            newOkBtn.onclick = closeModal;
            
            modal.onclick = (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            };
        });
    }

    // Display prompt modal for user input
    showPromptModal(title, message, defaultValue = '') {
        return new Promise((resolve) => {
            const modal = document.getElementById('promptModal');
            const modalTitle = document.getElementById('promptTitle');
            const modalMessage = document.getElementById('promptMessage');
            const modalInput = document.getElementById('promptInput');
            const modalConfirmBtn = document.getElementById('promptConfirm');
            const modalCancelBtn = document.getElementById('promptCancel');

            modalTitle.textContent = title || this.translate('input');
            modalMessage.textContent = message || this.translate('enter_value');
            modalInput.value = defaultValue;
            modalConfirmBtn.textContent = this.translate('confirm');
            modalCancelBtn.textContent = this.translate('cancel');
            
            modal.classList.add('show');
            
            // Focus on input after modal opens
            setTimeout(() => {
                modalInput.focus();
                modalInput.select();
            }, 100);
            
            // Clone buttons to remove old event listeners
            modalConfirmBtn.replaceWith(modalConfirmBtn.cloneNode(true));
            modalCancelBtn.replaceWith(modalCancelBtn.cloneNode(true));
            
            const newConfirmBtn = document.getElementById('promptConfirm');
            const newCancelBtn = document.getElementById('promptCancel');
            
            newConfirmBtn.textContent = this.translate('confirm');
            newCancelBtn.textContent = this.translate('cancel');
            
            const confirmAction = () => {
                modal.classList.remove('show');
                resolve(modalInput.value);
            };
            
            const cancelAction = () => {
                modal.classList.remove('show');
                resolve(null);
            };
            
            newConfirmBtn.onclick = confirmAction;
            newCancelBtn.onclick = cancelAction;
            
            // Handle Enter key
            modalInput.onkeypress = (e) => {
                if (e.key === 'Enter') {
                    confirmAction();
                }
            };
            
            modal.onclick = (e) => {
                if (e.target === modal) {
                    cancelAction();
                }
            };
        });
    }

    // Format numeric value as currency based on current language (BRL/USD)
    formatCurrency(value) {
        const locale = this.currentLanguage === 'pt-BR' ? 'pt-BR' : 'en-US';
        const currency = this.currentLanguage === 'pt-BR' ? 'BRL' : 'USD';
        
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency
        }).format(value);
    }

    // Calculate total debt amount for a person, optionally including hidden debts
    calculatePersonTotal(personDebts, includeHidden = false) {
        return personDebts.reduce((sum, debt) => {
            return sum + (includeHidden || !debt.hidden ? debt.value : 0);
        }, 0);
    }

    // Calculate total debt amount across all people (excluding hidden debts)
    calculateTotalDebt() {
        let total = 0;
        for (const person in this.debts) {
            total += this.calculatePersonTotal(this.debts[person], false);
        }
        return total;
    }

    // Calculate total amount of hidden debts across all people
    calculateHiddenDebt() {
        let total = 0;
        for (const person in this.debts) {
            total += this.debts[person].reduce((sum, debt) => {
                return sum + (debt.hidden ? debt.value : 0);
            }, 0);
        }
        return total;
    }

    // Update summary cards with current debt statistics
    updateSummary() {
        document.getElementById('totalDebt').textContent = this.formatCurrency(this.calculateTotalDebt());
        document.getElementById('totalPeople').textContent = Object.keys(this.debts).length;
        document.getElementById('hiddenDebt').textContent = this.formatCurrency(this.calculateHiddenDebt());
    }

    // Render the complete debt list interface for all people
    renderDebts() {
        const debtsList = document.getElementById('debtsList');
        debtsList.innerHTML = '';

        // Remove the unused peopleKeys variable
        Object.keys(this.debts).forEach((person, personIndex) => {
            const personSection = document.createElement('div');
            personSection.className = 'person-section';
            personSection.draggable = false;
            personSection.dataset.person = person;
            personSection.dataset.index = personIndex;
            
            const personTotal = this.calculatePersonTotal(this.debts[person], false);
            const personTotalWithHidden = this.calculatePersonTotal(this.debts[person], true);
            
            personSection.innerHTML = `
                <div class="person-header">
                    <div class="person-name">
                        <span class="drag-handle" title="${this.translate('drag_drop')}">⋮⋮</span>
                        <span onclick="debtManager.editPersonName('${person}')" class="editable-name" title="Clique para editar">
                            ${this.translate('i_owe_to')} ${person}
                        </span>
                    </div>
                    <div class="person-controls">
                        <div class="person-total">
                            ${this.formatCurrency(personTotal)}
                            ${personTotalWithHidden !== personTotal ? ` (${this.formatCurrency(personTotalWithHidden)} total)` : ''}
                        </div>
                    </div>
                </div>
                
                <table class="debt-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>${this.translate('description')}</th>
                            <th>${this.translate('amount')}</th>
                            <th>${this.translate('hidden')}</th>
                            <th>${this.translate('actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.debts[person].map((debt, index) => `
                            <tr class="${debt.hidden ? 'hidden-debt' : ''}" 
                                draggable="true" 
                                data-person="${person}" 
                                data-index="${index}">
                                <td>
                                    <span class="drag-handle" title="${this.translate('drag_drop')}">⋮⋮</span>
                                </td>
                                <td>${debt.description}</td>
                                <td class="value">${this.formatCurrency(debt.value)}</td>
                                <td>
                                    <div class="checkbox-wrapper">
                                        <input type="checkbox" 
                                               id="hidden-${person}-${index}" 
                                               ${debt.hidden ? 'checked' : ''}
                                               onchange="debtManager.toggleDebtVisibility('${person}', ${index})">
                                        <label for="hidden-${person}-${index}" class="hidden-label">
                                            ${debt.hidden ? this.translate('hidden') : this.translate('visible')}
                                        </label>
                                    </div>
                                </td>
                                <td>
                                    <div class="actions-cell">
                                        <button class="btn btn-edit" onclick="debtManager.editDebt('${person}', ${index})" title="${this.translate('edit')}">
                                            ${this.translate('edit')}
                                        </button>
                                        <button class="btn btn-repeat" onclick="debtManager.repeatDebt('${person}', ${index})" title="${this.translate('duplicate')}">
                                            ${this.translate('duplicate')}
                                        </button>
                                        <button class="btn btn-remove" onclick="debtManager.removeDebt('${person}', ${index})" title="${this.translate('remove')}">
                                            ${this.translate('remove')}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                
                <div class="add-debt">
                    <input type="text" id="desc-${person}" placeholder="${this.translate('debt_description_placeholder')}" />
                    <input type="number" id="value-${person}" placeholder="${this.translate('amount_placeholder')}" min="0" />
                    <button onclick="debtManager.addDebt('${person}')">${this.translate('add_debt')}</button>
                    <button class="remove-person-btn" onclick="debtManager.removePerson('${person}')">${this.translate('remove_person')} ${person}</button>
                </div>
            `;
            
            debtsList.appendChild(personSection);
        });
        
        this.setupDragAndDrop();
        this.updateSummary();
    }

    // Setup drag and drop functionality for people and debt rows
    setupDragAndDrop() {
        const personSections = document.querySelectorAll('.person-section');
        personSections.forEach(section => {
            const dragHandle = section.querySelector('.person-name .drag-handle');
            if (dragHandle) {
                // Make drag handle always draggable and visually indicate it
                dragHandle.style.cursor = 'grab';
                dragHandle.style.userSelect = 'none';
                dragHandle.draggable = true;
                
                // Handle drag events on the drag handle itself
                dragHandle.addEventListener('dragstart', (e) => {
                    e.stopPropagation();
                    dragHandle.style.cursor = 'grabbing';
                    // Set the person section as the dragged element
                    this.draggedPersonElement = section;
                    section.classList.add('dragging');
                    // Store drag data
                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData('text/html', section.outerHTML);
                });
                
                dragHandle.addEventListener('dragend', (e) => {
                    e.stopPropagation();
                    dragHandle.style.cursor = 'grab';
                    section.classList.remove('dragging');
                    document.querySelectorAll('.person-section').forEach(s => {
                        s.classList.remove('drag-over');
                    });
                    this.draggedPersonElement = null;
                });
            }
            
            // Handle drop events on person sections
            section.addEventListener('dragover', (e) => {
                e.preventDefault();
                if (this.draggedPersonElement && this.draggedPersonElement !== section) {
                    // Remove drag-over from all sections first
                    document.querySelectorAll('.person-section').forEach(s => {
                        s.classList.remove('drag-over');
                    });
                    
                    // Add drag-over only to current target
                    section.classList.add('drag-over');
                }
            });
            
            section.addEventListener('dragleave', (e) => {
                // Only remove drag-over if we're actually leaving the section
                if (!section.contains(e.relatedTarget)) {
                    section.classList.remove('drag-over');
                }
            });
            
            section.addEventListener('drop', (e) => {
                e.preventDefault();
                section.classList.remove('drag-over');
                
                if (this.draggedPersonElement && this.draggedPersonElement !== section) {
                    const fromIndex = parseInt(this.draggedPersonElement.dataset.index);
                    const toIndex = parseInt(section.dataset.index);
                    
                    // Remove the unused peopleKeys variable
                    const newDebts = {};
                    const entries = Object.entries(this.debts);
                    
                    // Reorder the entries
                    const [draggedEntry] = entries.splice(fromIndex, 1);
                    entries.splice(toIndex, 0, draggedEntry);
                    
                    entries.forEach(([key, value]) => {
                        newDebts[key] = value;
                    });
                    
                    this.debts = newDebts;
                    this.saveData();
                    this.renderDebts();
                }
            });
        });

        const debtRows = document.querySelectorAll('.debt-table tr[draggable]');
        debtRows.forEach(row => {
            row.addEventListener('dragstart', (e) => this.handleDebtDragStart(e));
            row.addEventListener('dragover', (e) => this.handleDebtDragOver(e));
            row.addEventListener('drop', (e) => this.handleDebtDrop(e));
            row.addEventListener('dragend', (e) => this.handleDebtDragEnd(e));
        });
    }


    // Handle drag start event for debt table rows
    handleDebtDragStart(e) {
        this.draggedDebtElement = e.currentTarget;
        e.currentTarget.classList.add('dragging');
    }

    // Handle drag over event for debt table rows (same person only)
    handleDebtDragOver(e) {
        e.preventDefault();
        if (this.draggedDebtElement && e.currentTarget !== this.draggedDebtElement && 
            e.currentTarget.dataset.person === this.draggedDebtElement.dataset.person) {
            
            // Remove drag-over from all rows first
            document.querySelectorAll('.debt-table tr').forEach(row => {
                row.classList.remove('drag-over');
            });
            
            // Add drag-over only to current target
            e.currentTarget.classList.add('drag-over');
        }
    }

    // Handle drop event to reorder debts within same person
    handleDebtDrop(e) {
        e.preventDefault();
        if (this.draggedDebtElement && e.currentTarget !== this.draggedDebtElement &&
            e.currentTarget.dataset.person === this.draggedDebtElement.dataset.person) {
            
            const person = e.currentTarget.dataset.person;
            const fromIndex = parseInt(this.draggedDebtElement.dataset.index);
            const toIndex = parseInt(e.currentTarget.dataset.index);
            
            const draggedDebt = this.debts[person][fromIndex];
            this.debts[person].splice(fromIndex, 1);
            this.debts[person].splice(toIndex, 0, draggedDebt);
            
            this.saveData();
            this.renderDebts();
        }
        e.currentTarget.classList.remove('drag-over');
    }

    // Clean up drag styling after debt drag operation
    handleDebtDragEnd(e) {
        e.currentTarget.classList.remove('dragging');
        document.querySelectorAll('.debt-table tr').forEach(row => {
            row.classList.remove('drag-over');
        });
        this.draggedDebtElement = null;
    }

    // Add new debt entry for specified person with validation
    addDebt(person) {
        const descInput = document.getElementById(`desc-${person}`);
        const valueInput = document.getElementById(`value-${person}`);
        
        const description = descInput.value.trim();
        const value = parseFloat(valueInput.value);
        
        if (description && value > 0) {
            this.debts[person].push({
                description: description,
                value: value,
                hidden: false
            });
            
            descInput.value = '';
            valueInput.value = '';
            
            this.saveData();
            this.renderDebts();
        } else {
            this.showAlertModal(
                this.translate('information'),
                this.translate('fill_fields_error')
            );
        }
    }

    // Remove specific debt after user confirmation
    removeDebt(person, index) {
        const debt = this.debts[person][index];
        this.showConfirmModal(
            this.translate('remove_debt_confirm'),
            this.translate('remove_debt_message', {
                description: debt.description,
                amount: this.formatCurrency(debt.value)
            }),
            () => {
                this.debts[person].splice(index, 1);
                this.saveData();
                this.renderDebts();
            }
        );
    }

    // Duplicate an existing debt entry for the same person
    repeatDebt(person, index) {
        const originalDebt = this.debts[person][index];
        const newDebt = {
            description: originalDebt.description,
            value: originalDebt.value,
            hidden: false
        };
        
        this.debts[person].push(newDebt);
        this.saveData();
        this.renderDebts();
    }

    // Edit existing debt description and amount with validation
    async editDebt(person, index) {
        const currentDebt = this.debts[person][index];
        
        const newDescription = await this.showPromptModal(
            this.translate('edit'),
            this.translate('edit_debt_description'),
            currentDebt.description
        );
        if (newDescription === null) return;
        
        const currency = this.currentLanguage === 'pt-BR' ? 'R$' : '$';
        const newValueStr = await this.showPromptModal(
            this.translate('edit'),
            this.translate('edit_debt_amount').replace('($)', `(${currency})`),
            currentDebt.value.toFixed(2)
        );
        if (newValueStr === null) return;
        
        const newValue = parseFloat(newValueStr.replace(',', '.'));
        
        if (newDescription.trim() === '') {
            await this.showAlertModal(
                this.translate('information'),
                this.translate('description_empty_error')
            );
            return;
        }
        
        if (isNaN(newValue) || newValue <= 0) {
            await this.showAlertModal(
                this.translate('information'),
                this.translate('invalid_amount_error')
            );
            return;
        }
        
        this.debts[person][index] = {
            description: newDescription.trim(),
            value: newValue,
            hidden: currentDebt.hidden
        };
        
        this.saveData();
        this.renderDebts();
    }

    // Toggle debt visibility (hidden/visible) for calculations
    toggleDebtVisibility(person, index) {
        this.debts[person][index].hidden = !this.debts[person][index].hidden;
        this.saveData();
        this.renderDebts();
    }

    // Remove person and all their debts after confirmation
    removePerson(person) {
        const totalDebts = this.debts[person].length;
        const totalValue = this.calculatePersonTotal(this.debts[person], true);
        
        this.showConfirmModal(
            this.translate('remove_person_confirm'),
            this.translate('remove_person_message', {
                person: person,
                count: totalDebts,
                total: this.formatCurrency(totalValue)
            }),
            () => {
                delete this.debts[person];
                this.saveData();
                this.renderDebts();
            }
        );
    }

    // Add new person using prompt dialog (legacy method)
    async addNewPerson() {
        const personName = await this.showPromptModal(
            this.translate('add_new_person_title'),
            this.translate('new_person_name'),
            ''
        );
        if (personName && personName.trim() && !this.debts[personName.trim()]) {
            this.debts[personName.trim()] = [];
            this.saveData();
            this.renderDebts();
        } else if (personName && this.debts[personName.trim()]) {
            await this.showAlertModal(
                this.translate('information'),
                this.translate('person_exists_error')
            );
        }
    }

    // Edit person name with validation and update all references
    async editPersonName(oldName) {
        const newName = await this.showPromptModal(
            this.translate('edit'),
            this.translate('edit_person_name'),
            oldName
        );
        if (newName === null) return;
        
        const trimmedName = newName.trim();
        if (trimmedName === '') {
            await this.showAlertModal(
                this.translate('information'),
                this.translate('person_name_empty_error')
            );
            return;
        }
        
        if (trimmedName === oldName) return;
        
        if (this.debts[trimmedName]) {
            await this.showAlertModal(
                this.translate('information'),
                this.translate('person_exists_error')
            );
            return;
        }
        
        // Update the debts object with new name
        const debts = this.debts[oldName];
        delete this.debts[oldName];
        this.debts[trimmedName] = debts;
        
        this.saveData();
        this.renderDebts();
    }

    // Clear all debts from all people after confirmation
    clearAllDebts() {
        const totalPeople = Object.keys(this.debts).length;
        const totalValue = this.calculateTotalDebt() + this.calculateHiddenDebt();
        
        this.showConfirmModal(
            this.translate('clear_all_confirm'),
            this.translate('clear_all_message', {
                count: totalPeople,
                total: this.formatCurrency(totalValue)
            }),
            () => {
                this.debts = {};
                this.saveData();
                this.renderDebts();
            }
        );
    }
}

export default DebtManager;