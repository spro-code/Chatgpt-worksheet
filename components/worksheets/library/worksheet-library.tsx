'use client';

import { CreateWorksheetMenu } from './create-worksheet-menu';
import {
  createWorksheetOptions,
  worksheetRecords,
  worksheetTabs,
  type WorksheetTabKey,
} from './types';
import { WorksheetCard } from './worksheet-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function WorksheetLibrary() {
  return (
    <main className="mx-auto max-w-6xl p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Worksheet Library</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Create, manage, and assign worksheets for your students.
          </p>
        </div>
        <CreateWorksheetMenu options={createWorksheetOptions} />
      </div>

      <Tabs defaultValue="my-worksheets" className="w-full">
        <TabsList className="h-auto w-full justify-start gap-1 overflow-auto rounded-lg bg-muted/70 p-1">
          {worksheetTabs.map((tab) => (
            <TabsTrigger key={tab.key} value={tab.key} className="rounded-md px-4 py-2">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {worksheetTabs.map((tab) => {
          const worksheets = worksheetRecords.filter((worksheet) => worksheet.tab === (tab.key as WorksheetTabKey));

          return (
            <TabsContent key={tab.key} value={tab.key}>
              {worksheets.length === 0 ? (
                <div className="rounded-lg border border-dashed p-10 text-center text-sm text-muted-foreground">
                  No worksheets found in this tab.
                </div>
              ) : (
                <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {worksheets.map((worksheet) => (
                    <WorksheetCard key={worksheet.id} worksheet={worksheet} />
                  ))}
                </section>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </main>
  );
}
