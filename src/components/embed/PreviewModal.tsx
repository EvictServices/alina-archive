"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { HiOutlineX, HiOutlineClipboard } from "react-icons/hi";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { EmbedData } from "@/types/embeds";
import { DiscordEmbed } from "./DiscordEmbed";
import { ANIMATION_DURATIONS } from "@/lib/constants";

interface PreviewModalProps {
  embed: EmbedData;
  content: string;
  isOpen: boolean;
  onClose: () => void;
  onCopy: () => void;
}

export const PreviewModal = ({
  embed,
  content,
  isOpen,
  onClose,
  onCopy,
}: PreviewModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(modalRef, onClose);

  const transitionDuration = ANIMATION_DURATIONS.MODAL_TRANSITION / 1000;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: transitionDuration }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 md:p-5 select-none"
    >
      <motion.div
        ref={modalRef}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{
          type: "tween",
          ease: "easeOut",
          duration: transitionDuration,
        }}
        className="bg-[#0A0B0B] border border-white/5 rounded-md max-w-lg w-full overflow-hidden shadow-xl"
      >
        <div className="relative border-b border-white/5 py-3 px-4 flex justify-between items-center">
          <h3 className="text-white font-medium">Embed Preview</h3>
          <button
            className="text-white/60 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-1 transition-colors"
            onClick={onClose}
            aria-label="Close"
          >
            <HiOutlineX className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="p-5">
          <DiscordEmbed embed={embed} content={content} />

          <div className="mt-4 flex justify-between items-center">
            <div className="text-xs text-white/60">
              Preview as it would appear in Discord
            </div>
            <div className="flex gap-2">
              <button
                onClick={onCopy}
                className="px-3 py-1.5 bg-white/[0.01] hover:bg-white/[0.05] text-white text-xs rounded-md transition-colors flex items-center gap-1.5"
              >
                <HiOutlineClipboard size={12} />
                Copy
              </button>
              <button
                onClick={onClose}
                className="px-3 py-1.5 bg-alina-primary/10 hover:bg-alina-primary/20 text-alina-primary/80 text-xs rounded-md transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
