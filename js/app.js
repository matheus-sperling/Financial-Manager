class DebtManager {
    constructor() {
        this.debts = this.loadData();
        this.draggedPersonElement = null;
        this.draggedDebtElement = null;
        this.currentTheme = this.loadTheme();
        this.currentLanguage = this.loadLanguage();
        this.translations = this.getTranslations();
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.applyLanguage(this.currentLanguage);
        this.setupAddPersonModal();
        this.renderDebts();
        window.addEventListener('beforeunload', () => this.saveData());
    }

    loadTheme() {
        return localStorage.getItem('theme') || 'light';
    }

    saveTheme(theme) {
        localStorage.setItem('theme', theme);
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
        this.currentTheme = theme;
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
        this.saveTheme(newTheme);
    }

    loadLanguage() {
        return localStorage.getItem('language') || 'pt-BR';
    }

    saveLanguage(language) {
        localStorage.setItem('language', language);
    }

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
                confirm: '🗑️ Confirmar',
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
                description_empty_error: 'A descrição não pode estar vazia.',
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
                default_action_confirm: 'Tem certeza de que deseja realizar esta ação?'
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
                confirm: '🗑️ Confirm',
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
                description_empty_error: 'Description cannot be empty.',
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
                default_action_confirm: 'Are you sure you want to perform this action?'
            }
        };
    }

    translate(key, params = {}) {
        let text = this.translations[this.currentLanguage][key] || key;
        
        Object.keys(params).forEach(param => {
            text = text.replace(`{${param}}`, params[param]);
        });
        
        return text;
    }

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

    toggleLanguage() {
        const newLanguage = this.currentLanguage === 'pt-BR' ? 'en' : 'pt-BR';
        this.applyLanguage(newLanguage);
        this.saveLanguage(newLanguage);
        this.renderDebts();
    }

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
                alert(this.translate('person_exists_error'));
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

    showAddPersonModal() {
        const addPersonModal = document.getElementById('addPersonModal');
        const personNameInput = document.getElementById('personNameInput');
        addPersonModal.classList.add('show');
        setTimeout(() => personNameInput.focus(), 100);
    }

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

    getDefaultData() {
        const isPortuguese = this.currentLanguage === 'pt-BR';
        
        if (isPortuguese) {
            return {
                'João': [
                    { description: 'Almoço no restaurante', value: 25.50, hidden: false },
                    { description: 'Cafeteria', value: 8.00, hidden: false }
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

    saveData() {
        localStorage.setItem('debtManager', JSON.stringify(this.debts));
        this.showSaveIndicator();
    }

    showSaveIndicator() {
        const indicator = document.getElementById('saveIndicator');
        indicator.classList.add('show');
        setTimeout(() => {
            indicator.classList.remove('show');
        }, 2000);
    }

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

    formatCurrency(value) {
        const locale = this.currentLanguage === 'pt-BR' ? 'pt-BR' : 'en-US';
        const currency = this.currentLanguage === 'pt-BR' ? 'BRL' : 'USD';
        
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency
        }).format(value);
    }

    calculatePersonTotal(personDebts, includeHidden = false) {
        return personDebts.reduce((sum, debt) => {
            return sum + (includeHidden || !debt.hidden ? debt.value : 0);
        }, 0);
    }

    calculateTotalDebt() {
        let total = 0;
        for (let person in this.debts) {
            total += this.calculatePersonTotal(this.debts[person], false);
        }
        return total;
    }

    calculateHiddenDebt() {
        let total = 0;
        for (let person in this.debts) {
            total += this.debts[person].reduce((sum, debt) => {
                return sum + (debt.hidden ? debt.value : 0);
            }, 0);
        }
        return total;
    }

    updateSummary() {
        document.getElementById('totalDebt').textContent = this.formatCurrency(this.calculateTotalDebt());
        document.getElementById('totalPeople').textContent = Object.keys(this.debts).length;
        document.getElementById('hiddenDebt').textContent = this.formatCurrency(this.calculateHiddenDebt());
    }

    renderDebts() {
        const debtsList = document.getElementById('debtsList');
        debtsList.innerHTML = '';

        const peopleKeys = Object.keys(this.debts);
        
        peopleKeys.forEach((person, personIndex) => {
            const personSection = document.createElement('div');
            personSection.className = 'person-section';
            personSection.draggable = true;
            personSection.dataset.person = person;
            personSection.dataset.index = personIndex;
            
            const personTotal = this.calculatePersonTotal(this.debts[person], false);
            const personTotalWithHidden = this.calculatePersonTotal(this.debts[person], true);
            
            personSection.innerHTML = `
                <div class="person-header">
                    <div class="person-name">
                        <span class="drag-handle" title="${this.translate('drag_drop')}">⋮⋮</span>
                        ${this.translate('i_owe_to')} ${person}
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
                    <input type="number" id="value-${person}" placeholder="${this.translate('amount_placeholder')}" step="0.01" min="0" />
                    <button onclick="debtManager.addDebt('${person}')">${this.translate('add_debt')}</button>
                    <button class="remove-person-btn" onclick="debtManager.removePerson('${person}')">${this.translate('remove_person')} ${person}</button>
                </div>
            `;
            
            debtsList.appendChild(personSection);
        });
        
        this.setupDragAndDrop();
        this.updateSummary();
    }

    setupDragAndDrop() {
        const personSections = document.querySelectorAll('.person-section');
        personSections.forEach(section => {
            section.addEventListener('dragstart', (e) => this.handlePersonDragStart(e));
            section.addEventListener('dragover', (e) => this.handlePersonDragOver(e));
            section.addEventListener('drop', (e) => this.handlePersonDrop(e));
            section.addEventListener('dragend', (e) => this.handlePersonDragEnd(e));
        });

        const debtRows = document.querySelectorAll('.debt-table tr[draggable]');
        debtRows.forEach(row => {
            row.addEventListener('dragstart', (e) => this.handleDebtDragStart(e));
            row.addEventListener('dragover', (e) => this.handleDebtDragOver(e));
            row.addEventListener('drop', (e) => this.handleDebtDrop(e));
            row.addEventListener('dragend', (e) => this.handleDebtDragEnd(e));
        });
    }

    handlePersonDragStart(e) {
        this.draggedPersonElement = e.currentTarget;
        e.currentTarget.classList.add('dragging');
    }

    handlePersonDragOver(e) {
        e.preventDefault();
        if (this.draggedPersonElement && e.currentTarget !== this.draggedPersonElement) {
            e.currentTarget.classList.add('drag-over');
        }
    }

    handlePersonDrop(e) {
        e.preventDefault();
        if (this.draggedPersonElement && e.currentTarget !== this.draggedPersonElement) {
            const fromIndex = parseInt(this.draggedPersonElement.dataset.index);
            const toIndex = parseInt(e.currentTarget.dataset.index);
            
            const peopleKeys = Object.keys(this.debts);
            const newDebts = {};
            const entries = Object.entries(this.debts);
            
            const [draggedEntry] = entries.splice(fromIndex, 1);
            entries.splice(toIndex, 0, draggedEntry);
            
            entries.forEach(([key, value]) => {
                newDebts[key] = value;
            });
            
            this.debts = newDebts;
            this.saveData();
            this.renderDebts();
        }
        e.currentTarget.classList.remove('drag-over');
    }

    handlePersonDragEnd(e) {
        e.currentTarget.classList.remove('dragging');
        document.querySelectorAll('.person-section').forEach(section => {
            section.classList.remove('drag-over');
        });
        this.draggedPersonElement = null;
    }

    handleDebtDragStart(e) {
        this.draggedDebtElement = e.currentTarget;
        e.currentTarget.classList.add('dragging');
    }

    handleDebtDragOver(e) {
        e.preventDefault();
        if (this.draggedDebtElement && e.currentTarget !== this.draggedDebtElement && 
            e.currentTarget.dataset.person === this.draggedDebtElement.dataset.person) {
            e.currentTarget.classList.add('drag-over');
        }
    }

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

    handleDebtDragEnd(e) {
        e.currentTarget.classList.remove('dragging');
        document.querySelectorAll('.debt-table tr').forEach(row => {
            row.classList.remove('drag-over');
        });
        this.draggedDebtElement = null;
    }

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
            alert(this.translate('fill_fields_error'));
        }
    }

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

    editDebt(person, index) {
        const currentDebt = this.debts[person][index];
        
        const newDescription = prompt(this.translate('edit_debt_description'), currentDebt.description);
        if (newDescription === null) return;
        
        const currency = this.currentLanguage === 'pt-BR' ? 'R$' : '$';
        const newValueStr = prompt(this.translate('edit_debt_amount').replace('($)', `(${currency})`), currentDebt.value.toFixed(2));
        if (newValueStr === null) return;
        
        const newValue = parseFloat(newValueStr.replace(',', '.'));
        
        if (newDescription.trim() === '') {
            alert(this.translate('description_empty_error'));
            return;
        }
        
        if (isNaN(newValue) || newValue <= 0) {
            alert(this.translate('invalid_amount_error'));
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

    toggleDebtVisibility(person, index) {
        this.debts[person][index].hidden = !this.debts[person][index].hidden;
        this.saveData();
        this.renderDebts();
    }

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

    addNewPerson() {
        const personName = prompt(this.translate('new_person_name'));
        if (personName && personName.trim() && !this.debts[personName.trim()]) {
            this.debts[personName.trim()] = [];
            this.saveData();
            this.renderDebts();
        } else if (this.debts[personName.trim()]) {
            alert(this.translate('person_exists_error'));
        }
    }

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

const debtManager = new DebtManager();

function addNewPerson() {
    debtManager.showAddPersonModal();
}

function clearAllDebts() {
    debtManager.clearAllDebts();
}