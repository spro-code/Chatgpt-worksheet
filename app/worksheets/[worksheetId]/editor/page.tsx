import { WorksheetEditor } from '@/components/worksheets/editor/worksheet-editor';

interface WorksheetEditorPageProps {
  params: {
    worksheetId: string;
  };
}

export default function WorksheetEditorPage({ params }: WorksheetEditorPageProps) {
  return <WorksheetEditor worksheetId={params.worksheetId} />;
}
