interface StatusBannerProps {
  loading: boolean
  error: boolean
  allOperational: boolean
}

export function StatusBanner({ loading, error, allOperational }: StatusBannerProps) {
  const getStatus = () => {
    if (loading) return { text: 'Checking Status...', color: 'bg-yellow-500' }
    if (error) return { text: 'Service Unavailable', color: 'bg-red-500' }
    if (allOperational) return { text: 'All Systems Operational', color: 'bg-green-500' }
    return { text: 'Partial Outage', color: 'bg-orange-500' }
  }

  const status = getStatus()

  return (
    <div className="mb-6 bg-white/[0.02] border border-[#5f828d]/20 rounded-2xl p-4 backdrop-blur-md">
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-2.5 h-2.5 rounded-full ${status.color} animate-pulse`} />
        <h2 className="text-lg font-light text-white">
          {status.text}
        </h2>
      </div>
      <p className="text-white/60 text-xs">
        Last updated: {new Date().toLocaleString()}
      </p>
    </div>
  )
}
