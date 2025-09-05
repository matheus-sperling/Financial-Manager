import { useState, useEffect, useCallback } from 'react';
import { Person, Debt, DebtManagerState } from '@/types/debt';
import { useClientStorage } from './useClientStorage';

const STORAGE_KEY = 'debt-manager-data';
const THEME_KEY = 'debt-manager-theme';
const LANGUAGE_KEY = 'debt-manager-language';
const CURRENCY_KEY = 'debt-manager-currency';

export function useDebtManager() {
  // Get browser defaults
  const getBrowserDefaults = () => {
    if (typeof window === 'undefined') {
      return { language: 'en' as const, currency: 'USD' as const };
    }
    const browserLang = navigator.language.startsWith('pt') ? 'pt' : 'en';
    const defaultCurrency = browserLang === 'pt' ? 'BRL' : 'USD';
    return { language: browserLang as 'en' | 'pt', currency: defaultCurrency as 'BRL' | 'USD' };
  };

  const defaults = getBrowserDefaults();
  
  // Use client storage hooks
  const [people, setPeople, isPeopleLoaded] = useClientStorage<Person[]>(STORAGE_KEY, []);
  const [theme, setTheme, isThemeLoaded] = useClientStorage<'light' | 'dark'>(THEME_KEY, 'light');
  const [language, setLanguage, isLanguageLoaded] = useClientStorage<'en' | 'pt'>(LANGUAGE_KEY, defaults.language);
  const [currency, setCurrency, isCurrencyLoaded] = useClientStorage<'BRL' | 'USD'>(CURRENCY_KEY, defaults.currency);

  // Update document classes when theme changes
  useEffect(() => {
    if (isThemeLoaded && typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme, isThemeLoaded]);

  // Check if all data is loaded
  const isLoaded = isPeopleLoaded && isThemeLoaded && isLanguageLoaded && isCurrencyLoaded;

  const state: DebtManagerState = {
    people,
    theme,
    language,
    currency,
  };

  // Person management
  const addPerson = useCallback((name: string) => {
    const newPerson: Person = {
      id: crypto.randomUUID(),
      name,
      debts: [],
      createdAt: new Date(),
    };
    setPeople(prev => [...prev, newPerson]);
  }, [setPeople]);

  const removePerson = useCallback((personId: string) => {
    setPeople(prev => prev.filter(p => p.id !== personId));
  }, [setPeople]);

  const updatePersonName = useCallback((personId: string, name: string) => {
    setPeople(prev => prev.map(p =>
      p.id === personId ? { ...p, name } : p
    ));
  }, [setPeople]);

  // Debt management
  const addDebt = useCallback((personId: string, description: string, value: number) => {
    const newDebt: Debt = {
      id: crypto.randomUUID(),
      description,
      value,
      isHidden: false,
      createdAt: new Date(),
    };

    setPeople(prev => prev.map(p =>
      p.id === personId
        ? { ...p, debts: [...p.debts, newDebt] }
        : p
    ));
  }, [setPeople]);

  const updateDebt = useCallback((personId: string, debtId: string, updates: Partial<Debt>) => {
    setPeople(prev => prev.map(p =>
      p.id === personId
        ? {
            ...p,
            debts: p.debts.map(d =>
              d.id === debtId ? { ...d, ...updates } : d
            ),
          }
        : p
    ));
  }, [setPeople]);

  const removeDebt = useCallback((personId: string, debtId: string) => {
    setPeople(prev => prev.map(p =>
      p.id === personId
        ? { ...p, debts: p.debts.filter(d => d.id !== debtId) }
        : p
    ));
  }, [setPeople]);

  const duplicateDebt = useCallback((personId: string, debtId: string) => {
    setPeople(prev => prev.map(p => {
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
    }));
  }, [setPeople]);

  const toggleDebtHidden = useCallback((personId: string, debtId: string) => {
    setPeople(prev => prev.map(p =>
      p.id === personId
        ? {
            ...p,
            debts: p.debts.map(d =>
              d.id === debtId ? { ...d, isHidden: !d.isHidden } : d
            ),
          }
        : p
    ));
  }, [setPeople]);

  // Theme and language
  const toggleTheme = useCallback(() => {
    setTheme((prev: 'light' | 'dark') => prev === 'light' ? 'dark' : 'light');
  }, [setTheme]);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev: 'en' | 'pt') => {
      const newLanguage = prev === 'en' ? 'pt' : 'en';
      const newCurrency = newLanguage === 'pt' ? 'BRL' : 'USD';
      setCurrency(newCurrency);
      return newLanguage;
    });
  }, [setLanguage, setCurrency]);

  const setCurrencyCallback = useCallback((newCurrency: 'BRL' | 'USD') => {
    setCurrency(newCurrency);
  }, [setCurrency]);

  // Reorder people
  const reorderPeople = useCallback((fromIndex: number, toIndex: number) => {
    setPeople(prev => {
      const newPeople = [...prev];
      const [removed] = newPeople.splice(fromIndex, 1);
      newPeople.splice(toIndex, 0, removed);
      return newPeople;
    });
  }, [setPeople]);

  // Reorder debts within a person
  const reorderDebts = useCallback((personId: string, fromIndex: number, toIndex: number) => {
    setPeople(prev => prev.map(p => {
      if (p.id === personId) {
        const newDebts = [...p.debts];
        const [removed] = newDebts.splice(fromIndex, 1);
        newDebts.splice(toIndex, 0, removed);
        return { ...p, debts: newDebts };
      }
      return p;
    }));
  }, [setPeople]);

  // Clear all data
  const clearAllData = useCallback(() => {
    setPeople([]);
  }, [setPeople]);

  // Calculate totals
  const totals = {
    totalDebt: people.reduce((total, person) =>
      total + person.debts.filter(d => !d.isHidden).reduce((sum, debt) => sum + debt.value, 0), 0
    ),
    totalPeople: people.length,
    hiddenDebt: people.reduce((total, person) =>
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
      setCurrency: setCurrencyCallback,
      clearAllData,
    },
    totals,
    isLoaded,
  };
}