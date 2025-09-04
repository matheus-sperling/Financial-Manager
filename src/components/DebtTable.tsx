import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { formatCurrency } from '@/lib/utils';
import { Person, Debt } from '@/types/debt';
import { Edit2, Copy, Trash2, Eye, EyeOff, Plus, GripVertical } from 'lucide-react';

interface DebtTableProps {
  person: Person;
  personIndex: number;
  language: 'en' | 'pt';
  currency: 'BRL' | 'USD';
  onAddDebt: (personId: string, description: string, value: number) => void;
  onUpdateDebt: (personId: string, debtId: string, updates: Partial<Debt>) => void;
  onRemoveDebt: (personId: string, debtId: string) => void;
  onDuplicateDebt: (personId: string, debtId: string) => void;
  onToggleHidden: (personId: string, debtId: string) => void;
  onRemovePerson: (personId: string) => void;
  onReorderDebts: (personId: string, fromIndex: number, toIndex: number) => void;
  onReorderPeople: (fromIndex: number, toIndex: number) => void;
}

const translations = {
  en: {
    description: 'Description',
    value: 'Value',
    date: 'Date',
    actions: 'Actions',
    edit: 'Edit',
    duplicate: 'Duplicate',
    remove: 'Remove',
    hide: 'Hide',
    show: 'Show',
    addDebt: 'Add Debt',
    removePerson: 'Remove Person',
    confirmRemove: 'Are you sure?',
    confirmRemoveDebt: 'This will permanently delete this debt.',
    confirmRemovePerson: 'This will permanently delete this person and all their debts.',
    cancel: 'Cancel',
    confirm: 'Confirm',
    editDebt: 'Edit Debt',
    addNewDebt: 'Add New Debt',
    enterDescription: 'Enter description',
    enterValue: 'Enter value',
    save: 'Save'
  },
  pt: {
    description: 'Descrição',
    value: 'Valor',
    date: 'Data',
    actions: 'Ações',
    edit: 'Editar',
    duplicate: 'Duplicar',
    remove: 'Remover',
    hide: 'Ocultar',
    show: 'Mostrar',
    addDebt: 'Adicionar Dívida',
    removePerson: 'Remover Pessoa',
    confirmRemove: 'Tem certeza?',
    confirmRemoveDebt: 'Isso excluirá permanentemente esta dívida.',
    confirmRemovePerson: 'Isso excluirá permanentemente esta pessoa e todas as suas dívidas.',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    editDebt: 'Editar Dívida',
    addNewDebt: 'Adicionar Nova Dívida',
    enterDescription: 'Digite a descrição',
    enterValue: 'Digite o valor',
    save: 'Salvar'
  }
};

