"use client";

import { EmbedData } from "@/types/embeds";
import { VariableInput } from "@/components/variable/VariableInput";

interface GeneralTabProps {
  embed: EmbedData;
  onChange: (key: string, value: string | boolean) => void;
}

export const GeneralTab = ({ embed, onChange }: GeneralTabProps) => (
  <div className="space-y-4">
    <div>
      <label className="block text-white/60 text-[11px] leading-none mb-1">
        Title
      </label>
      <VariableInput
        value={embed.title}
        onChange={(value) => onChange("title", value)}
        className="w-full bg-white/[0.01] border border-white/5 rounded-md px-3 py-2 text-white focus:outline-none focus:border-evict-primary/50 transition-colors"
        placeholder="Embed title"
      />
    </div>

    <div>
      <label className="block text-white/60 text-[11px] leading-none mb-1">
        URL
      </label>
      <VariableInput
        value={embed.url}
        onChange={(value) => onChange("url", value)}
        className="w-full bg-white/[0.01] border border-white/5 rounded-md px-3 py-2 text-white focus:outline-none focus:border-evict-primary/50 transition-colors"
        placeholder="https://evict.bot/"
      />
    </div>

    <div>
      <label className="block text-white/60 text-[11px] leading-none mb-1">
        Description
      </label>
      <VariableInput
        type="textarea"
        value={embed.description}
        onChange={(value) => onChange("description", value)}
        className="w-full bg-white/[0.01] border border-white/5 rounded-md px-3 py-2 text-white focus:outline-none focus:border-evict-primary/50 transition-colors"
        placeholder="Embed description"
        rows={3}
      />
    </div>

    <div>
      <label className="block text-white/60 text-[11px] leading-none mb-1">
        Color
      </label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={embed.color || "#CCCCFF"}
          onChange={(e) => onChange("color", e.target.value)}
          className="h-10 w-20 bg-white/[0.01] border border-white/5 rounded-md cursor-pointer"
        />
        <input
          type="text"
          value={embed.color || "#CCCCFF"}
          onChange={(e) => onChange("color", e.target.value)}
          className="flex-1 bg-white/[0.01] border border-white/5 rounded-md px-3 py-2 text-white focus:outline-none focus:border-evict-primary/50 transition-colors"
          placeholder="#CCCCFF"
        />
      </div>
    </div>

    <div>
      <label className="block text-white/60 text-[11px] leading-none mb-1">
        Thumbnail URL
      </label>
      <VariableInput
        value={embed.thumbnail}
        onChange={(value) => onChange("thumbnail", value)}
        className="w-full bg-white/[0.01] border border-white/5 rounded-md px-3 py-2 text-white focus:outline-none focus:border-evict-primary/50 transition-colors"
        placeholder="https://example.com/image.png"
      />
    </div>

    <div>
      <label className="block text-white/60 text-[11px] leading-none mb-1">
        Image URL
      </label>
      <VariableInput
        value={embed.image}
        onChange={(value) => onChange("image", value)}
        className="w-full bg-white/[0.01] border border-white/5 rounded-md px-3 py-2 text-white focus:outline-none focus:border-evict-primary/50 transition-colors"
        placeholder="https://example.com/image.png"
      />
    </div>

    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id="timestamp"
        checked={embed.timestamp}
        onChange={(e) => onChange("timestamp", e.target.checked)}
        className="h-4 w-4 rounded border-white/30 text-evict-primary focus:ring-evict-primary/20"
      />
      <label htmlFor="timestamp" className="block text-white/70 text-sm">
        Include timestamp
      </label>
    </div>
  </div>
);
