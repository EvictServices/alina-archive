import { NextResponse } from 'next/server';
import { getCached, setCached } from '@/lib/shared'

const EXTERNAL_API_URL = 'https://elara.evict.bot/commands';
const CACHE_KEY = 'commands:data';
const CACHE_DURATION = 300; // 5 minutes

export async function GET() {
  try {
    const cached = await getCached<any>(CACHE_KEY);
    if (cached) {
      console.log('[Cache HIT] Serving cached commands data');
      return NextResponse.json(cached, {
        headers: {
          'X-Cache': 'HIT',
          'Cache-Control': 'public, s-maxage=300',
        },
      });
    }

    const response = await fetch(EXTERNAL_API_URL, {
      next: { revalidate: CACHE_DURATION },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch from external API');
    }

    const data = await response.json();

    await setCached(CACHE_KEY, data, CACHE_DURATION);

    return NextResponse.json(data, {
      headers: {
        'X-Cache': 'MISS',
        'Cache-Control': 'public, s-maxage=300',
      },
    });
  } catch (error) {
    console.error('Commands API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch commands' },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );
  }
}
