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
  const [showSidebar, setShowSidebar] = useState(false)
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
    <main className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1600px] mx-auto pt-12 lg:pt-20">
        <div className="flex relative gap-6 items-start">
        <aside className="hidden lg:flex w-80 lg:sticky lg:top-24 flex-col max-h-[calc(100vh-8rem)]">
          <div className="p-2 border-b border-white/10">
            <div className="relative mb-2">
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
                className="w-full bg-white/[0.02] border border-[#ccccff]/20 rounded-full pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#ccccff]/40 transition-colors"
              />
            </div>
          </div>

          <div className="scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent max-h-[calc(100vh-16rem)] overflow-y-auto">
            <div className="p-2">
              {filteredUpdates.map((update) => {
                const isActive = selectedSlug === update.slug
                return (
                  <button
                    key={update.slug}
                    onClick={() => handleUpdateClick(update.slug)}
                    className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-full mb-2 transition-colors ${
                      isActive
                        ? 'bg-[#ccccff]/20 border border-[#ccccff]/40 text-white'
                        : 'hover:bg-[#ccccff]/5 text-white/70 hover:text-white border border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#ccccff]/10 flex-shrink-0 mt-0.5">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isActive ? 'text-white' : 'text-white/60'}>
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                      </svg>
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <div className="text-sm font-medium text-white line-clamp-1 flex-1">
                          {update.metadata.title}
                        </div>
                        {update.metadata.version && (
                          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full flex-shrink-0 ${
                            isActive 
                              ? 'bg-[#ccccff]/20 text-[#ccccff]' 
                              : 'bg-[#ccccff]/10 text-[#ccccff]/70'
                          }`}>
                            {update.metadata.version}
                          </span>
                        )}
                      </div>
                      <div className={`text-xs mb-1 line-clamp-2 ${isActive ? 'text-white/70' : 'text-white/50'}`}>
                        {update.metadata.description}
                      </div>
                      <time className={`text-xs ${isActive ? 'text-white/60' : 'text-white/40'}`}>
                        {new Date(update.metadata.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </time>
                    </div>
                  </button>
                )
              })}

              {filteredUpdates.length === 0 && (
                <div className="text-center py-8 text-white/50 text-sm">
                  No updates found
                </div>
              )}
            </div>
          </div>
        </aside>

        <div className="flex-1 lg:min-h-0 w-full">
          <div className="lg:hidden max-w-2xl mx-auto space-y-3 mb-6">
            <div className="bg-white/[0.02] border border-[#ccccff]/20 rounded-2xl p-4">
              <label className="block text-xs font-medium text-white/60 mb-2">Select Update</label>
              <select
                value={selectedSlug || ''}
                onChange={(e) => handleUpdateClick(e.target.value)}
                className="w-full bg-white/[0.02] border border-[#ccccff]/20 rounded-full px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#ccccff]/40 transition-colors appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 4l4 4 4-4' stroke='rgba(255,255,255,0.4)' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  paddingRight: '2.5rem'
                }}
              >
                {filteredUpdates.map((update) => (
                  <option key={update.slug} value={update.slug} className="bg-[#1a1625] text-white">
                    {update.metadata.title} {update.metadata.version ? `(${update.metadata.version})` : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-white/[0.02] border border-[#ccccff]/20 rounded-2xl p-4">
              <label className="block text-xs font-medium text-white/60 mb-2">Search Updates</label>
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
                  className="w-full bg-white/[0.02] border border-[#ccccff]/20 rounded-full pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#ccccff]/40 transition-colors"
                />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-white/50">Loading...</div>
            </div>
          ) : selectedUpdate && MDXContent ? (
            <article className="max-w-4xl mx-auto px-2 sm:px-4 lg:px-12">
              <header className="mb-6 lg:mb-8 pb-6 border-b border-white/10">
                <div className="flex flex-wrap items-center gap-3 mb-3 lg:mb-4">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white">
                    <span className="shimmer-text">{selectedUpdate.metadata.title}</span>
                  </h1>
                  {selectedUpdate.metadata.version && (
                    <div className="px-2 sm:px-2.5 py-1 bg-[#ccccff]/10 border border-[#ccccff]/20 rounded-full">
                      <span className="text-xs sm:text-sm font-medium text-[#ccccff]">
                        {selectedUpdate.metadata.version}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2 lg:gap-4 text-xs lg:text-sm text-white/50">
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
            <div className="flex items-center justify-center py-20">
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
      </div>
    </main>
  )
}
