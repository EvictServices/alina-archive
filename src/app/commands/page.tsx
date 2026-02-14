'use client'

import { useEffect, useState } from 'react';
import type { Command, CommandsData } from '@/types/commands';
import { processCommands } from '@/lib/commands';

const COPY_FEEDBACK_DURATION = 2000;
import { MdSecurity, MdBuild, MdSettings, MdInfo, MdSportsEsports, MdWavingHand, MdAutoAwesome, MdList } from 'react-icons/md';
import type { IconType } from 'react-icons';
import { FaLastfm } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { MdOutlineFileCopy } from "react-icons/md";
import { TbInfoSquareRounded } from "react-icons/tb";

const getCategoryIcon = (category: string): IconType => {
  const iconMap: Record<string, IconType> = {
    'All': MdList,
    'Config': MdSettings,
    'Fun': MdWavingHand,
    'Information': MdInfo,
    'Lastfm': FaLastfm,
    'Moderation': MdSecurity,
    'Socials': MdSportsEsports,
    'Utility': MdBuild,
  };
  return iconMap[category] || MdAutoAwesome;
};

export default function CommandsPage() {
  const [commands, setCommands] = useState<CommandsData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCommand, setSelectedCommand] = useState<Command | null>(null);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/commands')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        const rawCommands = data?.data?.commands || data?.commands || data;
        const processedData: CommandsData = {};
        
        for (const [category, cmds] of Object.entries(rawCommands)) {
          processedData[category] = processCommands(cmds as Command[]);
        }
        
        setCommands(processedData);
        setError(false);
        setLoading(false);
      })
      .catch(() => {
        fetch('/commands.json')
          .then(res => {
            if (!res.ok) throw new Error('Failed to fetch backup');
            return res.json();
          })
          .then(data => {
            const rawCommands = data?.data?.commands || data?.commands || data;
            const processedData: CommandsData = {};
            
            for (const [category, cmds] of Object.entries(rawCommands)) {
              processedData[category] = processCommands(cmds as Command[]);
            }
            
            setCommands(processedData);
            setError(false);
            setLoading(false);
          })
          .catch(() => {
            setError(true);
            setLoading(false);
          });
      });
  }, []);

  const categories = error 
    ? Object.keys(commands).filter(cat => cat !== 'No Category' && cat !== 'Developer').sort()
    : ['All', ...Object.keys(commands).filter(cat => cat !== 'No Category' && cat !== 'Developer').sort()];
  const totalCommands = Object.values(commands).reduce((acc, cmds) => acc + cmds.length, 0);

  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, selectedCategory]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCommand(text);
    setTimeout(() => setCopiedCommand(null), COPY_FEEDBACK_DURATION);
  };

  const flattenCommands = (commands: Command[]): Command[] => {
    const flattened: Command[] = [];
    const seen = new Set<string>();
    
    const addCommand = (cmd: Command) => {
      const key = cmd.qualified_name || cmd.name;
      if (!seen.has(key)) {
        seen.add(key);
        flattened.push(cmd);
      }
      
      if (cmd.subcommands && cmd.subcommands.length > 0) {
        cmd.subcommands.forEach(addCommand);
      }
    };
    
    commands.forEach(addCommand);
    return flattened;
  };

  const getFilteredCommands = () => {
    if (!selectedCategory) return [];
    
    if (!searchQuery) {
      let categoryCommands: Command[] = [];
      if (selectedCategory === 'All') {
        categoryCommands = flattenCommands(Object.values(commands).flat());
      } else {
        categoryCommands = flattenCommands(commands[selectedCategory] || []);
      }
      return categoryCommands;
    }
    
    const allCommands = flattenCommands(Object.values(commands).flat());
    const searchLower = searchQuery.toLowerCase().trim();
    
    return allCommands.filter(cmd => {
      const name = (cmd.name || '').toLowerCase();
      const qualifiedName = (cmd.qualified_name || '').toLowerCase();
      const description = (cmd.description || '').toLowerCase();
      const aliases = cmd.aliases || [];
      
      if (name.includes(searchLower)) return true;
      if (qualifiedName.includes(searchLower)) return true;
      if (description.includes(searchLower)) return true;
      if (Array.isArray(aliases) && aliases.some(alias => alias.toLowerCase().includes(searchLower))) return true;
      
      return false;
    });
  };

  const CommandCard = ({ command }: { command: Command }) => {
    return (
      <div className="bg-white/[0.02] border border-[#ccccff]/20 rounded-2xl p-4 hover:border-[#ccccff]/40 transition-colors backdrop-blur-md">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-white font-medium bg-[#ccccff]/10 px-3 py-1 rounded-full">
            {command.is_subcommand ? command.qualified_name : command.name}
          </h3>
          <div className="flex items-center gap-2 text-white">
            <div className="relative">
              <button
                onClick={() => copyToClipboard(command.is_subcommand ? command.qualified_name : command.name)}
                className="p-1 hover:bg-[#ccccff]/20 rounded transition-colors"
                title="Copy command"
              >
                <MdOutlineFileCopy />
              </button>
              {copiedCommand === (command.is_subcommand ? command.qualified_name : command.name) && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#ccccff] text-black text-xs px-2 py-1 rounded whitespace-nowrap animate-fade-in">
                  Copied!
                </div>
              )}
            </div>
            <button
              onClick={() => setSelectedCommand(command)}
              className="p-1 hover:bg-[#ccccff]/20 rounded transition-colors"
              title="Command info"
            >
              <TbInfoSquareRounded />
            </button>
          </div>
        </div>

        <p className="text-white/70 text-sm mb-3 line-clamp-2">
          {command.description}
        </p>

        <div className="space-y-2 text-xs">
          {command.signature && (
            <div>
              <span className="text-white/60">Arguments: </span>
              <span className="text-white/80">{command.signature}</span>
            </div>
          )}
          {command.permissions && command.permissions.length > 0 && (
            <div>
              <span className="text-white/60">Permissions: </span>
              <span className="text-white/80">{command.permissions.join(', ')}</span>
            </div>
          )}
          {command.signature && (
            <div>
              <span className="text-white/60">Syntax: </span>
              <code className="text-white/80 bg-[#ccccff]/10 px-1 rounded">
                {command.is_subcommand ? command.qualified_name : command.name} {command.signature}
              </code>
            </div>
          )}
          {command.aliases && command.aliases.length > 0 && (
            <div>
              <span className="text-white/60">Aliases: </span>
              <span className="text-white/80">{command.aliases.join(', ')}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const displayedCommands = getFilteredCommands();

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-transparent">
        <div className="text-white/60 text-lg">Loading commands...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto pt-20">
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h1 className="text-3xl sm:text-4xl font-light text-white">
            <span className="shimmer-text">Commands</span>
          </h1>
        </div>

        <div className="mb-6 bg-white/[0.02] border border-[#ccccff]/20 rounded-2xl p-4 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-2">
            {error ? (
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" y1="19" x2="20" y2="19" />
              </svg>
            )}
            <h2 className="text-lg font-light text-white">
              {error ? 'Service Unavailable' : `${totalCommands} commands available`}
            </h2>
          </div>
          <p className="text-white/60 text-xs">
            {error ? 'Unable to fetch commands. Please try again later.' : 'Browse all available commands for Evict'}
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 backdrop-blur-sm mb-6">
            <div className="flex items-start gap-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400 flex-shrink-0 mt-0.5">
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
        )}

        <div className="flex gap-6">
          <aside className="w-64 flex-shrink-0 hidden lg:block">
            <div className="sticky top-24 space-y-2">
              <h3 className="text-white/60 text-sm font-medium mb-3 px-3">Categories</h3>
              {categories.map(category => {
                const Icon = getCategoryIcon(category);
                const isActive = selectedCategory === category;
                const categoryCommands = category === 'All' 
                  ? flattenCommands(Object.values(commands).flat())
                  : flattenCommands(commands[category] || []);
                
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-full transition-colors ${
                      isActive 
                        ? 'bg-[#ccccff]/20 border border-[#ccccff]/40 text-white' 
                        : 'hover:bg-[#ccccff]/5 text-white/70 hover:text-white border border-transparent'
                    }`}
                  >
                    <Icon size={20} className={isActive ? 'text-white' : 'text-white/70'} />
                    <div className="flex-1 text-left">
                      <div className="text-sm font-medium bg-[#ccccff]/10 px-2 py-0.5 rounded-full inline-block">{category}</div>
                      <div className={`text-xs ${isActive ? 'text-white/80' : 'text-white/40'}`}>
                        {categoryCommands.length} commands
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="mb-6 lg:hidden">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map(category => {
                  const Icon = getCategoryIcon(category);
                  const isActive = selectedCategory === category;
                  
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors flex-shrink-0 ${
                        isActive 
                          ? 'bg-[#ccccff]/20 border border-[#ccccff]/40 text-white' 
                          : 'bg-[#ccccff]/5 text-white/70 hover:text-white border border-transparent'
                      }`}
                    >
                      <Icon size={16} className={isActive ? 'text-white' : 'text-white/70'} />
                      <span className="text-sm font-medium">{category}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-white/40">
                  <FaSearch />
                </div>
                <input
                  type="text"
                  placeholder="Search commands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/[0.02] border border-[#ccccff]/20 rounded-full pl-12 pr-4 py-3 text-white placeholder-[#ccccff]/40 focus:outline-none focus:border-[#ccccff]/50 transition-colors backdrop-blur-md"
                />
              </div>
            </div>

            {selectedCategory && (
              <div className="space-y-4">
                {displayedCommands.map((command, index) => (
                  <CommandCard
                    key={`${command.qualified_name || command.name}-${command.category || ''}-${index}`}
                    command={command}
                  />
                ))}

                {displayedCommands.length === 0 && (
                  <div className="text-center py-12 text-white/50">
                    {searchQuery ? `No commands found matching "${searchQuery}"` : 'No commands in this category'}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedCommand && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedCommand(null)}
        >
          <div 
            className="bg-white/[0.02] border border-[#ccccff]/30 rounded-xl max-w-md w-full p-6 shadow-2xl backdrop-blur-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#ccccff] rounded-full" />
                <h2 className="text-white font-semibold">Command Information</h2>
              </div>
              <button
                onClick={() => setSelectedCommand(null)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-white/60 text-xs uppercase mb-1">Command</p>
                <p className="text-white font-medium">{selectedCommand.is_subcommand ? selectedCommand.qualified_name : selectedCommand.name}</p>
              </div>

              {selectedCommand.aliases && selectedCommand.aliases.length > 0 && (
                <div>
                  <p className="text-white/60 text-xs uppercase mb-1">Aliases</p>
                  <p className="text-white">{selectedCommand.aliases.join(', ')}</p>
                </div>
              )}

              <div>
                <p className="text-white/60 text-xs uppercase mb-2">Permissions Required</p>
                {selectedCommand.permissions && selectedCommand.permissions.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedCommand.permissions.map(perm => (
                      <span
                        key={perm}
                        className="bg-[#ccccff]/20 text-white px-3 py-1 rounded-full text-sm"
                      >
                        {perm}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-white/80 text-sm">None</p>
                )}
              </div>

              <div>
                <p className="text-white/60 text-xs uppercase mb-1">Description</p>
                <p className="text-white/80 text-sm">{selectedCommand.description}</p>
              </div>

              {selectedCommand.signature && (
                <div>
                  <p className="text-white/60 text-xs uppercase mb-1">Syntax</p>
                  <code className="text-white/80 bg-[#ccccff]/10 px-3 py-2 rounded block text-sm">
                    {selectedCommand.is_subcommand ? selectedCommand.qualified_name : selectedCommand.name} {selectedCommand.signature}
                  </code>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
