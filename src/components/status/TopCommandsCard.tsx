interface TopCommand {
  command_name: string
  invoke_count: number
}

interface TopCommandsCardProps {
  topCommands: TopCommand[]
}

export function TopCommandsCard({ topCommands }: TopCommandsCardProps) {
  if (topCommands.length === 0) return null

  const totalInvokes = topCommands.reduce((sum, cmd) => sum + Number(cmd.invoke_count), 0)

  return (
    <div className="mt-6 bg-white/[0.02] border border-[#5f828d]/20 rounded-2xl p-4 backdrop-blur-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
          </svg>
          <h2 className="text-lg font-light text-white">
            Top Commands (24h)
          </h2>
        </div>
        <span className="text-white/60 text-xs">
          {totalInvokes.toLocaleString()} total invokes
        </span>
      </div>
      
      <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-3 overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0 scrollbar-hide">
        {topCommands.map((cmd, index) => (
          <div 
            key={cmd.command_name}
            className="bg-[#5f828d]/10 border border-[#5f828d]/20 rounded-xl p-3 hover:border-[#5f828d]/40 transition-colors flex-shrink-0 w-48 sm:w-auto"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#5f828d]/20 flex items-center justify-center text-white text-xs font-medium">
                  {index + 1}
                </div>
                <span className="text-white text-sm font-medium truncate">
                  {cmd.command_name}
                </span>
              </div>
            </div>
            <div className="text-white/80 text-lg font-light">
              {Number(cmd.invoke_count).toLocaleString()}
              <span className="text-white/60 text-xs ml-1">uses</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
