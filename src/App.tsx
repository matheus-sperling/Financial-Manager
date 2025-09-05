import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { DebtSummary } from '@/components/DebtSummary';
import { DebtTable } from '@/components/DebtTable';
import { useDebtManager } from '@/hooks/useDebtManager';
import { Moon, Sun, Plus, Trash2, DollarSign } from 'lucide-react';

const translations = {
  en: {
    title: '💰 Debt Manager',
    subtitle: 'Track your debts with other people',
    addNewPerson: 'Add New Person',
    clearAllDebts: 'Clear All Debts',
    howToUse: 'How to use:',
    instructions: 'Add people and their respective debts. Use "Edit" to modify description and amount. Use "Duplicate" to easily duplicate a debt. Check "Hidden" to exclude from total calculation.',
    dragDrop: 'Reordering:',
    dragInstructions: 'Click the grip icon to select an item, then use the arrow buttons to reorder people or debts.',
    addPersonTitle: 'Add New Person',
    enterPersonName: 'Enter person name',
    add: 'Add',
    cancel: 'Cancel',
    confirmClear: 'Clear All Data?',
    confirmClearDesc: 'This will permanently delete all people and debts.',
    confirm: 'Confirm',
    changeTheme: 'Toggle theme',
    changeLanguage: 'Change language',
    changeCurrency: 'Change currency'
  },
  pt: {
    title: '💰 Gerenciador de Dívidas',
    subtitle: 'Acompanhe suas dívidas com outras pessoas',
    addNewPerson: 'Adicionar Nova Pessoa',
    clearAllDebts: 'Limpar Todas as Dívidas',
    howToUse: 'Como usar:',
    instructions: 'Adicione pessoas e suas respectivas dívidas. Use "Editar" para modificar descrição e valor. Use "Duplicar" para duplicar facilmente uma dívida. Marque "Ocultar" para excluir do cálculo total.',
    dragDrop: 'Reordenação:',
    dragInstructions: 'Clique no ícone de arrastar para selecionar um item, depois use as setas para reordenar pessoas ou dívidas.',
    addPersonTitle: 'Adicionar Nova Pessoa',
    enterPersonName: 'Digite o nome da pessoa',
    add: 'Adicionar',
    cancel: 'Cancelar',
    confirmClear: 'Limpar Todos os Dados?',
    confirmClearDesc: 'Isso excluirá permanentemente todas as pessoas e dívidas.',
    confirm: 'Confirmar',
    changeTheme: 'Alternar tema',
    changeLanguage: 'Mudar idioma',
    changeCurrency: 'Alterar moeda'
  }
};

