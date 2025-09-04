import { useState, useEffect, useCallback } from 'react';
import { Person, Debt, DebtManagerState } from '@/types/debt';
import { saveToStorage, loadFromStorage } from '@/lib/utils';

const STORAGE_KEY = 'debt-manager-data';
const THEME_KEY = 'debt-manager-theme';
const LANGUAGE_KEY = 'debt-manager-language';
const CURRENCY_KEY = 'debt-manager-currency';

export function useDebtManager() {
  const [state, setState] = useState<DebtManagerState>(() => {
    const browserLang = navigator.language.startsWith('pt') ? 'pt' : 'en';
    const defaultCurrency = browserLang === 'pt' ? 'BRL' : 'USD';
    
    return {
      people: loadFromStorage(STORAGE_KEY, []),
      theme: loadFromStorage(THEME_KEY, 'light'),
      language: loadFromStorage(LANGUAGE_KEY, browserLang),
      currency: loadFromStorage(CURRENCY_KEY, defaultCurrency),
    };
  });

  // Save to localStorage when state changes
  useEffect(() => {
    saveToStorage(STORAGE_KEY, state.people);
  }, [state.people]);

  useEffect(() => {
    saveToStorage(THEME_KEY, state.theme);
    document.documentElement.setAttribute('data-theme', state.theme);
  }, [state.theme]);

  useEffect(() => {
    saveToStorage(LANGUAGE_KEY, state.language);
  }, [state.language]);

  useEffect(() => {
    saveToStorage(CURRENCY_KEY, state.currency);
  }, [state.currency]);

  // Person management
  const addPerson = useCallback((name: string) => {
    const newPerson: Person = {
      id: crypto.randomUUID(),
      name,
      debts: [],
      createdAt: new Date(),
    };
    setState(prev => ({ ...prev, people: [...prev.people, newPerson] }));
  }, []);

  const removePerson = useCallback((personId: string) => {
    setState(prev => ({
      ...prev,
      people: prev.people.filter(p => p.id !== personId),
    }));
  }, []);

  const updatePersonName = useCallback((personId: string, name: string) => {
    setState(prev => ({
      ...prev,
      people: prev.people.map(p =>
        p.id === personId ? { ...p, name } : p
      ),
    }));
  }, []);

  // Debt management
  const addDebt = useCallback((personId: string, description: string, value: number) => {
    const newDebt: Debt = {
      id: crypto.randomUUID(),
      description,
      value,
      isHidden: false,
      createdAt: new Date(),
    };

    setState(prev => ({
      ...prev,
      people: prev.people.map(p =>
        p.id === personId
          ? { ...p, debts: [...p.debts, newDebt] }
          : p
      ),
    }));
  }, []);

  const updateDebt = useCallback((personId: string, debtId: string, updates: Partial<Debt>) => {
    setState(prev => ({
      ...prev,
      people: prev.people.map(p =>
        p.id === personId
          ? {
              ...p,
              debts: p.debts.map(d =>
                d.id === debtId ? { ...d, ...updates } : d
              ),
            }
          : p
      ),
    }));
  }, []);

  const removeDebt = useCallback((personId: string, debtId: string) => {
    setState(prev => ({
      ...prev,
      people: prev.people.map(p =>
        p.id === personId
          ? { ...p, debts: p.debts.filter(d => d.id !== debtId) }
          : p
      ),
    }));
  }, []);

  const duplicateDebt = useCallback((personId: string, debtId: string) => {
    setState(prev => ({
      ...prev,
      people: prev.people.map(p => {
        if (p.id === personId) {
          const debtToDuplicate = p.debts.find(d => d.id === debtId);
          if (debtToDuplicate) {
            const duplicatedDebt: Debt = {
              ...debtToDuplicate,
              id: crypto.randomUUID(),
              createdAt: new Date(),
            };
            return { ...p, debts: [...p.debts, duplicatedDebt] };
          }
        }
        return p;
      }),
    }));
  }, []);

  const toggleDebtHidden = useCallback((personId: string, debtId: string) => {
    setState(prev => ({
      ...prev,
      people: prev.people.map(p =>
        p.id === personId
          ? {
              ...p,
              debts: p.debts.map(d =>
                d.id === debtId ? { ...d, isHidden: !d.isHidden } : d
              ),
            }
          : p
      ),
    }));
  }, []);

  // Theme and language
  const toggleTheme = useCallback(() => {
    setState(prev => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light',
    }));
  }, []);

  const toggleLanguage = useCallback(() => {
    setState(prev => {
      const newLanguage = prev.language === 'en' ? 'pt' : 'en';
      const newCurrency = newLanguage === 'pt' ? 'BRL' : 'USD';
      return {
        ...prev,
        language: newLanguage,
        currency: newCurrency,
      };
    });
  }, []);

  const setCurrency = useCallback((currency: 'BRL' | 'USD') => {
    setState(prev => ({
      ...prev,
      currency,
    }));
  }, []);

  // Reordering
  const reorderPeople = useCallback((fromIndex: number, toIndex: number) => {
    setState(prev => {
      const people = [...prev.people];
      const [moved] = people.splice(fromIndex, 1);
      people.splice(toIndex, 0, moved);
      return { ...prev, people };
    });
  }, []);

  const reorderDebts = useCallback((personId: string, fromIndex: number, toIndex: number) => {
    setState(prev => ({
      ...prev,
      people: prev.people.map(p =>
        p.id === personId
          ? {
              ...p,
              debts: (() => {
                const debts = [...p.debts];
                const [moved] = debts.splice(fromIndex, 1);
                debts.splice(toIndex, 0, moved);
                return debts;
              })()
            }
          : p
      ),
    }));
  }, []);

  // Clear all data
  const clearAllData = useCallback(() => {
    setState(prev => ({ ...prev, people: [] }));
  }, []);

  // Calculate totals
  const totals = {
    totalDebt: state.people.reduce((total, person) =>
      total + person.debts.filter(d => !d.isHidden).reduce((sum, debt) => sum + debt.value, 0), 0
    ),
    totalPeople: state.people.length,
    hiddenDebt: state.people.reduce((total, person) =>
      total + person.debts.filter(d => d.isHidden).reduce((sum, debt) => sum + debt.value, 0), 0
    ),
  };

  return {
    state,
    actions: {
      addPerson,
      removePerson,
      updatePersonName,
      addDebt,
      updateDebt,
      removeDebt,
      duplicateDebt,
      toggleDebtHidden,
      reorderPeople,
      reorderDebts,
      toggleTheme,
      toggleLanguage,
      setCurrency,
      clearAllData,
    },
    totals,
  };
}