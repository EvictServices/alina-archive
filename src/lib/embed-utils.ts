import { defaultVariables } from "@/types/embeds";

export const parseSpecialFormatting = (text: string): string => {
  if (!text) return text;

  text = text.replace(/<#(\d+)>/g, (_, channelId) => {
    return `#channel-${channelId.substring(0, 4)}`;
  });

  text = text.replace(/<(?:a:|:)([a-zA-Z0-9_]+):(\d+)>/g, () => {
    return `🎮`;
  });

  text = text.replace(/\[guild\]/g, defaultVariables["guild.name"]);

  return text;
};

export const processVariables = (text: string): string => {
  if (!text) return text;

  text = parseSpecialFormatting(text);
  const variablePattern = /\{([a-zA-Z0-9_.]+)\}/g;
  return text.replace(variablePattern, (match, variable) => {
    return defaultVariables[variable as keyof typeof defaultVariables] || match;
  });
};

export const BUTTON_STYLES = {
  link: "bg-transparent hover:bg-white/5 text-white border border-white/20 hover:border-white/30",
  primary: "bg-[#5865f2] hover:bg-[#4752c4] text-white",
  secondary: "bg-[#4e5058] hover:bg-[#5c5e66] text-white",
  success: "bg-[#3ba55c] hover:bg-[#2d7d32] text-white",
  danger: "bg-[#ed4245] hover:bg-[#c62d31] text-white",
} as const;

export const DISCORD_EMBED_BG = "#2b2d31";

export const DEFAULT_EMBED_COLOR = "#5f828d";
