"use client";

import { useEffect, useRef } from "react";
import { annotate } from "rough-notation";
import type { HighlighterProps } from "@/types/ui";

export function Highlighter({
  children,
  action = "highlight",
  color = "#ffd1dc",
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = true,
  start = true,
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const annotationRef = useRef<any>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    if (!annotationRef.current) {
      annotationRef.current = annotate(el, {
        type: action,
        color,
        strokeWidth,
        animationDuration,
        iterations,
        padding,
        multiline,
      });
    }

    if (start) {
      annotationRef.current.show();
    }

    return () => {
      if (annotationRef.current) {
        annotationRef.current.remove();
        annotationRef.current = null;
      }
    };
  }, [
    start,
    action,
    color,
    strokeWidth,
    animationDuration,
    iterations,
    padding,
    multiline,
  ]);

  return (
    <span ref={elementRef} className="relative inline-block bg-transparent overflow-visible">
      {children}
    </span>
  );
}