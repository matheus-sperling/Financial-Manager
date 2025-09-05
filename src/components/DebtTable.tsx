import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { formatCurrency } from '@/lib/utils';
import { Person, Debt } from '@/types/debt';
import { Edit2, Copy, Trash2, Eye, EyeOff, Plus } from 'lucide-react';
import { ReorderButton } from './ReorderButton';

interface DebtTableProps {
  person: Person;
  personIndex: number;
  language: 'en' | 'pt';
  currency: 'BRL' | 'USD';
  selectedPersonIndex: number | null;
  totalPeople: number;
  onSelectPerson: (index: number | null) => void;
  onSwapPerson: (fromIndex: number, toIndex: number) => void;
  onAddDebt: (personId: string, description: string, value: number) => void;
  onUpdateDebt: (personId: string, debtId: string, updates: Partial<Debt>) => void;
  onRemoveDebt: (personId: string, debtId: string) => void;
  onDuplicateDebt: (personId: string, debtId: string) => void;
  onToggleHidden: (personId: string, debtId: string) => void;
  onRemovePerson: (personId: string) => void;
  onUpdatePersonName: (personId: string, name: string) => void;
  onSwapDebts: (personId: string, fromIndex: number, toIndex: number) => void;
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
    save: 'Save',
    editPersonName: 'Edit Name',
    enterPersonName: 'Enter person name'
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
    save: 'Salvar',
    editPersonName: 'Editar Nome',
    enterPersonName: 'Digite o nome da pessoa'
  }
};

export function DebtTable({ 
  person, 
  personIndex, 
  language, 
  currency, 
  selectedPersonIndex,
  totalPeople,
  onSelectPerson,
  onSwapPerson,
  onAddDebt, 
  onUpdateDebt, 
  onRemoveDebt, 
  onDuplicateDebt, 
  onToggleHidden, 
  onRemovePerson, 
  onUpdatePersonName,
  onSwapDebts
}: DebtTableProps) {
  const t = translations[language];
  const [newDebt, setNewDebt] = useState({ description: '', value: '' });
  const [editingDebt, setEditingDebt] = useState<Debt | null>(null);
  const [editingPersonName, setEditingPersonName] = useState('');
  const [selectedDebtIndex, setSelectedDebtIndex] = useState<number | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isEditPersonNameOpen, setIsEditPersonNameOpen] = useState(false);

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

  const handleEditPersonName = () => {
    if (editingPersonName.trim()) {
      onUpdatePersonName(person.id, editingPersonName.trim());
      setEditingPersonName('');
      setIsEditPersonNameOpen(false);
    }
  };

  const handleSwapDebt = (fromIndex: number, toIndex: number) => {
    onSwapDebts(person.id, fromIndex, toIndex);
    setSelectedDebtIndex(null);
  };

  const visibleDebts = person.debts.filter(d => !d.isHidden);
  const totalVisible = visibleDebts.reduce((sum, debt) => sum + debt.value, 0);

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            {totalPeople > 1 && (
              <ReorderButton
                isSelected={selectedPersonIndex === personIndex}
                isValidSwapTarget={selectedPersonIndex !== null && selectedPersonIndex !== personIndex}
                onSelect={() => onSelectPerson(selectedPersonIndex === personIndex ? null : personIndex)}
                onSwap={selectedPersonIndex !== null ? () => onSwapPerson(selectedPersonIndex, personIndex) : undefined}
                onCancel={() => onSelectPerson(null)}
                language={language}
              />
            )}
            <CardTitle className="text-xl">{person.name}</CardTitle>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setEditingPersonName(person.name);
                setIsEditPersonNameOpen(true);
              }}
              className="h-6 w-6 p-0"
              title={t.editPersonName}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
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
              {person.debts.map((debt, debtIndex) => (
                <Card key={debt.id} className={`p-4 ${debt.isHidden ? 'opacity-60 bg-muted' : ''}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-start gap-2">
                      {person.debts.length > 1 && (
                        <ReorderButton
                          isSelected={selectedDebtIndex === debtIndex}
                          isValidSwapTarget={selectedDebtIndex !== null && selectedDebtIndex !== debtIndex}
                          onSelect={() => setSelectedDebtIndex(selectedDebtIndex === debtIndex ? null : debtIndex)}
                          onSwap={selectedDebtIndex !== null ? () => handleSwapDebt(selectedDebtIndex, debtIndex) : undefined}
                          onCancel={() => setSelectedDebtIndex(null)}
                          language={language}
                          size="sm"
                        />
                      )}
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
                  {person.debts.map((debt, debtIndex) => (
                    <tr key={debt.id} className={`border-b hover:bg-muted/50 ${debt.isHidden ? 'opacity-60' : ''}`}>
                      <td className="p-2">
                        {person.debts.length > 1 && (
                          <ReorderButton
                            isSelected={selectedDebtIndex === debtIndex}
                            isValidSwapTarget={selectedDebtIndex !== null && selectedDebtIndex !== debtIndex}
                            onSelect={() => setSelectedDebtIndex(selectedDebtIndex === debtIndex ? null : debtIndex)}
                            onSwap={selectedDebtIndex !== null ? () => handleSwapDebt(selectedDebtIndex, debtIndex) : undefined}
                            onCancel={() => setSelectedDebtIndex(null)}
                            language={language}
                            size="sm"
                          />
                        )}
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

      {/* Edit Debt Dialog */}
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

      {/* Edit Person Name Dialog */}
      <Dialog open={isEditPersonNameOpen} onOpenChange={setIsEditPersonNameOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t.editPersonName}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder={t.enterPersonName}
              value={editingPersonName}
              onChange={(e) => setEditingPersonName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleEditPersonName()}
              maxLength={50}
              className="w-full"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditPersonNameOpen(false)}>
              {t.cancel}
            </Button>
            <Button onClick={handleEditPersonName} disabled={!editingPersonName.trim()}>
              {t.save}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}