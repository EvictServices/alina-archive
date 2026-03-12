import type { Update } from '@/types/updates'
import { UpdateHeader } from './UpdateHeader'

interface UpdateContentProps {
  update: Update | undefined
  MDXContent: any
  loading: boolean
}

export function UpdateContent({ update, MDXContent, loading }: UpdateContentProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-white/50">Loading...</div>
      </div>
    )
  }

  if (!update || !MDXContent) {
    return (
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
    )
  }

  return (
    <article className="max-w-4xl mx-auto px-2 sm:px-4 lg:px-12">
      <UpdateHeader update={update} />
      
      <div className="prose prose-invert max-w-none">
        <MDXContent />
      </div>
    </article>
  )
}
