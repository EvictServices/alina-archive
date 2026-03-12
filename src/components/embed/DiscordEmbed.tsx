import { EmbedData } from "@/types/embeds";
import { processVariables, BUTTON_STYLES, DISCORD_EMBED_BG, DEFAULT_EMBED_COLOR } from "@/lib/embed";
import { FiExternalLink } from "react-icons/fi";

interface DiscordEmbedProps {
  embed: EmbedData;
  content?: string;
}

export const DiscordEmbed = ({ embed, content }: DiscordEmbedProps) => {
  return (
    <div className="bg-[#2b2d31] p-4 rounded-md">
      {content && (
        <div className="mb-2 text-white">{processVariables(content)}</div>
      )}

      <div
        className="border-l-4 rounded-sm pl-3 mb-2"
        style={{ borderColor: embed.color || DEFAULT_EMBED_COLOR }}
      >
        <div className="bg-[#2b2d31] rounded relative">
          {embed.author.name && (
            <div className="flex items-center gap-2 mb-2">
              {embed.author.icon_url && (
                <div className="w-6 h-6 rounded-full overflow-hidden bg-white/10">
                  <img
                    src={processVariables(embed.author.icon_url)}
                    alt="Author icon"
                    className="w-full h-full object-cover"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                </div>
              )}
              <div className="text-sm font-medium text-white/90">
                {embed.author.url ? (
                  <a
                    href={processVariables(embed.author.url)}
                    className="hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {processVariables(embed.author.name)}
                  </a>
                ) : (
                  processVariables(embed.author.name)
                )}
              </div>
            </div>
          )}

          {embed.title && (
            <div className="font-semibold text-white mb-1">
              {embed.url ? (
                <a
                  href={processVariables(embed.url)}
                  className="hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {processVariables(embed.title)}
                </a>
              ) : (
                processVariables(embed.title)
              )}
            </div>
          )}

          {embed.description && (
            <div className="text-white/90 text-sm mb-3 whitespace-pre-wrap">
              {processVariables(embed.description)}
            </div>
          )}

          {embed.fields.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
              {embed.fields.map((field, i) => (
                <div
                  key={i}
                  className={field.inline ? "col-span-1" : "col-span-2"}
                >
                  <div className="font-medium text-white/90 text-xs">
                    {processVariables(field.name)}
                  </div>
                  <div className="text-white/80 text-xs mt-0.5">
                    {processVariables(field.value)}
                  </div>
                </div>
              ))}
            </div>
          )}

          {embed.image && (
            <div className="mb-3 mt-2 max-w-full">
              <img
                src={processVariables(embed.image)}
                alt="Embed image"
                className="max-w-full rounded-md h-auto max-h-64 object-cover"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>
          )}

          {embed.timestamp && (
            <div className="text-xs text-white/60 mt-2 mb-1">
              {new Date().toLocaleString()}
            </div>
          )}

          {embed.footer.text && (
            <div className="flex items-center gap-2 mt-2">
              {embed.footer.icon_url && (
                <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={processVariables(embed.footer.icon_url)}
                    alt="Footer icon"
                    className="w-full h-full object-cover"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                </div>
              )}
              <div className="text-xs text-white/70">
                {processVariables(embed.footer.text)}
              </div>
            </div>
          )}

          {embed.thumbnail && (
            <div className="absolute top-0 right-0 w-16 h-16 rounded-md overflow-hidden">
              <img
                src={processVariables(embed.thumbnail)}
                alt="Thumbnail"
                className="w-full h-full object-cover"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>
          )}
        </div>
      </div>

      {embed.buttons.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {embed.buttons.map((button, i) => (
            <button
              key={i}
              disabled={button.disabled}
              className={`px-3 py-1.5 rounded-sm text-sm font-medium transition-colors flex items-center gap-1.5 min-h-[32px] ${
                BUTTON_STYLES[button.style]
              } ${button.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {button.emoji && (
                <span className="text-base">{processVariables(button.emoji)}</span>
              )}
              <span>{processVariables(button.label)}</span>
              {button.style === "link" && (
                <FiExternalLink className="w-3 h-3 ml-1" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
