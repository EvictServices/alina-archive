import { NextResponse } from 'next/server';
import { getCached, setCached } from '@/lib/redis';

const EXTERNAL_API_URL = 'https://elara.evict.bot/health';
const CACHE_KEY = 'status:health';
const CACHE_DURATION = 30;

export async function GET() {
  try {
    const cached = await getCached<any>(CACHE_KEY);
    if (cached) {
      console.log('[Cache HIT] Serving cached status data');
      return NextResponse.json(cached, {
        headers: {
          'X-Cache': 'HIT',
          'Cache-Control': 'public, s-maxage=30',
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
        'Cache-Control': 'public, s-maxage=30',
      },
    });
  } catch (error) {
    console.error('Status API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch status' },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );
  }
}
