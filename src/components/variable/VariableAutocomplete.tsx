"use client";

import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { defaultVariables } from "@/types/embeds";

type VariableAutocompleteProps = {
  suggestions: string[];
  selectedIndex: number;
  position: { x: number; y: number; width: number; height: number } | null;
  isVisible: boolean;
  onSelect: (variable: string) => void;
  autocompleteRef: React.RefObject<HTMLDivElement>;
};

export const VariableAutocomplete = ({
  suggestions,
  selectedIndex,
  position,
  isVisible,
  onSelect,
  autocompleteRef,
}: VariableAutocompleteProps) => {
  if (!position || typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {isVisible && suggestions.length > 0 && (
        <motion.div
          ref={autocompleteRef}
          initial={{ opacity: 0, scale: 0.96, y: -3 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -3 }}
          transition={{ duration: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="select-none fixed z-50 bg-alina-200/95 backdrop-blur-sm border border-white/15 rounded-lg shadow-2xl overflow-hidden overflow-y-auto max-h-40 min-w-44 scroll-smooth"
          style={{
            left: position.x,
            top: position.y + 2,
            maxWidth: Math.max(position.width, 176),
          }}
        >
          <div className="py-0.5">
            {suggestions.map((variable, index) => (
              <motion.div
                key={variable}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.015 }}
                className={`px-2.5 py-1.5 cursor-pointer transition-all duration-100 ${
                  index === selectedIndex
                    ? "bg-alina-primary/12 text-alina-primary border-l border-alina-primary"
                    : "text-white/75 hover:bg-white/[0.03] hover:text-white/90"
                }`}
                onClick={() => onSelect(variable)}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-xs truncate">
                    {variable}
                  </span>
                  <span className="text-[10px] text-white/35 flex-shrink-0 px-1 bg-white/10 rounded font-medium">
                    {`{${variable}}`}
                  </span>
                </div>
                <div className="text-[10px] text-white/45 mt-0.5 truncate leading-tight">
                  {defaultVariables[variable as keyof typeof defaultVariables]}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
