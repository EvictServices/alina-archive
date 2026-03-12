interface SectionDividerProps {
  gradientId: string;
}

export function SectionDivider({ gradientId }: SectionDividerProps) {
  return (
    <div className="flex items-center justify-center">
      <svg
        viewBox="0 0 800 80"
        aria-hidden="true"
        className="h-10 w-full max-w-2xl"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a8d5e2" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#c8e5f0" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#b8dfe8" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <path
          d="M20 40 C 200 10, 300 70, 400 40 S 600 10, 780 40"
          stroke={`url(#${gradientId})`}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
