export interface Debt {
  id: string;
  description: string;
  value: number;
  isHidden: boolean;
  createdAt: Date;
}

export interface Person {
  id: string;
  name: string;
  debts: Debt[];
  createdAt: Date;
}

export interface DebtManagerState {
  people: Person[];
  theme: 'light' | 'dark';
  language: 'en' | 'pt';
  currency: 'BRL' | 'USD';
}

export interface Translations {
  [key: string]: {
    [lang: string]: string;
  };
}