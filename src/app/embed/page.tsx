"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { EmbedData, initialEmbed } from "@/types/embeds";
import { EmbedHeader } from "@/components/embed/EmbedHeader";
import { EmbedBuilder } from "@/components/embed/EmbedBuilder";
import { EmbedPreview } from "@/components/embed/EmbedPreview";
import { EmbedVariables } from "@/components/embed/EmbedVariables";
import { PreviewModal } from "@/components/embed/PreviewModal";

export default function EmbedPage() {
  const [embed, setEmbed] = useState<EmbedData>(initialEmbed);
  const [content, setContent] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "general" | "author" | "fields" | "footer" | "buttons"
  >("general");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [sendStatus, setSendStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const generateScript = () => {
    const parts: string[] = [];

    if (content) {
      parts.push(`{content: ${content}}`);
    }

    parts.push("{embed}");

    if (embed.title) {
      parts.push(`{title: ${embed.title}}`);
    }

    if (embed.url) {
      parts.push(`{url: ${embed.url}}`);
    }

    if (embed.description) {
      parts.push(`{description: ${embed.description}}`);
    }

    if (embed.color) {
      parts.push(`{color: ${embed.color}}`);
    }

    if (embed.thumbnail) {
      parts.push(`{thumbnail: ${embed.thumbnail}}`);
    }

    if (embed.image) {
      parts.push(`{image: ${embed.image}}`);
    }

    if (embed.author.name) {
      const authorParts = [embed.author.name];
      if (embed.author.icon_url) authorParts.push(embed.author.icon_url);
      if (embed.author.url) authorParts.push(embed.author.url);
      parts.push(`{author: ${authorParts.join(" && ")}}`);
    }

    embed.fields.forEach((field) => {
      const fieldStr = `{field: ${field.name} && ${field.value}${
        field.inline ? " && inline" : ""
      }}`;
      parts.push(fieldStr);
    });

    if (embed.footer.text) {
      const footerParts = [embed.footer.text];
      if (embed.footer.icon_url) footerParts.push(embed.footer.icon_url);
      parts.push(`{footer: ${footerParts.join(" && ")}}`);
    }

    if (embed.timestamp) {
      parts.push("{timestamp}");
    }

    if (!webhookUrl) {
      embed.buttons.forEach((button) => {
        const buttonParts = [button.style, button.label, button.url];
        if (button.emoji) buttonParts.push(button.emoji);
        if (button.disabled) buttonParts.push("disabled");
        parts.push(`{button: ${buttonParts.join(" && ")}}`);
      });
    }

    return parts.join(" $v ");
  };

  const script = generateScript();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(script);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const downloadScript = () => {
    const blob = new Blob([script], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "embed-script.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const sendWebhook = async () => {
    if (!webhookUrl) return;

    setSendStatus("sending");

    try {
      const payload: any = {};

      if (content) {
        payload.content = content;
      }

      const embedPayload: any = {};

      if (embed.title) embedPayload.title = embed.title;
      if (embed.description) embedPayload.description = embed.description;
      if (embed.url) embedPayload.url = embed.url;
      if (embed.color) {
        const hexColor = embed.color.replace("#", "");
        embedPayload.color = parseInt(hexColor, 16);
      }
      if (embed.timestamp) embedPayload.timestamp = new Date().toISOString();
      if (embed.thumbnail) embedPayload.thumbnail = { url: embed.thumbnail };
      if (embed.image) embedPayload.image = { url: embed.image };

      if (embed.author.name) {
        embedPayload.author = { name: embed.author.name };
        if (embed.author.icon_url)
          embedPayload.author.icon_url = embed.author.icon_url;
        if (embed.author.url) embedPayload.author.url = embed.author.url;
      }

      if (embed.footer.text) {
        embedPayload.footer = { text: embed.footer.text };
        if (embed.footer.icon_url)
          embedPayload.footer.icon_url = embed.footer.icon_url;
      }

      if (embed.fields.length > 0) {
        embedPayload.fields = embed.fields.map((field) => ({
          name: field.name,
          value: field.value,
          inline: field.inline,
        }));
      }

      if (Object.keys(embedPayload).length > 0) {
        payload.embeds = [embedPayload];
      }

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSendStatus("success");
        setTimeout(() => setSendStatus("idle"), 3000);
      } else {
        setSendStatus("error");
        setTimeout(() => setSendStatus("idle"), 3000);
      }
    } catch (error) {
      console.error("Failed to send webhook:", error);
      setSendStatus("error");
      setTimeout(() => setSendStatus("idle"), 3000);
    }
  };

  return (
    <>
      <main className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto pt-20">
          <EmbedHeader />

          <div className="mb-6 bg-white/[0.02] border border-[#ccccff]/20 rounded-2xl p-4 backdrop-blur-md">
            <div className="flex items-center gap-2 mb-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
              <h2 className="text-lg font-light text-white">
                Create custom Discord embeds
              </h2>
            </div>
            <p className="text-white/60 text-xs">
              Design beautiful embeds with variables and send them via webhooks or generate scripts
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-white/60 text-sm mb-2">
              Discord Webhook URL (Optional)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="flex-1 bg-white/[0.02] border border-[#ccccff]/20 rounded-full px-4 py-3 text-white focus:outline-none focus:border-[#ccccff]/50 transition-colors backdrop-blur-md"
                placeholder="https://discord.com/api/webhooks/..."
              />
              <button
                onClick={sendWebhook}
                disabled={!webhookUrl || sendStatus === "sending"}
                className={`px-6 py-3 rounded-full font-medium transition-colors ${
                  !webhookUrl
                    ? "bg-[#ccccff]/5 text-white/30 cursor-not-allowed border border-[#ccccff]/10"
                    : sendStatus === "success"
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : sendStatus === "error"
                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                    : "bg-[#ccccff]/10 hover:bg-[#ccccff]/20 text-white border border-[#ccccff]/30"
                }`}
              >
                {sendStatus === "sending"
                  ? "Sending..."
                  : sendStatus === "success"
                  ? "Sent!"
                  : sendStatus === "error"
                  ? "Failed"
                  : "Send"}
              </button>
            </div>
            {webhookUrl && (
              <p className="mt-2 text-xs text-white/40">
                Note: Buttons are not supported when using webhooks
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <EmbedBuilder
              embed={embed}
              content={content}
              activeTab={activeTab}
              webhookUrl={webhookUrl}
              onEmbedChange={setEmbed}
              onContentChange={setContent}
              onTabChange={setActiveTab}
              onPreviewOpen={() => setPreviewOpen(true)}
              onCopyToClipboard={copyToClipboard}
              onDownloadScript={downloadScript}
            />
            <EmbedPreview embed={embed} content={content} script={script} />
          </div>

          <EmbedVariables />
        </div>
      </main>

      <AnimatePresence>
        {previewOpen && (
          <PreviewModal
            embed={embed}
            content={content}
            isOpen={previewOpen}
            onClose={() => setPreviewOpen(false)}
            onCopy={copyToClipboard}
          />
        )}
      </AnimatePresence>
    </>
  );
}
