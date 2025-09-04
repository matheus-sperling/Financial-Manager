import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

interface DebtSummaryProps {
  totalDebt: number;
  totalPeople: number;
  hiddenDebt: number;
  language: 'en' | 'pt';
  currency: 'BRL' | 'USD';
}

const translations = {
  en: {
    totalToPay: 'Total to Pay',
    totalPeople: 'Total People',
    hiddenDebts: 'Hidden Debts'
  },
  pt: {
    totalToPay: 'Total a Pagar',
    totalPeople: 'Total de Pessoas',
    hiddenDebts: 'Dívidas Ocultas'
  }
};

export function DebtSummary({ totalDebt, totalPeople, hiddenDebt, language, currency }: DebtSummaryProps) {
  const t = translations[language];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card className="bg-gradient-to-br from-primary/15 to-primary/25 dark:from-primary/25 dark:to-primary/35 border-primary/30 shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-primary">
            {t.totalToPay}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">
            {formatCurrency(totalDebt, currency)}
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-emerald/15 to-emerald/25 dark:from-emerald/25 dark:to-emerald/35 border-emerald/30 shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-emerald">
            {t.totalPeople}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-emerald">
            {totalPeople}
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-coral/15 to-coral/25 dark:from-coral/25 dark:to-coral/35 border-coral/30 shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-coral">
            {t.hiddenDebts}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-coral">
            {formatCurrency(hiddenDebt, currency)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}