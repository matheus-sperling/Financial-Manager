// Drag and Drop functionality for the Debt Manager

/**
 * Handles drag and drop operations for person sections and debt rows
 */
export class DragAndDropHandler {
    constructor() {
        this.draggedPersonElement = null;
        this.draggedDebtElement = null;
    }

    /**
     * Setup drag and drop functionality for person sections
     * @param {Function} onReorder - Callback when items are reordered
     */
    setupPersonDragAndDrop(onReorder) {
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
                    
                    if (onReorder) onReorder(fromIndex, toIndex);
                }
            });
        });
    }

    /**
     * Setup drag and drop functionality for debt rows
     * @param {Function} onReorderDebt - Callback when debt items are reordered
     */
    setupDebtDragAndDrop(onReorderDebt) {
        const debtRows = document.querySelectorAll('.debt-table tr[draggable]');
        debtRows.forEach(row => {
            row.addEventListener('dragstart', (e) => this.handleDebtDragStart(e));
            row.addEventListener('dragover', (e) => this.handleDebtDragOver(e));
            row.addEventListener('drop', (e) => {
                if (onReorderDebt) onReorderDebt(e);
            });
            row.addEventListener('dragend', (e) => this.handleDebtDragEnd(e));
        });
    }

    /**
     * Handle drag start event for debt table rows
     * @param {DragEvent} e - Drag event
     */
    handleDebtDragStart(e) {
        this.draggedDebtElement = e.currentTarget;
        e.currentTarget.classList.add('dragging');
    }

    /**
     * Handle drag over event for debt table rows (same person only)
     * @param {DragEvent} e - Drag event
     */
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

    /**
     * Handle drop event to reorder debts within same person
     * @param {DragEvent} e - Drag event
     */
    handleDebtDrop(e, onReorder) {
        e.preventDefault();
        if (this.draggedDebtElement && e.currentTarget !== this.draggedDebtElement &&
            e.currentTarget.dataset.person === this.draggedDebtElement.dataset.person) {
            
            const person = e.currentTarget.dataset.person;
            const fromIndex = parseInt(this.draggedDebtElement.dataset.index);
            const toIndex = parseInt(e.currentTarget.dataset.index);
            
            if (onReorder) onReorder(person, fromIndex, toIndex);
        }
        e.currentTarget.classList.remove('drag-over');
    }

    /**
     * Clean up drag styling after debt drag operation
     * @param {DragEvent} e - Drag event
     */
    handleDebtDragEnd(e) {
        e.currentTarget.classList.remove('dragging');
        document.querySelectorAll('.debt-table tr').forEach(row => {
            row.classList.remove('drag-over');
        });
        this.draggedDebtElement = null;
    }
}