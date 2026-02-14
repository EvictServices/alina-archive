import { Suspense } from 'react'
import DocsContent from './DocsContent'

export const metadata = {
  title: 'Documentation - Evict',
  description: 'Official documentation for Evict - Learn how to use all features',
}

export default function DocsPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-transparent pt-20">
        <div className="h-[calc(100vh-5rem)] flex items-center justify-center">
          <div className="text-white/50">Loading...</div>
        </div>
      </main>
    }>
      <DocsContent />
    </Suspense>
  )
}
