import { useState, useRef, useCallback } from "react";
import { defaultVariables } from "@/types/embeds";

export const useVariableAutocomplete = (onChange: (value: string) => void) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [position, setPosition] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);
  const autocompleteRef = useRef<HTMLDivElement>(null);

  const allVariables = Object.keys(defaultVariables);

  const handleInputChange = useCallback(
    (value: string, cursorPosition: number) => {
      if (!textareaRef.current) return;

      const textBeforeCursor = value.substring(0, cursorPosition);
      const match = textBeforeCursor.match(/\{([a-zA-Z0-9._]*)$/);

      if (match) {
        const query = match[1].toLowerCase();
        const filtered = allVariables.filter((v) =>
          v.toLowerCase().includes(query)
        );

        if (filtered.length > 0) {
          setSuggestions(filtered);
          setSelectedIndex(0);
          setIsVisible(true);

          const rect = textareaRef.current.getBoundingClientRect();
          const lineHeight = parseInt(
            window.getComputedStyle(textareaRef.current).lineHeight || "20"
          );

          setPosition({
            x: rect.left + window.scrollX,
            y: rect.top + window.scrollY + lineHeight + 4,
            width: rect.width,
            height: rect.height,
          });
        } else {
          setIsVisible(false);
        }
      } else {
        setIsVisible(false);
      }
    },
    [allVariables]
  );

  const selectSuggestion = useCallback(
    (variable: string) => {
      if (!textareaRef.current) return;

      const cursorPosition = textareaRef.current.selectionStart || 0;
      const value = textareaRef.current.value;
      const textBeforeCursor = value.substring(0, cursorPosition);
      const match = textBeforeCursor.match(/\{([a-zA-Z0-9._]*)$/);

      if (match) {
        const start = match.index!;
        const newValue =
          value.substring(0, start) +
          `{${variable}}` +
          value.substring(cursorPosition);
        onChange(newValue);

        setTimeout(() => {
          if (textareaRef.current) {
            const newCursorPos = start + variable.length + 2;
            textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
            textareaRef.current.focus();
          }
        }, 0);
      }

      setIsVisible(false);
    },
    [onChange]
  );

  return {
    textareaRef,
    autocompleteRef,
    suggestions,
    selectedIndex,
    position,
    isVisible,
    handleInputChange,
    selectSuggestion,
  };
};
