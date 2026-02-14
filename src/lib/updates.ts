import { Update } from '@/types/updates'

export async function getUpdates(): Promise<Update[]> {
  const updates = [
    {
      slug: '2026-02-14-search-improvements',
      metadata: {
        title: 'Search Improvements',
        date: '2026-02-14',
        author: 'Evict Team',
        description: 'Enhanced command search functionality with partial matching and description search',
        version: 'v1.2.0'
      }
    },
    {
      slug: '2026-02-01-website-launch',
      metadata: {
        title: 'Website Launch',
        date: '2026-02-01',
        author: 'Evict Team',
        description: 'Official launch of the new Evict website with enhanced features',
        version: 'v1.0.0'
      }
    }
  ]

  return updates.sort((a, b) => 
    new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  )
}
