import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import { powManager } from '@/lib/pow';
import type { PowSolution } from '@/lib/pow';

const pool = new Pool({
  host: 'localhost',
  database: 'elara',
  user: 'postgres',
  password: 'admin',
  port: 5432,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { solution } = body as { solution: PowSolution };

    if (!solution) {
      return NextResponse.json(
        { success: false, error: 'POW solution required' },
        { status: 400 }
      );
    }

    const isValid = powManager.validateAndConsume(solution);

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired POW solution' },
        { status: 403 }
      );
    }

    const query = `
      SELECT 
        command_name,
        COUNT(*) as invoke_count
      FROM invoke_history.commands
      WHERE timestamp >= NOW() - INTERVAL '24 hours'
        AND category NOT IN ('Jishaku', 'Developer')
        AND LOWER(category) NOT IN ('jishaku', 'developer')
      GROUP BY command_name
      ORDER BY invoke_count DESC
      LIMIT 10
    `;

    const result = await pool.query(query);
    
    return NextResponse.json({
      success: true,
      data: result.rows,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch top commands',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      success: false,
      error: 'POW required. Use POST with solution.',
    },
    { status: 405 }
  );
}
