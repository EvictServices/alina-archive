export function ErrorBanner() {
  return (
    <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 backdrop-blur-sm mb-6">
      <p className="text-red-400">
        Unable to fetch status information. Please try again later.
      </p>
    </div>
  )
}
