import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, GripVertical } from 'lucide-react';

interface ReorderButtonProps {
  isSelected: boolean;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onSelect: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onCancel?: () => void;
  language: 'en' | 'pt';
  size?: 'sm' | 'default';
}

const translations = {
  en: {
    selectToReorder: 'Select to reorder',
    moveUp: 'Move up',
    moveDown: 'Move down',
    cancel: 'Cancel reordering'
  },
  pt: {
    selectToReorder: 'Selecionar para reordenar',
    moveUp: 'Mover para cima',
    moveDown: 'Mover para baixo',
    cancel: 'Cancelar reordenação'
  }
};

export function ReorderButton({
  isSelected,
  canMoveUp,
  canMoveDown,
  onSelect,
  onMoveUp,
  onMoveDown,
  onCancel,
  language,
  size = 'default'
}: ReorderButtonProps) {
  const t = translations[language];
  
  if (!isSelected) {
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

  return (
    <div className="flex flex-col gap-1">
      <Button
        variant="outline"
        size="sm"
        onClick={onMoveUp}
        disabled={!canMoveUp}
        title={t.moveUp}
        className="p-1 h-6 w-6 touch-manipulation"
      >
        <ArrowUp className="h-3 w-3" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onMoveDown}
        disabled={!canMoveDown}
        title={t.moveDown}
        className="p-1 h-6 w-6 touch-manipulation"
      >
        <ArrowDown className="h-3 w-3" />
      </Button>
      {onCancel && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          title={t.cancel}
          className="p-1 h-6 w-6 text-muted-foreground hover:text-foreground touch-manipulation"
        >
          ×
        </Button>
      )}
    </div>
  );
}