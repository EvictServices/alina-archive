export function ErrorBanner() {
  return (
    <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 backdrop-blur-sm mb-6">
      <div className="flex items-start gap-3">
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="text-red-400 flex-shrink-0 mt-0.5"
        >
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <div>
          <p className="text-red-400 font-medium mb-1">Commands API Unavailable</p>
          <p className="text-red-400/70 text-sm">
            We're currently unable to fetch the commands list. This may be due to scheduled maintenance or a temporary service outage. Please check back later.
          </p>
        </div>
      </div>
    </div>
  );
}
