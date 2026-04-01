import { NextResponse } from 'next/server';

import {
  generateWorksheetPayload,
  type GenerateWorksheetRequest,
  type InputSourceType,
} from '@/lib/services/worksheet-generator';

const validInputSources: InputSourceType[] = [
  'student_goal',
  'text_prompt',
  'file_upload',
  'url',
  'video_link',
];

function validateRequestPayload(payload: Partial<GenerateWorksheetRequest>): string | null {
  if (!payload.grade?.trim()) return 'grade is required';
  if (!payload.subject?.trim()) return 'subject is required';
  if (!payload.skill?.trim()) return 'skill is required';
  if (!payload.difficulty) return 'difficulty is required';
  if (!payload.worksheetType) return 'worksheetType is required';
  if (!payload.inputSource) return 'inputSource is required';
  if (!validInputSources.includes(payload.inputSource)) return 'inputSource is invalid';

  if (
    payload.numberOfQuestions === undefined ||
    Number.isNaN(payload.numberOfQuestions) ||
    payload.numberOfQuestions < 1
  ) {
    return 'numberOfQuestions must be at least 1';
  }

  return null;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<GenerateWorksheetRequest>;
    const validationError = validateRequestPayload(body);

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const worksheet = generateWorksheetPayload(body as GenerateWorksheetRequest);

    return NextResponse.json(worksheet, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        error: 'Invalid JSON payload. Please provide worksheet generation inputs.',
      },
      { status: 400 },
    );
  }
}
