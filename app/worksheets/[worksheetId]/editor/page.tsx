interface WorksheetEditorPageProps {
  params: {
    worksheetId: string;
  };
}

export default function WorksheetEditorPage({ params }: WorksheetEditorPageProps) {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Worksheet Editor</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Editor scaffold for worksheet: {params.worksheetId}
      </p>
    </main>
  );
}
