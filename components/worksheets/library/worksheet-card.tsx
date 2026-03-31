import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import type { WorksheetCardData } from './types';

interface WorksheetCardProps {
  worksheet: WorksheetCardData;
}

const actions = ['Edit', 'Duplicate', 'Assign', 'Delete'];

export function WorksheetCard({ worksheet }: WorksheetCardProps) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">{worksheet.title}</CardTitle>
      </CardHeader>

      <CardContent>
        <dl className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
          <div>
            <dt className="font-medium">Grade</dt>
            <dd>{worksheet.grade}</dd>
          </div>
          <div>
            <dt className="font-medium">Subject</dt>
            <dd>{worksheet.subject}</dd>
          </div>
          <div>
            <dt className="font-medium">Questions</dt>
            <dd>{worksheet.questionCount}</dd>
          </div>
          <div>
            <dt className="font-medium">Created</dt>
            <dd>{new Date(worksheet.createdAt).toLocaleDateString()}</dd>
          </div>
        </dl>

        <div className="mt-5 flex flex-wrap gap-2 border-t pt-4">
          {actions.map((action) => (
            <Button key={action} variant="outline" size="sm" type="button">
              {action}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
