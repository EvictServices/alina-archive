import { getCategoryIcon } from '@/lib/command-constants';

interface CategoryButtonsProps {
  categories: string[];
  selectedCategory: string | null;
  onCategorySelect: (category: string) => void;
}

export function CategoryButtons({ 
  categories, 
  selectedCategory, 
  onCategorySelect 
}: CategoryButtonsProps) {
  return (
    <div className="mb-6 lg:hidden">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map(category => {
          const Icon = getCategoryIcon(category);
          const isActive = selectedCategory === category;
          
          return (
            <button
              key={category}
              onClick={() => onCategorySelect(category)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors flex-shrink-0 ${
                isActive 
                  ? 'bg-[#5f828d]/20 border border-[#5f828d]/40 text-white' 
                  : 'bg-[#5f828d]/5 text-white/70 hover:text-white border border-transparent'
              }`}
            >
              <Icon size={16} className={isActive ? 'text-white' : 'text-white/70'} />
              <span className="text-sm font-medium">{category}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
