import { Suspense } from 'react'
import UpdatesContent from './UpdatesContent'

export const metadata = {
  title: 'Updates - Evict',
  description: 'Latest updates and announcements from the Evict Team',
}

export default function UpdatesPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-transparent pt-20">
        <div className="h-[calc(100vh-5rem)] flex items-center justify-center">
          <div className="text-white/50">Loading...</div>
        </div>
      </main>
    }>
      <UpdatesContent />
    </Suspense>
  )
}