export function DebtTable({ person, personIndex, language, currency, onAddDebt, onUpdateDebt, onRemoveDebt, onDuplicateDebt, onToggleHidden, onRemovePerson, onReorderDebts, onReorderPeople }: DebtTableProps) {
  const t = translations[language];
  const [newDebt, setNewDebt] = useState({ description: '', value: '' });
  const [editingDebt, setEditingDebt] = useState<Debt | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [isDraggingPerson, setIsDraggingPerson] = useState(false);

  const handleAddDebt = () => {
    if (newDebt.description && newDebt.value) {
      const value = parseInt(newDebt.value) || 0;
      onAddDebt(person.id, newDebt.description, value);
      setNewDebt({ description: '', value: '' });
      setIsAddDialogOpen(false);
    }
  };

  const handleEditDebt = () => {
    if (editingDebt) {
      onUpdateDebt(person.id, editingDebt.id, {
        description: editingDebt.description,
        value: editingDebt.value
      });
      setEditingDebt(null);
      setIsEditDialogOpen(false);
    }
  };

  // Person drag handlers
  const handlePersonDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', `person-${personIndex}`);
    e.dataTransfer.effectAllowed = 'move';
    setIsDraggingPerson(true);
  };

  const handlePersonDragEnd = () => {
    setIsDraggingPerson(false);
  };

  const handlePersonDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handlePersonDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const dragData = e.dataTransfer.getData('text/plain');
    if (dragData.startsWith('person-')) {
      const fromIndex = parseInt(dragData.split('-')[1]);
      if (fromIndex !== personIndex) {
        onReorderPeople(fromIndex, personIndex);
      }
    }
  };

  // Debt drag handlers
  const handleDebtDragStart = (e: React.DragEvent, debtIndex: number) => {
    e.dataTransfer.setData('text/plain', `debt-${person.id}-${debtIndex}`);
    e.dataTransfer.effectAllowed = 'move';
    e.stopPropagation(); // Prevent person drag when dragging debt
  };

  const handleDebtDragOver = (e: React.DragEvent, debtIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(debtIndex);
  };

  const handleDebtDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDebtDrop = (e: React.DragEvent, toIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    const dragData = e.dataTransfer.getData('text/plain');
    if (dragData.startsWith('debt-')) {
      const [, dragPersonId, fromIndexStr] = dragData.split('-');
      const fromIndex = parseInt(fromIndexStr);
      if (dragPersonId === person.id && fromIndex !== toIndex) {
        onReorderDebts(person.id, fromIndex, toIndex);
      }
    }
    setDragOverIndex(null);
  };

  const visibleDebts = person.debts.filter(d => !d.isHidden);
  const totalVisible = visibleDebts.reduce((sum, debt) => sum + debt.value, 0);

  return (
    <Card 
      className={`w-full mb-6 transition-all duration-200 ${isDraggingPerson ? 'opacity-50' : ''}`}
      onDragOver={handlePersonDragOver}
      onDrop={handlePersonDrop}
    >
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <div
              draggable
              onDragStart={handlePersonDragStart}
              onDragEnd={handlePersonDragEnd}
              className="cursor-move"
            >
              <GripVertical className="h-5 w-5 text-muted-foreground" />
            </div>
            <CardTitle className="text-xl">{person.name}</CardTitle>
            <span className="text-sm text-muted-foreground">
              ({formatCurrency(totalVisible, currency)})
            </span>
          </div>
          <div className="flex gap-2">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">{t.addDebt}</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>{t.addNewDebt}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder={t.enterDescription}
                    value={newDebt.description}
                    onChange={(e) => setNewDebt(prev => ({ ...prev, description: e.target.value }))}
                  />
                  <Input
                    type="number"
                    min="1"
                    step="1"
                    placeholder={t.enterValue}
                    value={newDebt.value}
                    onChange={(e) => setNewDebt(prev => ({ ...prev, value: e.target.value }))}
                  />
                </div>
                <DialogFooter>
                  <Button onClick={handleAddDebt}>{t.save}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4" />
                  <span className="hidden sm:inline ml-2">{t.removePerson}</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t.confirmRemove}</DialogTitle>
                  <DialogDescription>{t.confirmRemovePerson}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline">{t.cancel}</Button>
                  <Button variant="destructive" onClick={() => onRemovePerson(person.id)}>
                    {t.confirm}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {person.debts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Nenhuma dívida cadastrada
          </div>
        ) : (
          <>
            {/* Mobile Card Layout */}
            <div className="block md:hidden space-y-3">
              {person.debts.map((debt, index) => (
                <Card 
                  key={debt.id} 
                  className={`p-4 transition-all duration-200 ${debt.isHidden ? 'opacity-60 bg-muted' : ''} ${dragOverIndex === index ? 'border-primary' : ''}`}
                  onDragOver={(e) => handleDebtDragOver(e, index)}
                  onDragLeave={handleDebtDragLeave}
                  onDrop={(e) => handleDebtDrop(e, index)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-start gap-2">
                      <div
                        draggable
                        onDragStart={(e) => handleDebtDragStart(e, index)}
                        className="cursor-move"
                      >
                        <GripVertical className="h-4 w-4 text-muted-foreground mt-0.5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{debt.description}</h4>
                        <p className={`text-lg font-bold ${debt.isHidden ? 'line-through text-muted-foreground' : 'text-green-600'}`}>
                          {formatCurrency(debt.value, currency)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(debt.createdAt).toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US')}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => {
                        setEditingDebt(debt);
                        setIsEditDialogOpen(true);
                      }}
                      className="text-xs"
                    >
                      <Edit2 className="h-3 w-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => onDuplicateDebt(person.id, debt.id)}
                      className="text-xs"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => onToggleHidden(person.id, debt.id)}
                      className="text-xs"
                    >
                      {debt.isHidden ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="destructive" className="text-xs">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{t.confirmRemove}</DialogTitle>
                          <DialogDescription>{t.confirmRemoveDebt}</DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline">{t.cancel}</Button>
                          <Button variant="destructive" onClick={() => onRemoveDebt(person.id, debt.id)}>
                            {t.confirm}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </Card>
              ))}
            </div>

            {/* Desktop Table Layout */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 w-8"></th>
                    <th className="text-left p-2">{t.description}</th>
                    <th className="text-left p-2">{t.value}</th>
                    <th className="text-left p-2">{t.date}</th>
                    <th className="text-left p-2">{t.actions}</th>
                  </tr>
                </thead>
                <tbody>
                  {person.debts.map((debt, index) => (
                    <tr 
                      key={debt.id} 
                      className={`border-b hover:bg-muted/50 transition-all duration-200 ${debt.isHidden ? 'opacity-60' : ''} ${dragOverIndex === index ? 'bg-primary/10' : ''}`}
                      onDragOver={(e) => handleDebtDragOver(e, index)}
                      onDragLeave={handleDebtDragLeave}
                      onDrop={(e) => handleDebtDrop(e, index)}
                    >
                      <td className="p-2">
                        <div
                          draggable
                          onDragStart={(e) => handleDebtDragStart(e, index)}
                          className="cursor-move"
                        >
                          <GripVertical className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </td>
                      <td className="p-2 font-medium">{debt.description}</td>
                      <td className={`p-2 font-bold ${debt.isHidden ? 'line-through text-muted-foreground' : 'text-green-600'}`}>
                        {formatCurrency(debt.value, currency)}
                      </td>
                      <td className="p-2 text-sm text-muted-foreground">
                        {new Date(debt.createdAt).toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US')}
                      </td>
                      <td className="p-2">
                        <div className="flex gap-1">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => {
                              setEditingDebt(debt);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => onDuplicateDebt(person.id, debt.id)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => onToggleHidden(person.id, debt.id)}
                          >
                            {debt.isHidden ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>{t.confirmRemove}</DialogTitle>
                                <DialogDescription>{t.confirmRemoveDebt}</DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <Button variant="outline">{t.cancel}</Button>
                                <Button variant="destructive" onClick={() => onRemoveDebt(person.id, debt.id)}>
                                  {t.confirm}
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </CardContent>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t.editDebt}</DialogTitle>
          </DialogHeader>
          {editingDebt && (
            <div className="space-y-4">
              <Input
                placeholder={t.enterDescription}
                value={editingDebt.description}
                onChange={(e) => setEditingDebt(prev => prev ? { ...prev, description: e.target.value } : null)}
              />
              <Input
                type="number"
                min="1"
                step="1"
                placeholder={t.enterValue}
                value={editingDebt.value.toString()}
                onChange={(e) => setEditingDebt(prev => prev ? { ...prev, value: parseInt(e.target.value) || 0 } : null)}
              />
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleEditDebt}>{t.save}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}