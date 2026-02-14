'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getDocs, getDocsByCategory } from '@/lib/docs'
import type { Doc } from '@/types/docs'

export default function DocsContent() {
  const [docs, setDocs] = useState<Doc[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const [MDXContent, setMDXContent] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    getDocs().then(setDocs)
  }, [])

  useEffect(() => {
    const slug = searchParams.get('doc')
    if (slug && docs.length > 0) {
      setSelectedSlug(slug)
      loadMDX(slug)
    } else if (docs.length > 0 && !selectedSlug) {
      setSelectedSlug(docs[0].slug)
      loadMDX(docs[0].slug)
    }
  }, [searchParams, docs])

  const loadMDX = async (slug: string) => {
    setLoading(true)
    try {
      const module = await import(`@/docs/${slug}.mdx`)
      setMDXContent(() => module.default)
    } catch (error) {
      console.error('Failed to load doc:', error)
      setMDXContent(null)
    }
    setLoading(false)
  }

  const handleDocClick = (slug: string) => {
    setSelectedSlug(slug)
    loadMDX(slug)
    router.push(`/docs?doc=${slug}`, { scroll: false })
  }

  const filteredDocs = docs.filter(doc => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      doc.metadata.title.toLowerCase().includes(query) ||
      doc.metadata.description.toLowerCase().includes(query) ||
      doc.metadata.category.toLowerCase().includes(query)
    )
  })

  const docsByCategory = getDocsByCategory(filteredDocs)
  const selectedDoc = docs.find(d => d.slug === selectedSlug)

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
                  placeholder="Search docs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/[0.02] border border-[#ccccff]/20 rounded-full pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#ccccff]/40 transition-colors"
                />
              </div>
            </div>

            <div className="scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent max-h-[calc(100vh-16rem)] overflow-y-auto">
              <div className="p-2">
                {Object.entries(docsByCategory).map(([category, categoryDocs]) => (
                  <div key={category} className="mb-4">
                    <div className="px-3 py-2 text-xs font-medium text-white/60 uppercase tracking-wider">
                      {category}
                    </div>
                    {categoryDocs.map((doc) => {
                      const isActive = selectedSlug === doc.slug
                      return (
                        <button
                          key={doc.slug}
                          onClick={() => handleDocClick(doc.slug)}
                          className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-full mb-2 transition-colors ${
                            isActive
                              ? 'bg-[#ccccff]/20 border border-[#ccccff]/40 text-white'
                              : 'hover:bg-[#ccccff]/5 text-white/70 hover:text-white border border-transparent'
                          }`}
                        >
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#ccccff]/10 flex-shrink-0 mt-0.5">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isActive ? 'text-white' : 'text-white/60'}>
                              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                            </svg>
                          </div>
                          <div className="flex-1 text-left min-w-0">
                            <div className="text-sm font-medium text-white line-clamp-1 mb-0.5">
                              {doc.metadata.title}
                            </div>
                            <div className={`text-xs line-clamp-2 ${isActive ? 'text-white/70' : 'text-white/50'}`}>
                              {doc.metadata.description}
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                ))}

                {filteredDocs.length === 0 && (
                  <div className="text-center py-8 text-white/50 text-sm">
                    No documentation found
                  </div>
                )}
              </div>
            </div>
          </aside>

          <div className="flex-1 lg:min-h-0 w-full">
            <div className="lg:hidden max-w-2xl mx-auto space-y-3 mb-6">
              <div className="bg-white/[0.02] border border-[#ccccff]/20 rounded-2xl p-4">
                <label className="block text-xs font-medium text-white/60 mb-2">Select Documentation</label>
                <select
                  value={selectedSlug || ''}
                  onChange={(e) => handleDocClick(e.target.value)}
                  className="w-full bg-white/[0.02] border border-[#ccccff]/20 rounded-full px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#ccccff]/40 transition-colors appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 4l4 4 4-4' stroke='rgba(255,255,255,0.4)' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                    paddingRight: '2.5rem'
                  }}
                >
                  {Object.entries(docsByCategory).map(([category, categoryDocs]) => (
                    <optgroup key={category} label={category} className="bg-[#1a1625] text-white/60">
                      {categoryDocs.map((doc) => (
                        <option key={doc.slug} value={doc.slug} className="bg-[#1a1625] text-white">
                          {doc.metadata.title}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              <div className="bg-white/[0.02] border border-[#ccccff]/20 rounded-2xl p-4">
                <label className="block text-xs font-medium text-white/60 mb-2">Search Documentation</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-white/40">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"/>
                      <path d="m21 21-4.35-4.35"/>
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search docs..."
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
            ) : selectedDoc && MDXContent ? (
              <article className="max-w-4xl mx-auto px-2 sm:px-4 lg:px-12">
                <header className="mb-6 lg:mb-8 pb-6 border-b border-white/10">
                  <div className="flex flex-wrap items-center gap-3 mb-3 lg:mb-4">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white">
                      <span className="shimmer-text">{selectedDoc.metadata.title}</span>
                    </h1>
                    <div className="px-2 sm:px-2.5 py-1 bg-[#ccccff]/10 border border-[#ccccff]/20 rounded-full">
                      <span className="text-xs sm:text-sm font-medium text-[#ccccff]">
                        {selectedDoc.metadata.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 lg:gap-4 text-xs lg:text-sm text-white/50">
                    <div className="flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                      </svg>
                      {selectedDoc.metadata.description}
                    </div>
                    {selectedDoc.metadata.lastUpdated && (
                      <div className="flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"/>
                          <polyline points="12 6 12 12 16 14"/>
                        </svg>
                        Last updated: {new Date(selectedDoc.metadata.lastUpdated).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    )}
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
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                  </svg>
                  <p className="text-white/50 text-sm lg:text-base">Select a document to view</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
