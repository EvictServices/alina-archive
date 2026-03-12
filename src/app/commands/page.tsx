'use client'

import { useEffect, useState } from 'react';
import type { Command } from '@/types/commands';
import { Preloader } from '@/components/global/Preloader';
import { useCommands } from '@/hooks/useCommands';
import {
  flattenCommands,
  getCommandsByCategory,
  filterCommandsBySearch,
  getTotalCommandsCount,
  getFilteredCategories,
  getCommandDisplayName,
} from '@/lib/command-utils';
import { COPY_FEEDBACK_DURATION, ITEMS_PER_PAGE } from '@/lib/command-constants';
import { CommandCard } from '@/components/commands/CommandCard';
import { CommandModal } from '@/components/commands/CommandModal';
import { Pagination } from '@/components/commands/Pagination';
import { CategorySidebar } from '@/components/commands/CategorySidebar';
import { CategoryButtons } from '@/components/commands/CategoryButtons';
import { StatsCards } from '@/components/commands/StatsCards';
import { ErrorBanner } from '@/components/commands/ErrorBanner';
import { SearchBar } from '@/components/commands/SearchBar';

export default function CommandsPage() {
  const { commands, loading, error } = useCommands();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCommand, setSelectedCommand] = useState<Command | null>(null);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const categories = getFilteredCategories(commands, true, error);
  const totalCommands = getTotalCommandsCount(commands);

  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, selectedCategory]);

  useEffect(() => {
    if (selectedCommand) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedCommand]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCommand(text);
    setTimeout(() => setCopiedCommand(null), COPY_FEEDBACK_DURATION);
  };

  const getFilteredCommands = () => {
    if (!selectedCategory) return [];
    
    const categoryCommands = getCommandsByCategory(commands, selectedCategory);
    const flattened = flattenCommands(categoryCommands);
    return filterCommandsBySearch(flattened, searchQuery);
  };

  const allFilteredCommands = getFilteredCommands();
  const totalPages = Math.ceil(allFilteredCommands.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const displayedCommands = allFilteredCommands.slice(startIndex, endIndex);

  if (loading) {
    return <Preloader show={true} controlled={true} />;
  }

  return (
    <main className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8">
      <div
        className={`max-w-7xl mx-auto pt-20 transition-[filter] duration-200 ${
          selectedCommand ? 'blur-lg' : 'blur-0'
        }`}
      >
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h1 className="text-3xl sm:text-4xl font-light text-white">
            <span className="shimmer-text">Commands</span>
          </h1>
        </div>

        <StatsCards 
          totalCommands={totalCommands} 
          totalCategories={categories.filter(c => c !== 'All').length}
          error={error}
        />

        {error && <ErrorBanner />}

        <div className="flex gap-6">
          <CategorySidebar
            categories={categories}
            selectedCategory={selectedCategory}
            commands={commands}
            onCategorySelect={setSelectedCategory}
          />

          <div className="flex-1 min-w-0">
            <CategoryButtons
              categories={categories}
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />

            <SearchBar value={searchQuery} onChange={setSearchQuery} />

            {selectedCategory && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {displayedCommands.map((command, index) => (
                    <CommandCard
                      key={`${command.qualified_name || command.name}-${command.category || ''}-${index}`}
                      command={command}
                      onSelect={setSelectedCommand}
                      onCopy={copyToClipboard}
                      isCopied={copiedCommand === getCommandDisplayName(command)}
                    />
                  ))}

                  {allFilteredCommands.length === 0 && (
                    <div className="col-span-full text-center py-12 text-white/50">
                      {searchQuery ? `No commands found matching "${searchQuery}"` : 'No commands in this category'}
                    </div>
                  )}
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>
        </div>
      </div>

      <CommandModal command={selectedCommand} onClose={() => setSelectedCommand(null)} />
    </main>
  );
}
