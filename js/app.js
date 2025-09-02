class DebtManager {
    constructor() {
        this.debts = this.loadData();
        this.draggedPersonElement = null;
        this.draggedDebtElement = null;
        this.currentTheme = this.loadTheme();
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
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

        modalTitle.textContent = title;
        modalMessage.textContent = message;
        
        modal.classList.add('show');
        
        modalConfirmBtn.replaceWith(modalConfirmBtn.cloneNode(true));
        modalCancelBtn.replaceWith(modalCancelBtn.cloneNode(true));
        
        const newConfirmBtn = document.getElementById('modalConfirm');
        const newCancelBtn = document.getElementById('modalCancel');
        
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
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
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
                        <span class="drag-handle" title="Drag to reorder">⋮⋮</span>
                        I owe to: ${person}
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
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Hidden</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.debts[person].map((debt, index) => `
                            <tr class="${debt.hidden ? 'hidden-debt' : ''}" 
                                draggable="true" 
                                data-person="${person}" 
                                data-index="${index}">
                                <td>
                                    <span class="drag-handle" title="Drag to reorder">⋮⋮</span>
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
                                            ${debt.hidden ? 'Hidden' : 'Visible'}
                                        </label>
                                    </div>
                                </td>
                                <td>
                                    <div class="actions-cell">
                                        <button class="btn btn-edit" onclick="debtManager.editDebt('${person}', ${index})" title="Edit this debt">
                                            ✏️ Edit
                                        </button>
                                        <button class="btn btn-repeat" onclick="debtManager.repeatDebt('${person}', ${index})" title="Duplicate this debt">
                                            🔄 Duplicate
                                        </button>
                                        <button class="btn btn-remove" onclick="debtManager.removeDebt('${person}', ${index})" title="Remove this debt">
                                            🗑️ Remove
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                
                <div class="add-debt">
                    <input type="text" id="desc-${person}" placeholder="Debt description" />
                    <input type="number" id="value-${person}" placeholder="Amount ($)" step="0.01" min="0" />
                    <button onclick="debtManager.addDebt('${person}')">Add Debt</button>
                    <button class="remove-person-btn" onclick="debtManager.removePerson('${person}')">Remove ${person}</button>
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
            alert('Please fill in the description and a valid amount.');
        }
    }

    removeDebt(person, index) {
        const debt = this.debts[person][index];
        this.showConfirmModal(
            '🗑️ Remove Debt',
            `Are you sure you want to remove the debt "${debt.description}" valued at ${this.formatCurrency(debt.value)}?`,
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
        
        const newDescription = prompt('Edit debt description:', currentDebt.description);
        if (newDescription === null) return;
        
        const newValueStr = prompt('Edit debt amount ($):', currentDebt.value.toFixed(2));
        if (newValueStr === null) return;
        
        const newValue = parseFloat(newValueStr.replace(',', '.'));
        
        if (newDescription.trim() === '') {
            alert('Description cannot be empty.');
            return;
        }
        
        if (isNaN(newValue) || newValue <= 0) {
            alert('Please enter a valid amount greater than zero.');
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
            '🗑️ Remove Person',
            `Are you sure you want to remove ${person} and all ${totalDebts} debts (total: ${this.formatCurrency(totalValue)})?`,
            () => {
                delete this.debts[person];
                this.saveData();
                this.renderDebts();
            }
        );
    }

    addNewPerson() {
        const personName = prompt('Name of the new person:');
        if (personName && personName.trim() && !this.debts[personName.trim()]) {
            this.debts[personName.trim()] = [];
            this.saveData();
            this.renderDebts();
        } else if (this.debts[personName.trim()]) {
            alert('This person already exists!');
        }
    }

    clearAllDebts() {
        const totalPeople = Object.keys(this.debts).length;
        const totalValue = this.calculateTotalDebt() + this.calculateHiddenDebt();
        
        this.showConfirmModal(
            '🗑️ Clear All Debts',
            `Are you sure you want to clear ALL debts from ${totalPeople} people (total: ${this.formatCurrency(totalValue)})? This action cannot be undone.`,
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
    debtManager.addNewPerson();
}

function clearAllDebts() {
    debtManager.clearAllDebts();
}