import { NextResponse } from 'next/server';
import { powManager } from '@/lib/pow';

export async function GET() {
  try {
    const challenge = powManager.generateChallenge();
    
    return NextResponse.json({
      success: true,
      challenge,
    });
  } catch (error) {
    console.error('POW challenge error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to generate challenge',
      },
      { status: 500 }
    );
  }
}
