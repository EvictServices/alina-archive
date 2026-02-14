'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getUpdates } from '@/lib/updates'
import type { Update } from '@/types/updates'

export default function UpdatesContent() {
  const [updates, setUpdates] = useState<Update[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const [MDXContent, setMDXContent] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [showSidebar, setShowSidebar] = useState(true)
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
      setShowSidebar(false)
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
    setShowSidebar(false)
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
    <main className="min-h-screen bg-transparent pt-20">
      <div className="h-[calc(100vh-5rem)] flex relative max-w-[1600px] mx-auto">
        <aside className={`${
          showSidebar ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 absolute lg:relative z-10 w-80 h-full border-r border-white/10 flex flex-col backdrop-blur-sm bg-[#1a1625]/95 lg:bg-white/[0.01] transition-transform duration-300`}>
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center justify-between mb-3 lg:hidden">
              <h2 className="text-sm font-medium text-white">Updates</h2>
              <button
                onClick={() => setShowSidebar(false)}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/60">
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-white/40">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search updates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/[0.02] border border-[#ccccff]/20 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#ccccff]/40 transition-colors"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            <div className="p-2">
              {filteredUpdates.map((update) => (
                <button
                  key={update.slug}
                  onClick={() => handleUpdateClick(update.slug)}
                  className={`w-full text-left p-3 rounded-lg mb-1 transition-all group ${
                    selectedSlug === update.slug
                      ? 'bg-[#ccccff]/10 border border-[#ccccff]/30'
                      : 'hover:bg-white/[0.02] border border-transparent'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className={`text-sm font-medium line-clamp-2 ${
                      selectedSlug === update.slug ? 'text-white' : 'text-white/80 group-hover:text-white'
                    }`}>
                      {update.metadata.title}
                    </h3>
                    {selectedSlug === update.slug && (
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ccccff] flex-shrink-0 mt-1.5" />
                    )}
                  </div>
                  <p className="text-xs text-white/50 line-clamp-2 mb-2">
                    {update.metadata.description}
                  </p>
                  <time className="text-xs text-white/40">
                    {new Date(update.metadata.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </time>
                </button>
              ))}

              {filteredUpdates.length === 0 && (
                <div className="text-center py-8 text-white/50 text-sm">
                  No updates found
                </div>
              )}
            </div>
          </div>
        </aside>

        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          <div className="lg:hidden sticky top-0 z-10 backdrop-blur-sm bg-[#1a1625]/80 border-b border-white/10 px-4 py-3">
            <button
              onClick={() => setShowSidebar(true)}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12h18M3 6h18M3 18h18"/>
              </svg>
              <span className="text-sm">All Updates</span>
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-white/50">Loading...</div>
            </div>
          ) : selectedUpdate && MDXContent ? (
            <article className="max-w-4xl mx-auto px-6 lg:px-12 py-8">
              <header className="mb-8 pb-6 border-b border-white/10">
                <h1 className="text-3xl lg:text-4xl font-light text-white mb-4">
                  <span className="shimmer-text">{selectedUpdate.metadata.title}</span>
                </h1>
                <div className="flex flex-wrap items-center gap-3 lg:gap-4 text-xs lg:text-sm text-white/50">
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    <time dateTime={selectedUpdate.metadata.date}>
                      {new Date(selectedUpdate.metadata.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    {selectedUpdate.metadata.author}
                  </div>
                </div>
              </header>

              <div className="prose prose-invert max-w-none">
                <MDXContent />
              </div>
            </article>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center px-4">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-white/20">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="12" y1="18" x2="12" y2="12"/>
                  <line x1="9" y1="15" x2="15" y2="15"/>
                </svg>
                <p className="text-white/50 text-sm lg:text-base">Select an update to view</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
