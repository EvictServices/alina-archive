interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    return Array.from({ length: totalPages }, (_, i) => i + 1).filter(page => {
      if (page === 1 || page === totalPages) return true;
      if (Math.abs(page - currentPage) <= 1) return true;
      return false;
    });
  };

  const visiblePages = getVisiblePages();

  const handlePrevious = () => {
    onPageChange(Math.max(1, currentPage - 1));
  };

  const handleNext = () => {
    onPageChange(Math.min(totalPages, currentPage + 1));
  };

  return (
    <div className="mt-8 flex flex-col sm:grid sm:grid-cols-[120px_1fr_120px] items-center gap-4 max-w-4xl mx-auto">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="w-full sm:w-auto px-4 py-2 rounded-full bg-white/[0.02] border border-[#5f828d]/20 text-white hover:border-[#5f828d]/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-md order-2 sm:order-1"
      >
        Previous
      </button>
      
      <div className="flex items-center justify-center gap-1 sm:gap-2 flex-wrap order-1 sm:order-2">
        {visiblePages.map((page, idx, arr) => {
          const prevPage = arr[idx - 1];
          const showEllipsis = prevPage && page - prevPage > 1;
          
          return (
            <div key={page} className="flex items-center gap-1 sm:gap-2">
              {showEllipsis && (
                <span className="text-white/50 px-1 sm:px-2">...</span>
              )}
              <button
                onClick={() => onPageChange(page)}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full transition-colors text-sm sm:text-base ${
                  currentPage === page
                    ? 'bg-[#5f828d]/20 border border-[#5f828d]/40 text-white'
                    : 'bg-white/[0.02] border border-[#5f828d]/20 text-white/70 hover:text-white hover:border-[#5f828d]/40'
                } backdrop-blur-md`}
              >
                {page}
              </button>
            </div>
          );
        })}
      </div>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="w-full sm:w-auto px-4 py-2 rounded-full bg-white/[0.02] border border-[#5f828d]/20 text-white hover:border-[#5f828d]/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-md order-3"
      >
        Next
      </button>
    </div>
  );
}
