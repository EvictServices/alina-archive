"use client";

import { FiEye } from "react-icons/fi";
import { EmbedData } from "@/types/embeds";
import { DiscordEmbed } from "./DiscordEmbed";

interface EmbedPreviewProps {
  embed: EmbedData;
  content: string;
  script: string;
}

export const EmbedPreview = ({ embed, content, script }: EmbedPreviewProps) => (
  <div className="bg-black border border-[#ccccff]/20 rounded-2xl shadow-md overflow-hidden">
    <div className="border-b border-[#ccccff]/10 px-4 py-3">
      <div className="flex items-center">
        <div className="p-1.5 rounded-md bg-alina-primary/10 mr-2">
          <FiEye className="w-4 h-4 text-alina-primary/80" />
        </div>
        <h2 className="text-lg font-semibold text-[#ccccff]">Preview</h2>
      </div>
    </div>

    <div className="p-4">
      <div className="mb-4 text-sm text-[#ccccff]/70">
        This is how your embed will appear in Discord
      </div>

      <DiscordEmbed embed={embed} content={content} />

      <div className="mt-6 bg-[#ccccff]/5 border border-[#ccccff]/20 p-4 rounded-md">
        <h3 className="text-[#ccccff] font-medium mb-2">Generated script</h3>
        <p className="p-3 rounded-md text-[#ccccff]/90 text-sm font-mono overflow-auto">
          {script}
        </p>
      </div>
    </div>
  </div>
);
