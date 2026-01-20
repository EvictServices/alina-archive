"use client";

import { FiPlus, FiTrash } from "react-icons/fi";
import { EmbedData } from "@/types/embeds";
import { VariableInput } from "@/components/variable/VariableInput";

interface ButtonsTabProps {
  buttons: EmbedData["buttons"];
  onAdd: () => void;
  onUpdate: (
    index: number,
    key: keyof EmbedData["buttons"][0],
    value: any
  ) => void;
  onRemove: (index: number) => void;
}

export const ButtonsTab = ({
  buttons,
  onAdd,
  onUpdate,
  onRemove,
}: ButtonsTabProps) => (
  <div className="space-y-4">
    {buttons.map((button, index) => (
      <div
        key={index}
        className="bg-white/[0.01] border border-white/5 rounded-md p-3"
      >
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-sm font-medium">Button {index + 1}</h4>
          <button
            onClick={() => onRemove(index)}
            className="text-white/60 hover:text-red-400 p-1 rounded transition-colors"
          >
            <FiTrash size={14} />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-white/60 text-[11px] leading-none mb-1">
              Style
            </label>
            <select
              value={button.style}
              onChange={(e) => onUpdate(index, "style", e.target.value)}
              className="w-full bg-white/[0.01] border border-white/5 rounded-md px-3 py-2 text-white focus:outline-none focus:border-alina-primary/50 transition-colors text-sm"
            >
              <option value="link">Link</option>
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="success">Success</option>
              <option value="danger">Danger</option>
            </select>
          </div>

          <div>
            <label className="block text-white/60 text-[11px] leading-none mb-1">
              Label
            </label>
            <VariableInput
              value={button.label}
              onChange={(value) => onUpdate(index, "label", value)}
              className="w-full bg-white/[0.01] border border-white/5 rounded-md px-3 py-2 text-white focus:outline-none focus:border-alina-primary/50 transition-colors text-sm"
              placeholder="Button text"
            />
          </div>

          <div>
            <label className="block text-white/60 text-[11px] leading-none mb-1">
              {button.style === "link" ? "URL" : "Custom ID"}
            </label>
            <VariableInput
              value={button.url}
              onChange={(value) => onUpdate(index, "url", value)}
              className="w-full bg-white/[0.01] border border-white/5 rounded-md px-3 py-2 text-white focus:outline-none focus:border-alina-primary/50 transition-colors text-sm"
              placeholder={
                button.style === "link" ? "https://evict.bot" : "custom_id"
              }
            />
          </div>

          <div>
            <label className="block text-white/60 text-[11px] leading-none mb-1">
              Emoji
            </label>
            <VariableInput
              value={button.emoji}
              onChange={(value) => onUpdate(index, "emoji", value)}
              className="w-full bg-white/[0.01] border border-white/5 rounded-md px-3 py-2 text-white focus:outline-none focus:border-alina-primary/50 transition-colors text-sm"
              placeholder="🎮"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id={`disabled-${index}`}
              checked={button.disabled}
              onChange={(e) => onUpdate(index, "disabled", e.target.checked)}
              className="mr-2 h-4 w-4 rounded border-white/30 text-alina-primary focus:ring-alina-primary/20"
            />
            <label
              htmlFor={`disabled-${index}`}
              className="text-xs text-white/70"
            >
              Disabled
            </label>
          </div>
        </div>
      </div>
    ))}

    <button
      onClick={onAdd}
      className="w-full py-2 border border-dashed border-white/5 rounded-md text-white/60 hover:text-white hover:border-white/20 transition-colors flex items-center justify-center gap-2"
    >
      <FiPlus size={16} />
      <span>Add Button</span>
    </button>
  </div>
);
