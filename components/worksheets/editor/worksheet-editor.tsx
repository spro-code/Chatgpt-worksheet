'use client';

import { useMemo, useState } from 'react';
import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { sampleSections, type WorksheetQuestion, type WorksheetSection } from './types';
import { SortableQuestionCard } from './sortable-question-card';

interface WorksheetEditorProps {
  worksheetId: string;
}

function duplicateQuestion(question: WorksheetQuestion): WorksheetQuestion {
  return {
    ...question,
    id: `${question.id}-copy-${Date.now()}`,
    title: `${question.title} (Copy)`,
  };
}

export function WorksheetEditor({ worksheetId }: WorksheetEditorProps) {
  const [sections, setSections] = useState<WorksheetSection[]>(sampleSections);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const totalQuestions = useMemo(
    () => sections.reduce((count, section) => count + section.questions.length, 0),
    [sections],
  );

  function handleQuestionReorder(sectionId: string, event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setSections((previous) =>
      previous.map((section) => {
        if (section.id !== sectionId) return section;

        const oldIndex = section.questions.findIndex((question) => question.id === active.id);
        const newIndex = section.questions.findIndex((question) => question.id === over.id);
        if (oldIndex === -1 || newIndex === -1) return section;

        return {
          ...section,
          questions: arrayMove(section.questions, oldIndex, newIndex),
        };
      }),
    );
  }

  function deleteQuestion(sectionId: string, questionId: string) {
    setSections((previous) =>
      previous.map((section) =>
        section.id === sectionId
          ? { ...section, questions: section.questions.filter((question) => question.id !== questionId) }
          : section,
      ),
    );
  }

  function duplicateSectionQuestion(sectionId: string, questionId: string) {
    setSections((previous) =>
      previous.map((section) => {
        if (section.id !== sectionId) return section;

        const index = section.questions.findIndex((question) => question.id === questionId);
        if (index === -1) return section;

        const nextQuestions = [...section.questions];
        nextQuestions.splice(index + 1, 0, duplicateQuestion(section.questions[index]));

        return { ...section, questions: nextQuestions };
      }),
    );
  }

  return (
    <main className="mx-auto max-w-5xl p-6">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Worksheet Editor</h1>
          <p className="text-sm text-muted-foreground">
            Worksheet ID: <span className="font-medium text-foreground">{worksheetId}</span> • {totalQuestions}{' '}
            questions
          </p>
        </div>
        <Button type="button">
          <Plus className="mr-2 h-4 w-4" /> Add Section
        </Button>
      </div>

      <div className="space-y-6">
        {sections.map((section) => (
          <Card key={section.id}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{section.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={(event) => handleQuestionReorder(section.id, event)}
              >
                <SortableContext
                  items={section.questions.map((question) => question.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {section.questions.map((question) => (
                    <SortableQuestionCard
                      key={question.id}
                      question={question}
                      onDelete={(questionId) => deleteQuestion(section.id, questionId)}
                      onDuplicate={(questionId) => duplicateSectionQuestion(section.id, questionId)}
                    />
                  ))}
                </SortableContext>
              </DndContext>

              <Button type="button" variant="outline" size="sm">
                <Plus className="mr-1 h-4 w-4" /> Add Question
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