function App() {
  const { state, actions, totals } = useDebtManager();
  const [newPersonName, setNewPersonName] = useState('');
  const [isAddPersonOpen, setIsAddPersonOpen] = useState(false);
  const [selectedPersonIndex, setSelectedPersonIndex] = useState<number | null>(null);
  
  const t = translations[state.language];

  const handleAddPerson = () => {
    if (newPersonName.trim()) {
      actions.addPerson(newPersonName.trim());
      setNewPersonName('');
      setIsAddPersonOpen(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddPerson();
    }
  };

  const handleToggleCurrency = () => {
    const newCurrency = state.currency === 'BRL' ? 'USD' : 'BRL';
    actions.setCurrency(newCurrency);
  };

  const handleReorderPerson = (fromIndex: number, toIndex: number) => {
    actions.reorderPeople(fromIndex, toIndex);
    setSelectedPersonIndex(null);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${state.theme === 'dark' ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-primary/10 to-coral/10 dark:from-background dark:via-card dark:to-background">
        {/* Header */}
        <header className="bg-gradient-to-r from-primary to-emerald dark:from-primary/70 dark:to-emerald/70 text-primary-foreground shadow-lg">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold">{t.title}</h1>
                <p className="text-primary-foreground/80 mt-2">{t.subtitle}</p>
              </div>
              <div className="flex gap-3">
                {/* Theme Toggle */}
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={actions.toggleTheme}
                  title={t.changeTheme}
                  className="bg-white/10 hover:bg-white/20 dark:bg-black/20 dark:hover:bg-black/30 text-primary-foreground border-2 border-white/30 dark:border-white/20 hover:border-white/50 dark:hover:border-white/30"
                >
                  {state.theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                </Button>
                
                {/* Language Toggle */}
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={actions.toggleLanguage}
                  title={t.changeLanguage}
                  className="bg-white/10 hover:bg-white/20 dark:bg-black/20 dark:hover:bg-black/30 text-primary-foreground border-2 border-white/30 dark:border-white/20 hover:border-white/50 dark:hover:border-white/30"
                >
                  {state.language === 'en' ? '🇺🇸' : '🇧🇷'}
                </Button>

                {/* Currency Toggle */}
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={handleToggleCurrency}
                  title={t.changeCurrency}
                  className="bg-white/10 hover:bg-white/20 dark:bg-black/20 dark:hover:bg-black/30 text-primary-foreground border-2 border-white/30 dark:border-white/20 hover:border-white/50 dark:hover:border-white/30"
                >
                  {state.currency === 'USD' ? '$' : 'R$'}
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Summary Cards */}
          <DebtSummary
            totalDebt={totals.totalDebt}
            totalPeople={totals.totalPeople}
            hiddenDebt={totals.hiddenDebt}
            language={state.language}
            currency={state.currency}
          />

          {/* Instructions */}
          <div className="bg-card/80 backdrop-blur-sm rounded-lg p-4 mb-6 border border-border shadow-sm">
            <div className="text-sm text-muted-foreground">
              <p className="mb-2">
                <strong>{t.howToUse}</strong> {t.instructions}
              </p>
              <p>
                <strong>{t.dragDrop}</strong> {t.dragInstructions}
              </p>
            </div>
          </div>

          {/* People and Debts */}
          <div className="space-y-6">
            {state.people.map((person, index) => (
              <DebtTable
                key={person.id}
                person={person}
                personIndex={index}
                language={state.language}
                currency={state.currency}
                selectedPersonIndex={selectedPersonIndex}
                onSelectPerson={setSelectedPersonIndex}
                onReorderPerson={handleReorderPerson}
                onAddDebt={actions.addDebt}
                onUpdateDebt={actions.updateDebt}
                onRemoveDebt={actions.removeDebt}
                onDuplicateDebt={actions.duplicateDebt}
                onToggleHidden={actions.toggleDebtHidden}
                onRemovePerson={actions.removePerson}
                onUpdatePersonName={actions.updatePersonName}
                onReorderDebts={actions.reorderDebts}
                totalPeople={state.people.length}
              />
            ))}
          </div>

          {/* Empty State */}
          {state.people.length === 0 && (
            <div className="text-center py-12">
              <DollarSign className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                {state.language === 'pt' ? 'Nenhuma pessoa cadastrada' : 'No people registered'}
              </h3>
              <p className="text-muted-foreground/70 mb-6">
                {state.language === 'pt' 
                  ? 'Comece adicionando uma pessoa para rastrear as dívidas.'
                  : 'Start by adding a person to track debts.'
                }
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Dialog open={isAddPersonOpen} onOpenChange={setIsAddPersonOpen}>
              <DialogTrigger asChild>
                <Button className="flex-1 gap-2 h-12 text-lg">
                  <Plus className="h-5 w-5" />
                  {t.addNewPerson}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>{t.addPersonTitle}</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <Input
                    placeholder={t.enterPersonName}
                    value={newPersonName}
                    onChange={(e) => setNewPersonName(e.target.value)}
                    onKeyPress={handleKeyPress}
                    maxLength={50}
                    className="w-full"
                  />
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddPersonOpen(false)}>
                    {t.cancel}
                  </Button>
                  <Button onClick={handleAddPerson} disabled={!newPersonName.trim()}>
                    {t.add}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {state.people.length > 0 && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive" className="flex-1 gap-2 h-12 text-lg sm:flex-initial">
                    <Trash2 className="h-5 w-5" />
                    {t.clearAllDebts}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t.confirmClear}</DialogTitle>
                  </DialogHeader>
                  <p className="py-4 text-sm text-muted-foreground">{t.confirmClearDesc}</p>
                  <DialogFooter>
                    <Button variant="outline">{t.cancel}</Button>
                    <Button variant="destructive" onClick={actions.clearAllData}>
                      {t.confirm}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-16 py-8 text-center text-sm text-muted-foreground">
          <div className="container mx-auto px-4">
            <p>
              {state.language === 'pt' 
                ? '💾 Dados salvos automaticamente no seu navegador'
                : '💾 Data automatically saved in your browser'
              }
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;