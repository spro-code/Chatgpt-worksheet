export const QUESTION_TYPES = [
  'Multiple Choice',
  'Checkbox',
  'Short Answer',
  'Long Answer',
  'True/False',
  'Fill in the Blank',
  'Matching',
  'Ordering',
  'Numeric',
  'Image Question',
] as const;

export type QuestionTypeLabel = (typeof QUESTION_TYPES)[number];

export interface WorksheetQuestion {
  id: string;
  title: string;
  prompt: string;
  type: QuestionTypeLabel;
  points: number;
}

export interface WorksheetSection {
  id: string;
  title: string;
  questions: WorksheetQuestion[];
}

export const sampleSections: WorksheetSection[] = [
  {
    id: 'sec-1',
    title: 'Section A: Concept Check',
    questions: [
      {
        id: 'q-1',
        title: 'Question 1',
        prompt: 'Which fraction is equivalent to 1/2?',
        type: 'Multiple Choice',
        points: 2,
      },
      {
        id: 'q-2',
        title: 'Question 2',
        prompt: 'Write a sentence explaining why 3/6 simplifies to 1/2.',
        type: 'Long Answer',
        points: 3,
      },
      {
        id: 'q-3',
        title: 'Question 3',
        prompt: 'True or False: 4/8 is less than 1/2.',
        type: 'True/False',
        points: 1,
      },
    ],
  },
  {
    id: 'sec-2',
    title: 'Section B: Application',
    questions: [
      {
        id: 'q-4',
        title: 'Question 4',
        prompt: 'Order these decimals from least to greatest: 0.6, 0.06, 0.16',
        type: 'Ordering',
        points: 2,
      },
      {
        id: 'q-5',
        title: 'Question 5',
        prompt: 'Fill in the blank: 0.25 = ___/100',
        type: 'Fill in the Blank',
        points: 2,
      },
    ],
  },
];
