import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('http://localhost:8000/health', {
      headers: {
        'User-Agent': 'evict.bot/1.0',
      },
      cache: 'no-store',
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch health data');
    }
    
    const data = await res.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Health API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch health data' },
      { status: 500 }
    );
  }
}
