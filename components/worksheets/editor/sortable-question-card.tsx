'use client';

import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Copy, Pencil, Trash2 } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { QUESTION_TYPES, type WorksheetQuestion } from './types';

interface SortableQuestionCardProps {
  question: WorksheetQuestion;
  onDelete: (questionId: string) => void;
  onDuplicate: (questionId: string) => void;
}

export function SortableQuestionCard({
  question,
  onDelete,
  onDuplicate,
}: SortableQuestionCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: question.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card className={isDragging ? 'opacity-60' : ''}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2">
              <button
                type="button"
                className="mt-1 rounded border p-1 text-muted-foreground hover:bg-accent"
                {...attributes}
                {...listeners}
                aria-label="Drag question"
              >
                <GripVertical className="h-4 w-4" />
              </button>
              <div>
                <h4 className="text-sm font-semibold">{question.title}</h4>
                <p className="text-sm text-muted-foreground">{question.prompt}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button type="button" size="sm" variant="outline">
                <Pencil className="mr-1 h-3.5 w-3.5" /> Edit
              </Button>
              <Button type="button" size="sm" variant="outline" onClick={() => onDuplicate(question.id)}>
                <Copy className="mr-1 h-3.5 w-3.5" /> Duplicate
              </Button>
              <Button type="button" size="sm" variant="outline" onClick={() => onDelete(question.id)}>
                <Trash2 className="mr-1 h-3.5 w-3.5" /> Delete
              </Button>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="text-sm">
              <span className="mb-1 block text-muted-foreground">Question Type</span>
              <select
                defaultValue={question.type}
                className="h-9 w-full rounded-md border bg-background px-3 text-sm"
              >
                {QUESTION_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm">
              <span className="mb-1 block text-muted-foreground">Points</span>
              <input
                defaultValue={question.points}
                type="number"
                min={1}
                className="h-9 w-full rounded-md border bg-background px-3 text-sm"
              />
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
