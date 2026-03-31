import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    {
      message: 'Worksheet AI generation endpoint scaffolded. Implementation pending.',
    },
    { status: 501 },
  );
}
