import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="mb-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-4 z-10 flex items-center pointer-events-none text-white">
          <FaSearch className="h-4 w-4" />
        </div>
        <input
          type="text"
          placeholder="Search commands..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="relative z-0 w-full bg-white/[0.02] border border-[#5f828d]/20 rounded-full pl-12 pr-4 py-3 text-white/95 placeholder:text-white/55 caret-white focus:outline-none focus:border-[#5f828d]/50 transition-colors backdrop-blur-md"
        />
      </div>
    </div>
  );
}
