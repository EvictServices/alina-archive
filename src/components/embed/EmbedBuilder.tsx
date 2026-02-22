"use client";

import { MdCreateNewFolder } from "react-icons/md";
import { FiEye, FiCopy, FiDownload } from "react-icons/fi";
import { EmbedData } from "@/types/embeds";
import { GeneralTab } from "./GeneralTab";
import { AuthorTab } from "./AuthorTab";
import { FieldsTab } from "./FieldsTab";
import { FooterTab } from "./FooterTab";
import { ButtonsTab } from "./ButtonsTab";

interface EmbedBuilderProps {
  embed: EmbedData;
  content: string;
  activeTab: "general" | "author" | "fields" | "footer" | "buttons";
  webhookUrl: string;
  onEmbedChange: (embed: EmbedData) => void;
  onContentChange: (content: string) => void;
  onTabChange: (tab: "general" | "author" | "fields" | "footer" | "buttons") => void;
  onPreviewOpen: () => void;
  onCopyToClipboard: () => void;
  onDownloadScript: () => void;
}

export const EmbedBuilder = ({
  embed,
  content,
  activeTab,
  webhookUrl,
  onEmbedChange,
  onContentChange,
  onTabChange,
  onPreviewOpen,
  onCopyToClipboard,
  onDownloadScript,
}: EmbedBuilderProps) => {
  const handleInputChange = (key: string, value: string | boolean) => {
    onEmbedChange({ ...embed, [key]: value });
  };

  const handleNestedChange = (
    section: "author" | "footer",
    key: string,
    value: string
  ) => {
    onEmbedChange({
      ...embed,
      [section]: {
        ...embed[section],
        [key]: value,
      },
    });
  };

  const addField = () => {
    onEmbedChange({
      ...embed,
      fields: [
        ...embed.fields,
        { name: "New Field", value: "Field value", inline: false },
      ],
    });
  };

  const updateField = (
    index: number,
    key: "name" | "value" | "inline",
    value: any
  ) => {
    onEmbedChange({
      ...embed,
      fields: embed.fields.map((field, i) =>
        i === index ? { ...field, [key]: value } : field
      ),
    });
  };

  const removeField = (index: number) => {
    onEmbedChange({
      ...embed,
      fields: embed.fields.filter((_, i) => i !== index),
    });
  };

  const addButton = () => {
    onEmbedChange({
      ...embed,
      buttons: [
        ...embed.buttons,
        {
          style: webhookUrl ? "link" : "link",
          label: "Button",
          url: "https://evict.bot",
          emoji: "",
          disabled: false,
        },
      ],
    });
  };

  const updateButton = (index: number, key: keyof EmbedData["buttons"][0], value: any) => {
    onEmbedChange({
      ...embed,
      buttons: embed.buttons.map((button, i) =>
        i === index ? { ...button, [key]: value } : button
      ),
    });
  };

  const removeButton = (index: number) => {
    onEmbedChange({
      ...embed,
      buttons: embed.buttons.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="bg-white/[0.02] border border-[#5f828d]/20 rounded-2xl shadow-md overflow-hidden backdrop-blur-md">
      <div className="border-b border-[#5f828d]/10 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className="p-1.5 rounded-md bg-alina-primary/10 mr-2">
            <MdCreateNewFolder className="w-4 h-4 text-alina-primary/80" />
          </div>
          <h2 className="text-lg font-semibold text-white">
            Embed Builder
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onPreviewOpen}
            className="p-1.5 text-white/70 hover:text-white hover:bg-[#5f828d]/5 rounded-md transition-colors"
            title="Preview"
          >
            <FiEye className="w-4 h-4" />
          </button>
          <button
            onClick={onCopyToClipboard}
            className="p-1.5 text-white/70 hover:text-white hover:bg-[#5f828d]/5 rounded-md transition-colors"
            title="Copy to clipboard"
          >
            <FiCopy className="w-4 h-4" />
          </button>
          <button
            onClick={onDownloadScript}
            className="p-1.5 text-white/70 hover:text-white hover:bg-[#5f828d]/5 rounded-md transition-colors"
            title="Download script"
          >
            <FiDownload className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-4">
          <label className="block text-white/60 text-[11px] leading-none mb-1">
            Message Content
          </label>
          <textarea
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            className="w-full bg-[#5f828d]/5 border border-[#5f828d]/20 rounded-md px-3 py-2 text-white focus:outline-none focus:border-[#5f828d]/50 transition-colors"
            placeholder="Hey, welcome to evict!"
            rows={2}
          />
        </div>

        <div className="border-t border-[#5f828d]/10 mb-4 pt-4">
          <div className="flex border-b border-[#5f828d]/10">
            {(["general", "author", "fields", "footer", "buttons"] as const).map((tab) => {
              const isButtonsTab = tab === "buttons";
              const isDisabled = isButtonsTab && webhookUrl;
              return (
                <button
                  key={tab}
                  className={`px-4 py-2 text-xs transition-colors ${
                    activeTab === tab
                      ? "text-white border-b-2 border-[#5f828d]"
                      : "text-white/70 hover:text-white/90"
                  } ${isDisabled ? "opacity-30 cursor-not-allowed" : ""}`}
                  onClick={() => !isDisabled && onTabChange(tab)}
                  title={isDisabled ? "Buttons are not supported with webhooks" : ""}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              );
            })}
          </div>
          <div className="pt-4">
            {activeTab === "general" && (
              <GeneralTab embed={embed} onChange={handleInputChange} />
            )}
            {activeTab === "author" && (
              <AuthorTab embed={embed} onChange={handleNestedChange} />
            )}
            {activeTab === "fields" && (
              <FieldsTab
                fields={embed.fields}
                onAdd={addField}
                onUpdate={updateField}
                onRemove={removeField}
              />
            )}
            {activeTab === "footer" && (
              <FooterTab embed={embed} onChange={handleNestedChange} />
            )}
            {activeTab === "buttons" && (
              webhookUrl ? (
                <div className="text-center py-8 text-white/40">
                  <p className="text-sm">Buttons are not supported with Discord webhooks.</p>
                  <p className="text-xs mt-2">Remove the webhook URL to enable buttons.</p>
                </div>
              ) : (
                <ButtonsTab
                  buttons={embed.buttons}
                  onAdd={addButton}
                  onUpdate={updateButton}
                  onRemove={removeButton}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
