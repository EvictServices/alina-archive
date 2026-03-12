import type { CommandsData } from '@/types/commands';
import { getCategoryIcon } from '@/lib/commands';
import { flattenCommands, getCommandsByCategory } from '@/lib/commands';

interface CategorySidebarProps {
  categories: string[];
  selectedCategory: string | null;
  commands: CommandsData;
  onCategorySelect: (category: string) => void;
}

export function CategorySidebar({ 
  categories, 
  selectedCategory, 
  commands, 
  onCategorySelect 
}: CategorySidebarProps) {
  return (
    <aside className="w-64 flex-shrink-0 hidden lg:block">
      <div className="sticky top-24 space-y-2">
        <h3 className="text-white/60 text-sm font-medium mb-3 px-3">Categories</h3>
        {categories.map(category => {
          const Icon = getCategoryIcon(category);
          const isActive = selectedCategory === category;
          const categoryCommands = flattenCommands(
            getCommandsByCategory(commands, category)
          );
          
          return (
            <button
              key={category}
              onClick={() => onCategorySelect(category)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-full transition-colors ${
                isActive 
                  ? 'bg-[#5f828d]/20 border border-[#5f828d]/40 text-white' 
                  : 'hover:bg-[#5f828d]/5 text-white/70 hover:text-white border border-transparent'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-white' : 'text-white/70'} />
              <div className="flex-1 text-left">
                <div className="text-sm font-medium bg-[#5f828d]/10 px-2 py-0.5 rounded-full inline-block">
                  {category}
                </div>
                <div className={`text-xs ${isActive ? 'text-white/80' : 'text-white/40'}`}>
                  {categoryCommands.length} commands
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
