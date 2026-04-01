export type InputSourceType = 'student_goal' | 'text_prompt' | 'file_upload' | 'url' | 'video_link';

export interface GenerateWorksheetRequest {
  grade: string;
  subject: string;
  skill: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed';
  numberOfQuestions: number;
  worksheetType: 'practice' | 'quiz' | 'exit_ticket' | 'homework' | 'assessment';
  inputSource: InputSourceType;
  sourceContent?: string;
}

export interface GeneratedQuestion {
  id: string;
  type: string;
  prompt: string;
  options?: string[];
  answer?: string;
  points: number;
}

export interface GeneratedWorksheet {
  title: string;
  description: string;
  sections: Array<{
    title: string;
    questions: GeneratedQuestion[];
  }>;
}

const difficultyPromptMap: Record<GenerateWorksheetRequest['difficulty'], string> = {
  easy: 'Focus on foundational recall and confidence building.',
  medium: 'Balance conceptual understanding with short application tasks.',
  hard: 'Require multi-step reasoning and explanations.',
  mixed: 'Mix straightforward, moderate, and challenge questions.',
};

function buildQuestionPrompt(subject: string, skill: string, difficulty: string, index: number) {
  return `${index}. ${subject} - ${skill}: ${difficulty} question`;
}

function makeQuestion(index: number, request: GenerateWorksheetRequest): GeneratedQuestion {
  const prompt = buildQuestionPrompt(request.subject, request.skill, request.difficulty, index + 1);

  return {
    id: `q-${index + 1}`,
    type: index % 2 === 0 ? 'Multiple Choice' : 'Short Answer',
    prompt,
    options:
      index % 2 === 0
        ? ['Option A', 'Option B', 'Option C', 'Option D'].map((option) => `${option} (${request.skill})`)
        : undefined,
    answer: index % 2 === 0 ? `Option A (${request.skill})` : `Sample response for ${request.skill}`,
    points: 1,
  };
}

export function generateWorksheetPayload(request: GenerateWorksheetRequest): GeneratedWorksheet {
  const questionCount = Math.max(1, Math.min(50, request.numberOfQuestions));

  const questions = Array.from({ length: questionCount }, (_, index) => makeQuestion(index, request));

  return {
    title: `${request.grade} ${request.subject} ${request.worksheetType.replace('_', ' ')} - ${request.skill}`,
    description: [
      `AI-generated worksheet for ${request.grade} ${request.subject}.`,
      `Skill focus: ${request.skill}.`,
      difficultyPromptMap[request.difficulty],
      `Input source: ${request.inputSource}.`,
      request.sourceContent ? `Source context: ${request.sourceContent.slice(0, 140)}` : '',
    ]
      .filter(Boolean)
      .join(' '),
    sections: [
      {
        title: `${request.skill} Practice`,
        questions,
      },
    ],
  };
}
