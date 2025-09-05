import React from 'react';
import { Button } from '@/components/ui/button';
import { GripVertical, X } from 'lucide-react';

interface ReorderButtonProps {
  isSelected: boolean;
  isValidSwapTarget: boolean;
  onSelect: () => void;
  onSwap?: () => void;
  onCancel?: () => void;
  language: 'en' | 'pt';
  size?: 'sm' | 'default';
}

const translations = {
  en: {
    selectToReorder: 'Click to select for reordering',
    swapHere: 'Click to swap positions',
    cancel: 'Cancel reordering',
    selected: 'Selected for reordering'
  },
  pt: {
    selectToReorder: 'Clique para selecionar para reordenar',
    swapHere: 'Clique para trocar posições',
    cancel: 'Cancelar reordenação',
    selected: 'Selecionado para reordenar'
  }
};

export function ReorderButton({
  isSelected,
  isValidSwapTarget,
  onSelect,
  onSwap,
  onCancel,
  language,
  size = 'default'
}: ReorderButtonProps) {
  const t = translations[language];
  
  // If this item is selected for reordering
  if (isSelected) {
    return (
      <div className="flex items-center gap-1">
        <Button
          variant="default"
          size={size}
          onClick={onCancel}
          title={t.selected}
          className="p-1 h-auto touch-manipulation bg-blue-500 hover:bg-blue-600"
        >
          <GripVertical className={size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'} />
        </Button>
        {onCancel && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            title={t.cancel}
            className="p-1 h-6 w-6 text-muted-foreground hover:text-foreground touch-manipulation"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
    );
  }
  
  // If this item is a valid swap target
  if (isValidSwapTarget && onSwap) {
    return (
      <Button
        variant="outline"
        size={size}
        onClick={onSwap}
        title={t.swapHere}
        className="p-1 h-auto touch-manipulation border-green-500 hover:bg-green-50 hover:border-green-600"
      >
        <GripVertical className={`${size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'} text-green-600`} />
      </Button>
    );
  }
  
  // Default state - selectable for reordering
  return (
    <Button
      variant="ghost"
      size={size}
      onClick={onSelect}
      title={t.selectToReorder}
      className="p-1 h-auto touch-manipulation"
    >
      <GripVertical className={size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'} />
    </Button>
  );
}