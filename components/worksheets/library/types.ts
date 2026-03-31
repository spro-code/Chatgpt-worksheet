export type WorksheetTabKey =
  | 'my-worksheets'
  | 'public-library'
  | 'assigned-worksheets'
  | 'drafts';

export interface WorksheetCardData {
  id: string;
  title: string;
  grade: string;
  subject: string;
  questionCount: number;
  createdAt: string;
  tab: WorksheetTabKey;
}

export const worksheetTabs: Array<{ key: WorksheetTabKey; label: string }> = [
  { key: 'my-worksheets', label: 'My Worksheets' },
  { key: 'public-library', label: 'Public Library' },
  { key: 'assigned-worksheets', label: 'Assigned Worksheets' },
  { key: 'drafts', label: 'Drafts' },
];

export const worksheetRecords: WorksheetCardData[] = [
  {
    id: 'ws_001',
    title: 'Fraction Basics Practice',
    grade: 'Grade 5',
    subject: 'Math',
    questionCount: 12,
    createdAt: '2026-03-10',
    tab: 'my-worksheets',
  },
  {
    id: 'ws_002',
    title: 'Reading Comprehension: Ecosystems',
    grade: 'Grade 6',
    subject: 'ELA',
    questionCount: 8,
    createdAt: '2026-03-18',
    tab: 'my-worksheets',
  },
  {
    id: 'ws_003',
    title: 'Intro to Photosynthesis',
    grade: 'Grade 7',
    subject: 'Science',
    questionCount: 10,
    createdAt: '2026-03-20',
    tab: 'public-library',
  },
  {
    id: 'ws_004',
    title: 'Civics: Branches of Government',
    grade: 'Grade 8',
    subject: 'Social Studies',
    questionCount: 15,
    createdAt: '2026-03-23',
    tab: 'assigned-worksheets',
  },
  {
    id: 'ws_005',
    title: 'Algebra Expressions Checkpoint',
    grade: 'Grade 7',
    subject: 'Math',
    questionCount: 11,
    createdAt: '2026-03-29',
    tab: 'drafts',
  },
];

export const createWorksheetOptions = [
  'Generate with AI',
  'Create from Scratch',
  'Import Document',
  'Import Existing Form',
  'Clone Existing Worksheet',
];
