'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getUpdates } from '@/lib/updates'
import type { Update } from '@/types/updates'
import { UpdatesSidebar, MobileControls, UpdateContent } from '@/components/updates'

export default function UpdatesContent() {
  const [updates, setUpdates] = useState<Update[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const [MDXContent, setMDXContent] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    getUpdates().then(setUpdates)
  }, [])

  useEffect(() => {
    const slug = searchParams.get('update')
    if (slug && updates.length > 0) {
      setSelectedSlug(slug)
      loadMDX(slug)
    } else if (updates.length > 0 && !selectedSlug) {
      setSelectedSlug(updates[0].slug)
      loadMDX(updates[0].slug)
    }
  }, [searchParams, updates])

  const loadMDX = async (slug: string) => {
    setLoading(true)
    try {
      const module = await import(`@/updates/${slug}.mdx`)
      setMDXContent(() => module.default)
    } catch (error) {
      console.error('Failed to load update:', error)
      setMDXContent(null)
    }
    setLoading(false)
  }

  const handleUpdateClick = (slug: string) => {
    setSelectedSlug(slug)
    loadMDX(slug)
    router.push(`/updates?update=${slug}`, { scroll: false })
  }

  const filteredUpdates = updates.filter(update => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      update.metadata.title.toLowerCase().includes(query) ||
      update.metadata.description.toLowerCase().includes(query)
    )
  })

  const selectedUpdate = updates.find(u => u.slug === selectedSlug)

  return (
    <main className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1600px] mx-auto pt-12 lg:pt-20">
        <div className="flex relative gap-6 items-start">
          <UpdatesSidebar
            updates={filteredUpdates}
            searchQuery={searchQuery}
            selectedSlug={selectedSlug}
            onSearchChange={setSearchQuery}
            onUpdateClick={handleUpdateClick}
          />

          <div className="flex-1 lg:min-h-0 w-full">
            <MobileControls
              updates={filteredUpdates}
              searchQuery={searchQuery}
              selectedSlug={selectedSlug}
              onSearchChange={setSearchQuery}
              onUpdateClick={handleUpdateClick}
            />

            <UpdateContent
              update={selectedUpdate}
              MDXContent={MDXContent}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
          )}
        </div>
      </div>
      </div>
    </main>
  )
}
